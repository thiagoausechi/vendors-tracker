import Layout from "../components/layout/Layout";
import Content from "../components/factory/ContentFactory";
import DataManager from "../core/Lib/DataManager";
import Vendor from "../core/Vendor";
import React from "react";

export async function getStaticProps(context) {
    const data = new DataManager(context.locale);
    const vendors: Vendor[] = data.getVendors();
    return {
        props: {
            data: vendors.map((v) => v.serialize()),
            locale: context.locale
        },
        revalidate: 3600
    }
}

export default function Home({ data, locale }) {
    const vendors = [];

    for (const i in data)
        vendors.push(Vendor.fromSerialized(data[i]))

    return (
        <Layout locale={locale} >
            <Content vendors={vendors} locale={locale} />
        </Layout>
    );
}