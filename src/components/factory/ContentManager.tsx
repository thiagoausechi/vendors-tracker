import Vendor from "../../core/Vendor";

export default function Content(props)
{
    const vendors: Vendor[] = props.vendors;

    return <>{vendors.map((v) => <h2 key={v.getHash()}>{v.getHash()}</h2>)}</>;
}