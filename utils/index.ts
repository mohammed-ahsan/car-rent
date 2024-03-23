import { CarProps, FilterProps } from '@/types';

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, model, limit, fuel, sort } = filters;

  const headers = {
    'X-RapidAPI-Key': '2c6df64839mshf1571d24c145b18p17818djsnb9ed2f06617a',
    'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com',
  };
  const response = await fetch(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,
    { headers: headers }
  );

  const result = await response.json();
  let cars = result.map((car: CarProps) => ({ ...car, carRent: calculateCarRent(car.city_mpg, car.year) }));

  if (sort) cars = sortResults(cars, sort);

  return cars;
}

export const sortResults = (result: CarProps[], sort: string) => {
  if (sort === 'pricehigher') {
    const sorted = result.sort((a, b) => {
      if (a.carRent && b.carRent) {
        if (a.carRent > b.carRent) {
          return -1;
        } else {
          return 1;
        }
      }
      return 0;
    });
    return sorted;
  }
  if (sort === 'pricelower') {
    const sorted = result.sort((a, b) => {
      if (a.carRent && b.carRent) {
        if (a.carRent < b.carRent) {
          return -1;
        } else {
          return 1;
        }
      }
      return 0;
    });
    return sorted;
  }

  if (sort === 'mpghigher') {
    const sorted = result.sort((a, b) => {
      if (a.city_mpg > b.city_mpg) {
        return -1;
      } else {
        return 1;
      }
    });
    return sorted;
  }
  if (sort === 'mpglower') {
    const sorted = result.sort((a, b) => {
      if (a.city_mpg < b.city_mpg) {
        return -1;
      } else {
        return 1;
      }
    });
    return sorted;
  }
};

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 100;
  const mileageFactor = 2;
  const ageFactor = 2;

  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  const rentalRatePerDay = basePricePerDay - mileageRate - ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL('https://cdn.imagin.studio/getimage');

  const { make, year, model } = car;

  url.searchParams.append('customer', 'hrjavascript-mastery');
  url.searchParams.append('make', make);
  url.searchParams.append('modelFamily', model.split(' ')[0]);
  url.searchParams.append('zoomType', 'fullscreen');
  url.searchParams.append('modelYear', `${year}`);
  url.searchParams.append('angle', `${angle}`);

  return `${url}`;
};

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);

  if (!value) searchParams.delete(type);
  else searchParams.set(type, value);

  const newPathname = `${window.location.pathname}${searchParams.toString() && '?'}${searchParams.toString()}`;

  return newPathname;
};
