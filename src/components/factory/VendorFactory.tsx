import Image from 'next/image'
import styles from "../../styles/Vendors.module.css";
import SalesSection from './SalesFactory';

export default function Vendor(props)
{  
    const vendor = props.vendor;
    return (
        <div className={styles.wrapper} id={vendor.hash}>
            <VendorTitle name={vendor.name} icon={vendor.large_icon} />
            <VendorContainer
                vendor={vendor}
                isXur={vendor.hash === "2190858386"}
            />
        </div>);
}

export function VendorTitle(props)
{
    return (
        <div className={styles.titleWrapper}>
            <Image
                src={props.icon}
                width={28}
                height={28}
                alt="Vendor Icon"
            />
            <span className={styles.title}>{props.name}</span>
      </div>
    );
}

function VendorContainer(props)
{
    const vendor = props.vendor;
    const bg_id = props.isXur
      ? `${vendor.hash}_${vendor.location_initials}`
      : `${vendor.hash}`;
    return (
        <div
          className={`row ${styles.container}`}
          style={{
            backgroundImage: `url(/assets/vendors/${bg_id}.png)`
          }}
        >
            <VendorName
                name={vendor.name}
                location={vendor.location}
                icon={vendor.map_icon}
            />
            
            <SalesSection
                guardians={vendor.guardians}
                color={vendor.color}
            />
        </div>
      );
}

function VendorName(props)
{
    return (
        <div className={`col-md-3 ${styles.nameWrapper}`}>
          <div className={styles.nameSection}>
            <div
              className={styles.icon}
              style={{
                backgroundImage: `url(${props.icon})`
              }}
            />
            <div>
              <div className={styles.name}>{props.name}</div>
              <div className={styles.location}>{props.location}</div>
            </div>
          </div>
        </div>
      );
}