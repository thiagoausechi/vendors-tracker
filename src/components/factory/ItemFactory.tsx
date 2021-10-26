import Image from 'next/image'
import { useTranslation } from '../../lang/Language';
import styles from "../../styles/Items.module.css";

export default function ItemContainer(props)
{
    const item = props.item;
    const exotic = props.isExotic ? styles.exotic : "";
    item.item.isMW = item.status.some((stat) => stat.value >= 20);

    return (
        <div className={`${styles.container} ${exotic}`}>
            <ItemSection item={item.item} />
            <StatusSection status={item.status} />
        </div>
    );
}

function ItemSection(props)
{
    const item = props.item;
    return (
        <div className={styles.section}>
            <IconWrapper
                name={item.name}
                icon={item.icon}
                watermark={item.watermark}
                isMW={item.isMW}
            />
            <div className={styles.name}>{item.name}</div>
        </div>
    );
}

function IconWrapper(props)
{
    return (
        <div className={styles.iconWrapper}>
            <img
                src={props.icon}
                className={`${styles.icon} ${props.isMW ? styles.masterworked : ""}`}
                alt={props.name}
            />
            <div className={styles.seasonWatermark}>
                <Image
                    src={props.watermark}
                    width={64} height={64}
                    alt="Season Watermark" />
            </div>
            {props.isMW ? <div className={styles.masterworkFrame}></div> : null}
        </div>
    );
}

function StatusSection(props)
{
    const amor_status = props.status.map((stat) => (
        <ArmorStatus key={stat.hash} name={stat.name} value={stat.value} />
    ));

    const total_stats = props.status
        .map((stat) => stat.value)
        .reduce((a, b) => a + b);

    const masterworked = total_stats > 57 ? styles.masterworked : "";

    return (
        <div className={styles.statusSection}>
            {amor_status}
            <div className={styles.armorStatus}>
                <span className={`${styles.statusLabel} ${masterworked}`}>Total</span>
                <span className={`${styles.statusNumber} ${masterworked}`}>{total_stats}</span>
            </div>
        </div>
    );
}

function ArmorStatus(props)
{
    function calculateBar(value: number)
    {
        return Math.min((value / 42) * 100, 100);
    }

    const masterworked = props.value >= 20 ? styles.masterworked : "null";
    const percentage = calculateBar(props.value);

    return (
        <div className={styles.armorStatus}>
            <span className={`${styles.statusLabel} ${masterworked}`}>
                {props.name}
            </span>
            <div className={styles.statusBarWrapper}>
                <div
                    className={`${styles.statusBar} ${masterworked}`}
                    style={{
                        width: `${percentage}%`
                    }}
                ></div>
            </div>
            <span className={`${styles.statusNumber} ${masterworked}`}>
                {props.value}
            </span>
        </div>
    );
}