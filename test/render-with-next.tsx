import type { PropsWithChildren, ReactElement } from "react";
import { render } from "@testing-library/react";
import { imageConfigDefault } from "next/dist/shared/lib/image-config";
import { ImageConfigContext } from "next/dist/shared/lib/image-config-context.shared-runtime";
import nextConfig from "../next.config";

const imageConfig = { ...imageConfigDefault, ...nextConfig.images };

// RTL renders outside the Next.js app, so supply the app's image settings.
function NextImageProvider({ children }: PropsWithChildren) {
  return (
    <ImageConfigContext.Provider value={imageConfig}>
      {children}
    </ImageConfigContext.Provider>
  );
}

export function renderWithNext(ui: ReactElement) {
  return render(ui, { wrapper: NextImageProvider });
}
