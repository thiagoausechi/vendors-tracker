import Header from "./Header";
import Footer from "./Footer";
import Favicon from "../Favicon";
import Head from 'next/head'

export default function Layout({ children, locale })
{
    return (
        <>
        <Head>
                <title>Destiny 2 - Vendor Tracker</title>
                <Favicon />
                <meta name="keywords" content="destiny 2, d2, destiny 2 armor, armor" />
        </ Head>
        <div className="container-fluid page-container">
            <Header locale={locale} />
                {children}
            <Footer locale={locale} />
        </div>
        </>
    );
}