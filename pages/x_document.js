import Document, { Html, Head, Main, NextScript } from 'next/document';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

class MyDocument extends Document {

    setGoogleTags() {
        if (publicRuntimeConfig.PRODUCTION) {
            return {
                __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'UA-147955896-1');
        `
            };
        }
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta charSet="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" />
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" />
                    <link rel="stylesheet" href="//cdn.quilljs.com/1.2.6/quill.snow.css"></link>
                    <link rel="stylesheet" href="/static/css/styles.css" />
                    <React.Fragment>
                        <script dangerouslySetInnerHTML={this.setGoogleTags()} />
                    </React.Fragment>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;

