import Layout from "../components/infra/Layout";
import Content from "../components/factory/ContentFactory";
import React from "react";
import { getTranslatedKeys, getVendors } from "../core/Lib/DataManager";

export async function getStaticProps({ locale })
{
    const vendors = await getVendors();

    return {
        props: {
            data: vendors[locale],
            locale: locale
        }
    }
}

export default function Home({ data, locale })
{
    return (
        <Layout locale={locale} >
            <Content vendors={data} locale={locale} />
        </Layout>
    );
}