import Script from "next/script";
import { homeMarkup } from "./home-markup";

export default function HomePage() {
  return (
    <>
      <link rel="stylesheet" href="/revamp/home.css" />
      <div dangerouslySetInnerHTML={{ __html: homeMarkup }} />
      <Script src="/revamp/home.js" strategy="afterInteractive" />
    </>
  );
}
