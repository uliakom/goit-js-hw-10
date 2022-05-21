import './css/styles.css';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}

refs.input.addEventListener('input', debounce(onSearch,DEBOUNCE_DELAY));


function onSearch(event) {
    const searchQuery = event.target.value.trim();
    if (searchQuery === '') {
        clearCountryList();
        clearCountryInfo();
        return;
    } else {
        return fetchCountries(searchQuery)
            .then(countries => {
                renderCountries(countries);
                if (searchQuery === 'russian' || searchQuery === 'russia' || searchQuery === 'russian federation') {
        Report.warning('Warning',
'It is country of murderers, rapists and robbers!!!',
'I agree',
);
    }
        }) 
            .catch(error => {
                console.log(error)
                Notify.failure('Oops, there is no country with that name');
            })
}   
};

function renderCountries(countries) {
       if (countries.length > 10) {
        clearCountryList();
        clearCountryInfo();
                Notify.info("Too many matches found. Please enter a more specific name.");
                return;
    }
             if (countries.length > 1) {
                 renderCountryList(countries);  
                 clearCountryInfo();
    }
            if (countries.length === 1) {
                renderCountryInfo(countries);
                clearCountryList();
            }
};

function renderCountryInfo(country) {
  const markup = country
        .map(({ name,capital, population, flags, languages }) => {
            return `<div class="flag-box">
  <img src="${flags.svg}" width="60" height="40" alt="country flag"> 
<p class="country-name">${name}</p>
</div>
<div class="info-box">
<p class="info-type">Capital: <span class="info-text">${capital}</span></p>
<p class="info-type">Population: <span class="info-text">${population}</span></p>
<p class="info-type">Languages: <span class="info-text">${languages[0].name}</span></p>
</div>`;
        })
      .join('');
    refs.countryInfo.innerHTML = '';
    refs.countryInfo.insertAdjacentHTML('beforeend', markup);
};   

function renderCountryList(countries) {
    console.log(countries);
    const markup = countries
        .map(({ name, flags, }) => {
            return `<li class="country-list-item"><div class="list-box">
    <img src="${flags.svg}" width="36" height="24" alt="country flag">
<p class="country-name-list">${name}</p>
</div></li>`
        })
    .join('');
    refs.countryList.insertAdjacentHTML('beforeend', markup);
};

function clearCountryList() {
    refs.countryList.innerHTML='';
};

function clearCountryInfo() {
    refs.countryInfo.innerHTML='';
};

