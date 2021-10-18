import Layout from "../components/layout/Layout";
import Content from "../components/factory/ContentManager";
import DataManager from "../core/DataManager";
import Vendor from "../core/Vendor";

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

    return <Layout>
        <Content vendors={vendors} />
    </Layout>;
}