import Layout from "../components/layout/Layout";
import Content from "../components/factory/ContentFactory";
import DataManager from "../core/DataManager";
import Vendor from "../core/Vendor";
import Head from 'next/head'
import React from "react";
import Favicon from "../components/Favicon";

export async function getStaticProps(context)
{
    const data = new DataManager(context.locale);

    const vendors: Vendor[] = data.getVendors();

    return {
        props: {
            data: vendors.map((v) => v.serialize())
        },
        revalidate: 3600
    }
}

export default function Home({ data })
{
    const vendors = [];

    for (const i in data)
        vendors.push(Vendor.fromSerialized(data[i]))

    return (
        <>
            <Head >
                <title>Destiny 2 - Vendor Tracker</title>
                <Favicon />
                <meta name="keywords" content="destiny 2, d2, destiny 2 armor, armor" />
            </ Head>
            <Layout>
                <Content vendors={vendors} />
            </Layout>
        </>
    );
}