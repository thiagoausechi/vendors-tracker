import Vendor from "./VendorFactory";
import styles from "../../styles/Vendors.module.css";
import { XurPlaceholder } from "../layout/XurPlaceholder";

export default function Content({ vendors, locale })
{
    const vendors_map = vendors.map((v) => <Vendor key={v.hash} vendor={v} />);
    const xurArrived = vendors.some((vendor) => vendor.hash === "2190858386");

    return (
        <div className={`row ${styles.contentWrapper}`}>
            <div className={styles.vendors}>
                {vendors_map}
                {xurArrived ? null : <XurPlaceholder />}
            </div>
        </ div>);
}