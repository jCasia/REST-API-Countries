import styles from './styles/CountryCardContainer.module.scss';
import CountryCard from './CountryCard';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useGlobalContext } from '../context';
import { useEffect } from 'react';
import LoadSpinner from './LoadSpinner';

const url = 'https://restcountries.com/v3.1/name/';

const CountryCardContainer = () => {
  const { searchTerm, fetchedData, setFetchedData } = useGlobalContext();

  const { data, isLoading, isError } = useQuery({
    //caches results in string key (countries), only if value changes, then useQuery refetches the results
    queryKey: ['countries', searchTerm || 'a'],
    queryFn: async () => {
      try {
        const result = await axios.get(`${url}${searchTerm}`);
        return result.data;
      } catch (error) {
        if (error.statusCode === 404) {
          return [];
        }
      }
    },
    enabled: searchTerm.length > 0,
  });

  useEffect(() => {
    setFetchedData(data ?? []); // if data is undefined or null
  }, [data]);

  if (isLoading) {
    return (
      <section className={styles.wrapper}>
        <LoadSpinner />
      </section>
    );
  }

  if (isError) {
    return (
      <section className={styles.wrapper}>
        <h1>No results found....</h1>
      </section>
    );
  }

  return (
    <div className={styles['cards-container']}>
      {fetchedData
        .sort((a, b) => {
          return a.name.common.localeCompare(b.name.common);
        })
        .map((country) => {
          return <CountryCard country={country} key={country.name.common} />;
        })}
    </div>
  );
};

export default CountryCardContainer;
