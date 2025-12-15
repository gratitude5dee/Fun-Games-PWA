import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="description" content="Transform any photo into pure drip with AI" />
          <meta name="theme-color" content="#0a0a0a" />

          {/* PWA */}
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon-192x192.png" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <meta name="apple-mobile-web-app-title" content="BUSS DOWN" />

          {/* Open Graph */}
          <meta property="og:type" content="website" />
          <meta property="og:title" content="BUSS DOWN - AI Image Transformation" />
          <meta property="og:description" content="Transform any photo into pure drip with AI" />
          <meta property="og:site_name" content="BUSS DOWN" />

          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="BUSS DOWN - AI Image Transformation" />
          <meta name="twitter:description" content="Transform any photo into pure drip with AI" />
        </Head>
        <body className="bg-[#0a0a0a]">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
