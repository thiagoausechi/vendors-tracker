import Layout from "../components/infra/Layout";
import Content from "../components/factory/ContentFactory";
import Vendor from "../core/Vendor";
import React from "react";
import { getRawData } from "../core/Lib/DataManager";

export async function getStaticProps(context)
{
    const data = await getRawData();
    console.log(data);
    //const vendors: Vendor[] = getVendors();

    return {
        props: {
            data: {},// vendors.map((v) => v.serialize()),
            locale: context.locale
        },
        revalidate: 1
    }
}

export default function Home({ data, locale })
{
    const vendors = [];

    for (const i in data)
        vendors.push(Vendor.fromSerialized(data[i]))

    return (
        <Layout locale={locale} >
            <Content vendors={vendors} locale={locale} />
        </Layout>
    );
}