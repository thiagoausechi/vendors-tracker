import Vendor from "./VendorFactory";
import styles from "../../styles/Vendors.module.css";
import vendors_raw from "../../core/Cached/vendors.json";
import { XurPlaceholder } from "../XurPlaceholder";

export default function Content(props)
{
    const vendors = vendors_raw.map((v) => <Vendor key={v.hash} vendor={v} />);
    const xurArrived = vendors_raw.some((vendor) => vendor.hash === "2190858386");

    return (
        <div className={`row ${styles.contentWrapper}`}>
            <div className={styles.vendors}>
                {vendors},
                {xurArrived ? null : <XurPlaceholder />}
            </div>
        </ div>);
}