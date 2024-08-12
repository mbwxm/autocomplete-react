import './App.css';
import Autocomplete from './components/Autocomplete/Autocomplete';
import cities from "./cities.json";
import countries from "./countries.json";
import { useState } from 'react';

function AutocompleteContainer() {
  const [citySelected, setCitySelected] = useState('');
  function CitySelected(selectedCity: string): void {    
    setCitySelected(selectedCity);
  }
  
  const [countrySelected, setCountrySelected] = useState('');
  function CountrySelected(selectedCountry: string): void {     
    setCountrySelected(selectedCountry);
  }

  return (
    <div className="container">
      <fieldset>
        <legend>Location Information</legend>
        <div className="location-layout">
          <div className="city">
            <Autocomplete
              name="city"
              placeholder='City'
              autocompleteItems={ cities }
              onItemSelected={ CitySelected }
            />
            { citySelected !== '' && <h4>The city has been set to {citySelected}</h4> }
          </div>
          <div className="country">
            <Autocomplete
              name="country"
              placeholder='Country'
              autocompleteItems={ countries }
              onItemSelected={ CountrySelected }
            />
            { countrySelected !== '' && <h4>The country has been set to {countrySelected}</h4> }
          </div>
        </div>
      </fieldset>
    </div>
  )
}

export default function App() {
  return (
    <>
      <AutocompleteContainer />
    </>
  );
}
