import * as React from "react";

interface EmailTemplateProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  email,
  subject,
  message,
}) => (
  <div
    style={{
      fontFamily: "sans-serif",
      padding: "20px",
      backgroundColor: "#f9f9f9",
    }}
  >
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        backgroundColor: "#ffffff",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
      }}
    >
      <h1
        style={{
          color: "#FF5722",
          fontSize: "24px",
          marginBottom: "20px",
          borderBottom: "1px solid #eee",
          paddingBottom: "10px",
        }}
      >
        New Portfolio Inquiry
      </h1>

      <div style={{ marginBottom: "20px" }}>
        <p style={{ margin: "5px 0" }}>
          <strong>Name:</strong> {name}
        </p>
        <p style={{ margin: "5px 0" }}>
          <strong>Email:</strong> {email}
        </p>
        <p style={{ margin: "5px 0" }}>
          <strong>Subject:</strong> {subject}
        </p>
      </div>

      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: "15px",
          borderRadius: "5px",
          whiteSpace: "pre-wrap",
        }}
      >
        <h4 style={{ margin: "0 0 10px 0", color: "#666" }}>Message:</h4>
        {message}
      </div>

      <div
        style={{
          marginTop: "30px",
          fontSize: "12px",
          color: "#999",
          textAlign: "center",
        }}
      >
        Received from your Krishna Devashish Portfolio
      </div>
    </div>
  </div>
);
