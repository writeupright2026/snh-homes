import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "SNH Homes",
    template: "%s | SNH Homes",
  },
  description: "Find residential and commercial properties across Dubai.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <link rel="stylesheet" href="/frontend/css/owl.carousel.min.css" />
        <link rel="stylesheet" href="/frontend/css/owl.theme.default.css" />
        <link rel="stylesheet" href="/frontend/css/stylesheet.css" />
        <link rel="stylesheet" href="/frontend/css/style2.css" />
        <link rel="stylesheet" href="/frontend/css/mobile.css" />
      </head>
      <body>
        {children}
        <Script
          src="https://code.jquery.com/jquery-3.7.0.js"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js"
          strategy="afterInteractive"
        />
        <Script src="/frontend/js/menu.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
