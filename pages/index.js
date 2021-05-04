

import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { withRouter } from 'next/router';
import Layout from '../components/Layout';
import { signout, isAuth } from '../actions/auth';
import { listBlogsWithCategoriesAndTags } from '../actions/blog';
import Card from '../components/blog/Card';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../config';

const Index = ({ blogs, categories, tags, totalBlogs, blogsLimit, blogSkip, router }) => {

    const head = () => (
        <Head>
            <title>Programming blogs | {APP_NAME}</title>
            <meta
                name="description"
                content="Programming blogs and tutorials on react node next vue php laravel and web developoment"
            />
            <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
            <meta property="og:title" content={`Latest web developoment tutorials | ${APP_NAME}`} />
            <meta
                property="og:description"
                content="Programming blogs and tutorials on react node next vue php laravel and web developoment"
            />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />

            <meta property="og:image" content={`${DOMAIN}/static/images/seoblog.jpg`} />
            <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/seoblog.jpg`} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
        </Head>
    );

    const [limit, setLimit] = useState(blogsLimit);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(totalBlogs);
    const [loadedBlogs, setLoadedBlogs] = useState([]);

    const loadMore = () => {
        let toSkip = skip + limit;
        listBlogsWithCategoriesAndTags(toSkip, limit).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setLoadedBlogs([...loadedBlogs, ...data.blogs]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    };

    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (
                <button onClick={loadMore} className="btn btn-outline-primary btn-lg">
                    Load more
                </button>
            )
        );
    };


    const showAllBlogs = () => {
        return blogs.map((blog, i) => {
            // ()
            return (
                <article key={i}>
                    <Card blog={blog} />
                    <hr />
                </article>
            );
        });
    };

    const showAllCategories = () => {
        return categories.map((c, i) => (
            <>
                <Link href={`/categories/${c.slug}`} key={i}>
                    <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
                </Link>{' '}
            </>
        ));
    };

    const showAllTags = () => {
        return tags.map((t, i) => (
            <>
                <Link href={`/tags/${t.slug}`} key={i}>
                    <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
                </Link> {' '}
            </>
        ));
    };

    const showLoadedBlogs = () => {
        return loadedBlogs.map((blog, i) => (
            <article key={i}>
                <Card blog={blog} />
            </article>
        ));
    };

    return (
        <React.Fragment>
            {head()}
            <Layout>
               {/*  {JSON.stringify(isAuth())} */}
                <main>
                    <div className="container">
                        <header>
                            <div className="col-md-12 pt-1">
                                <h2 className="display-2 font-weight-bold text-center">Programming Electronics and  tutorials</h2>
                            </div>
                        </header>
                        <div className="row">
                            <div className="col-md-3">
                                <section>
                                    <div className="pb-3">
                                        {showAllCategories()}
                                        <br />
                                        {showAllTags()}
                                    </div>
                                </section>
                            </div>
                            <div className="col-md-9">
                                <div className="container">{showAllBlogs()}</div>
                                <div className="container">{showLoadedBlogs()}</div>
                                <div className="text-center pt-3 pb-3">{loadMoreButton()}</div>
                            </div>
                        </div>
                    </div>
                </main>
            </Layout>
        </React.Fragment>
    );
};

Index.getInitialProps = () => {
    let skip = 0;
    let limit = 3;
    return listBlogsWithCategoriesAndTags(skip, limit).then(data => {
        console.log('Data:', data)
        if (data.error) {
            console.log(data.error);
        } else {
            return {
                blogs: data.blogs,
                categories: data.categories,
                tags: data.tags,
                totalBlogs: data.size,
                blogsLimit: limit,
                blogSkip: skip
            };
        }
    });
};

export default withRouter(Index);
