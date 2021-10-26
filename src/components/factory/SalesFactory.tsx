import ItemContainer from "../factory/ItemFactory";
import styles from "../../styles/Sales.module.css";
import { HASH_HUNTER, HASH_TITAN, HASH_WARLOCK } from "../../core/Lib/HashLexicon";

export default function SalesSection(props)
{
  const guardians_sales = props.guardians.map((guardian) => (<SaleSection key={guardian.hash} guardian={guardian} />));

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

  const exotic = getExoticIfAny(guardian);
  const itens = guardian.sales.map((sale) => (
    <ItemContainer key={sale.item.hash} item={sale} />
  ));

  return (
    <div className={`col-md-3 ${styles.section}`}>
      <div className={`${styles.header} ${getGuardianHeaderStyle(guardian.hash)}`}>
        {guardian.name}
      </div>
      {exotic}
      <div className={styles.wrapper}>{itens}</div>
    </div>
  )
}

function getExoticIfAny(guardian)
{
  return guardian.exotic ? (
    <ItemContainer
      key={guardian.exotic.item.hash}
      item={guardian.exotic}
      isExotic={true}
    />
  ) : null;
}

function getGuardianHeaderStyle(name: string)
{
  switch (name)
  {
    case HASH_TITAN: return styles.titan;
    case HASH_HUNTER: return styles.hunter;
    case HASH_WARLOCK: return styles.warlock;
  }
}