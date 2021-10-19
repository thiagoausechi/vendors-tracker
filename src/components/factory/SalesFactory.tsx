import ItemContainer from "../factory/ItemFactory";
import styles from "../../styles/Sales.module.css";

export default function SalesSection(props)
{
    const guardians_sales = props.guardians.map((guardian) => (<SaleSection key={guardian.name} guardian={guardian} />));

    return (
        <div
          className={styles.sectionWrapper}
          style={{ backgroundColor: `${props.color}` }}
        >
          {guardians_sales}
        </div>
      );
}

function SaleSection(props)
{
    const guardian = props.guardian;
    const guardian_name = guardian.name.toLowerCase();

    const exotic = getExoticIfAny(guardian);
    const itens = guardian.sales.map((sale) => (
      <ItemContainer key={sale.item.hash} item={sale} />
    ));

    return (
      <div className={`col-md-3 ${styles.section}`}>
        <div className={`${styles.header} ${getGuardianHeaderStyle(guardian_name)}`}>
          {guardian.name}
        </div>
        {exotic}
        <div className={styles.wrapper}>{itens}</div>
      </div>
    )
}

function getExoticIfAny(guardian) {
    return typeof guardian.exotic !== "undefined" ? (
      <ItemContainer
        key={guardian.exotic.item.hash}
        item={guardian.exotic}
        isExotic={true}
      />
    ) : null;
  }

  function getGuardianHeaderStyle(name: string)
  {
      switch(name)
      {
          case "hunter": return styles.hunter;
          case "titan": return styles.titan;
          case "warlock": return styles.warlock;
      }
  }