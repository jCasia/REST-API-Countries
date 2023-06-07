import { Link } from 'react-router-dom';
import styles from './styles/CountryCard.module.scss';
import dummyImg from '../assets/soon-img.png';

const CountryCard = ({ country }) => {
  const {
    name: { common: countryName },
    flags: { svg: countryImg, alt },
    population,
    region,
    capital,
  } = country;

  const populationFixed = population.toLocaleString('en', {
    useGrouping: true,
  });

  return (
    <Link to='/details' className={styles.cards}>
      <div className={styles['card-container']}>
        <img src={countryImg} alt={alt} />

        <div className={styles.wrapper}>
          <h2>{countryName}</h2>
          <div className={styles['info-container']}>
            <p>
              Population: <span>{populationFixed}</span>
            </p>
            <p>
              Region: <span>{region}</span>
            </p>
            <p>
              Capital: <span>{capital}</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CountryCard;
