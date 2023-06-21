import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
            <meta charset="utf-8" />
            <link rel="icon" href="/favicon.png" />
            <meta name="theme-color" content="#000000" />
            <link rel="apple-touch-icon" href="/favicon.png" />
            <link rel="manifest" href="/manifest.json" />
            <meta name="description" content="" />
            <meta property="og:image" content="" />
            <meta property="og:image:type" content="image/png" />
            <meta property="og:image:width" content="320" />
            <meta property="og:image:height" content="320" />
            <meta property="og:image:alt" content="" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
