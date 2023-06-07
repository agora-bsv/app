import Document, { Html, Head, Main, NextScript } from 'next/document';

class agoraDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
          <title>AGORA</title>
          <meta content="A New Public Square" name="description" />
          <meta content="AGORA" property="og:title" />
          <meta content="A New Public Square" property="og:description" />
          <meta content="https://uploads-ssl.webflow.com/647fa62eb19b9b9e23cdc100/6480326b7c9b87637d8f2c86_maxresdefault.jpg" property="og:image" />
          <meta content="AGORA" property="twitter:title" />
          <meta content="A New Public Square" property="twitter:description" />
          <meta content="https://uploads-ssl.webflow.com/647fa62eb19b9b9e23cdc100/6480326b7c9b87637d8f2c86_maxresdefault.jpg" property="twitter:image" />
          <meta property="og:type" content="website" />
          <meta content="summary_large_image" name="twitter:card" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <link href="https://uploads-ssl.webflow.com/647fa62eb19b9b9e23cdc100/648034c3d2b60074b16f8c30_5f26a48c7cfa44ea78ec21be_favicon.png" rel="shortcut icon" type="image/x-icon" />
          <link href="https://uploads-ssl.webflow.com/647fa62eb19b9b9e23cdc100/648034ca7c9b87637d91ce5d_5f26a491d9b79a3fd7e38a51_agora%20webclip.jpg" rel="apple-touch-icon" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default agoraDocument;
