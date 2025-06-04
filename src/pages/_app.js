import '../styles/globals.css';
import '../styles/portfolio-themes.css';
import '../styles/components.css';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Portfolio Builder - Create Beautiful Portfolios from PDF Resumes</title>
        <meta name="description" content="Upload your PDF resume and get a beautiful, professional portfolio website instantly using AI technology." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600&family=Crimson+Text:wght@400;600;700&display=swap" 
          rel="stylesheet" 
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
