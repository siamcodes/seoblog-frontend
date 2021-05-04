import Head from 'next/head'
import React from 'react';
import Header from './Header';

import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

const Layout = ({ children }) => {

    const setGoogleTags = () => {
        if (publicRuntimeConfig.PRODUCTION) {
            return {
                __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', '259605935');
            `
            };
        }
    }

    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" />
                <link rel="stylesheet" href="//cdn.quilljs.com/1.2.6/quill.snow.css"></link>
                <link rel="stylesheet" href="/static/css/styles.css" />
                <script async src="https://www.googletagmanager.com/gtag/js?id=259605935"></script>
                <React.Fragment>
                    <script dangerouslySetInnerHTML={setGoogleTags()} />
                </React.Fragment>
            </Head>
            <React.Fragment>
                <Header />
                {children}
            </React.Fragment>
        </>
    );
};

export default Layout;
