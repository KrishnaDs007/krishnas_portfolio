import { renderHook, screen, within, act } from "@testing-library/react";
import { renderWithNext as render } from "@/test/render-with-next";
import userEvent from "@testing-library/user-event";
import { renderToStaticMarkup } from "react-dom/server";
import Home from "./page";
import Layout, { metadata as portfolioMetadata, viewport } from "./layout";
import NotFound from "./not-found";
import Resume, { metadata as resumeMetadata } from "./resume/page";
import Project, { generateMetadata, generateStaticParams } from "./projects/[id]/page";
import robots from "./robots";
import sitemap from "./sitemap";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { siteConfig } from "@/lib/site-config";
import { education, socialLinks } from "@/lib/constants";
import { MobileNav } from "@/components/layout/mobile-nav";

jest.mock("@/app/actions/send-email", () => ({ sendEmail: jest.fn() }));
jest.mock("@vercel/speed-insights/next", () => ({ SpeedInsights: () => null }));

let resize: ResizeObserverCallback;
let intersect: IntersectionObserverCallback;

beforeEach(() => {
  Object.defineProperties(window, {
    matchMedia: { configurable: true, value: jest.fn(() => ({
      matches: false, addListener: jest.fn(), removeListener: jest.fn(),
    })) },
    ResizeObserver: { configurable: true, value: class {
      constructor(callback: ResizeObserverCallback) { resize = callback; }
      observe() {}
      disconnect() {}
    } },
    IntersectionObserver: { configurable: true, value: class {
      constructor(callback: IntersectionObserverCallback) { intersect = callback; }
      observe() {}
      disconnect() {}
    } },
  });
});

afterEach(() => jest.restoreAllMocks());

test("exposes metadata routes and recovery links", () => {
  expect(robots().sitemap).toBe(`${siteConfig.url}/sitemap.xml`);
  expect(sitemap().map(({ url }) => url)).toEqual(expect.arrayContaining(
    generateStaticParams().map(({ id }) => `${siteConfig.url}/projects/${id}`),
  ));
  render(<NotFound />);
  expect(screen.getByRole("link", { name: "Back to portfolio" })).toHaveAttribute("href", "/");
});

test("renders resume and layout entry points", () => {
  expect(new URL(String(portfolioMetadata.metadataBase)).origin).toBe(siteConfig.url);
  expect(resumeMetadata.title).toEqual(expect.stringMatching(/resume/i));
  expect(viewport.width).toBe("device-width");
  render(<Resume />);
  expect(screen.getAllByRole("link", { name: /download/i }).length).toBeGreaterThan(0);
  expect(renderToStaticMarkup(<Layout><main id="main-content">Portfolio</main></Layout>))
    .toContain("Skip to main content");
});

test("renders education without a location and skips unknown social icons", () => {
  const item = education[0];
  const location = item.location;
  item.location = "";
  socialLinks.push({ platform: "unknown", url: "https://example.com", icon: "unknown" });
  try {
    render(<><Resume /><Home /></>);
    expect(screen.queryByRole("link", { name: /unknown profile/i })).not.toBeInTheDocument();
  } finally {
    item.location = location;
    socialLinks.pop();
  }
});

test("keeps mobile navigation available without a footer or matching active link", () => {
  const frame = jest.spyOn(window, "requestAnimationFrame").mockReturnValue(1);
  render(<MobileNav activeSection="missing" />);
  act(() => frame.mock.calls[0][0](0));
  expect(screen.getByRole("button", { name: "Home" })).not.toHaveAttribute("aria-current");
});

test.each(generateStaticParams())("renders the $id case study and metadata", async ({ id }) => {
  const props = { params: Promise.resolve({ id }) };
  const metadata = await generateMetadata(props);
  expect(metadata.openGraph?.title).toEqual(expect.stringContaining(String(metadata.title)));
  render(await Project(props));
  expect(screen.getByRole("heading", { level: 1 })).toBeVisible();
});

test("handles an unknown project", async () => {
  const props = { params: Promise.resolve({ id: "missing-project" }) };
  await expect(generateMetadata(props)).resolves.toMatchObject({ title: expect.stringMatching(/not found/i) });
  await expect(Project(props)).rejects.toMatchObject({ digest: expect.stringContaining("404") });
});

test("filters projects, changes expertise, and exercises desktop and mobile navigation", async () => {
  const user = userEvent.setup();
  const scroll = jest.spyOn(window, "scrollTo").mockImplementation(() => {});
  const { container } = render(<Home />);
  const mobile = within(screen.getByRole("navigation", { name: "Mobile section navigation" }));
  await user.click(within(container.querySelector("header")!).getByRole("link", { name: "About" }));
  await user.click(within(container.querySelector("header")!).getByRole("link", { name: "Contact" }));
  await user.click(mobile.getByRole("button", { name: "Contact" }));
  await user.click(mobile.getByRole("button", { name: "Home" }));
  const footerObserver = {} as IntersectionObserver;
  act(() => intersect([{ isIntersecting: true } as IntersectionObserverEntry], footerObserver));
  expect(mobile.getByRole("button", { name: "Home" }).closest("nav")).toHaveClass("translate-y-full");
  act(() => {
    intersect([{ isIntersecting: false } as IntersectionObserverEntry], footerObserver);
    resize([], {} as ResizeObserver);
    window.dispatchEvent(new Event("resize"));
  });

  for (const name of ["Frontend Development", "Architecture & Performance", "Design Systems", "Overview"]) {
    await user.click(screen.getByRole("button", { name }));
    expect(screen.getByRole("button", { name })).toHaveAttribute("aria-pressed", "true");
  }
  await user.click(screen.getByRole("button", { name: "Contact Me" }));
  expect(scroll).toHaveBeenCalled();
  await user.click(screen.getByRole("button", { name: "Browser Extensions" }));
  expect(screen.getAllByRole("link", { name: /view details for/i })).toHaveLength(1);
  await user.click(screen.getByRole("button", { name: "All Projects" }));
  expect(screen.getAllByRole("link", { name: /view details for/i })).toHaveLength(generateStaticParams().length);
  await user.click(screen.getByRole("button", { name: "All" }));
  expect(screen.getByRole("button", { name: "All" })).toHaveAttribute("aria-pressed", "true");
});

test("scroll spy skips missing sections and updates once for a scroll burst", () => {
  const frame = jest.spyOn(window, "requestAnimationFrame").mockReturnValue(3);
  const cancel = jest.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {});
  const second = document.createElement("section");
  second.id = "second";
  Object.defineProperties(second, { offsetTop: { value: 20 }, offsetHeight: { value: 300 } });
  document.body.append(second);
  const ids = ["absent", "second"];
  const { result, unmount } = renderHook(() => useScrollSpy(ids));
  expect(result.current).toBe("second");
  window.dispatchEvent(new Event("scroll"));
  window.dispatchEvent(new Event("scroll"));
  expect(frame).toHaveBeenCalledTimes(1);
  act(() => frame.mock.calls[0][0](0));
  window.dispatchEvent(new Event("scroll"));
  unmount();
  expect(cancel).toHaveBeenCalledWith(3);
  second.remove();
});
