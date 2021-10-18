import VendorProps from "../core/Vendor";

export default function Vendor(props)
{
    const vendor: VendorProps = props.vendor;
    return <h2>Vendor: vendor.hash </h2>;
}