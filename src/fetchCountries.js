
const BASE_URL = 'https://restcountries.com/v2';

export default function fetchCountries(name) {
    const url = `${BASE_URL}/name/${name}?fields=name,capital,population,flags,languages`;
    return fetch(url).then(response =>{
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  } );
};

