'use client';

import { useState, useEffect } from 'react';

import { fetchCars } from '@/utils';
import { CarProps, HomeProps } from '@/types';
import { fuels, yearsOfProduction, sort } from '@/constants';
import { CarCard, ShowMore, SearchBar, CustomFilter, Hero, LoadingScreen, Alert } from '@/components';
import { Suspense } from 'react';

export default function Feed({ searchParams }: HomeProps) {
  const [allCars, setAllCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [alert, setAlert] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const result = await fetchCars({
        manufacturer: searchParams.manufacturer || '',
        year: searchParams.year || 2022,
        fuel: searchParams.fuel || '',
        limit: searchParams.limit || 10,
        model: searchParams.model || '',
        sort: searchParams.sort || '',
      });

      setAllCars(result);
      setIsLoading(false);
    };

    fetchData();
  }, [searchParams]);

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  if (isLoading) return <LoadingScreen />;
  return (
    <>
      <Alert title={alert} />

      <div className="home__text-container">
        <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
        <p>Explore out cars you might like</p>
      </div>

      <div className="home__filters !items-start">
        <SearchBar setIsLoading={setIsLoading} />

        <div className="home__filter-container !items-start">
          <CustomFilter
            title="fuel"
            options={fuels}
            setIsLoading={setIsLoading}
            selectedFilter={selectedFilter}
            setSelectedFilter={() => setSelectedFilter('fuel')}
          />
          <CustomFilter
            title="year"
            options={yearsOfProduction}
            setIsLoading={setIsLoading}
            selectedFilter={selectedFilter}
            setSelectedFilter={() => setSelectedFilter('year')}
          />
          <CustomFilter
            title="sort"
            options={sort}
            setIsLoading={setIsLoading}
            selectedFilter={selectedFilter}
            setSelectedFilter={() => setSelectedFilter('sort')}
          />
        </div>
      </div>
      {!isDataEmpty ? (
        <section>
          <div className="home__cars-wrapper">
            {allCars?.map((car: CarProps) => (
              <CarCard
                car={car}
                key={Object.values(car).join('')}
                handleAlert={() => {
                  setAlert('We will contact you soon!');
                  setTimeout(() => {
                    setAlert('');
                  }, 3000);
                }}
              />
            ))}
          </div>

          <ShowMore pageNumber={(searchParams.limit || 10) / 10} isNext={(searchParams.limit || 10) > allCars.length} />
        </section>
      ) : (
        <div className="home__error-container">
          <h2 className="text-black text-xl font-bold">Oops, no results</h2>
        </div>
      )}
    </>
  );
}
