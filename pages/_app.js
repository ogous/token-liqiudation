import '../styles/global.scss';
import '../styles/App.scss';
import Head from 'next/head';
// import Script from "next/script"

function App({ Component, pageProps }) {
  return (
    <>
      {/* <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-X" />
      <Script id='google-analytics' strategy="afterInteractive">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-X');
          `}
      </Script>  */}

      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;
