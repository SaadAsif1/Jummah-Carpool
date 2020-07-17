import React from 'react';
import { Input } from 'antd';
import { Link } from 'react-router-dom';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { GoogleApiWrapper } from 'google-maps-react';
import Geocode from 'react-geocode';
import './Jummah.css';

Geocode.setApiKey('AIzaSyBYHSjax_jdoZXv-eNPEwRx7lFF5FlJ3qU');

function JummahAddress() {
  const [address, setAddress] = React.useState('');
  const [curCity, setCity] = React.useState('');
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null,
  });

  // When User Actually Selects Address
  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
    console.log(latLng);

    Geocode.fromLatLng(latLng.lat, latLng.lng).then(
      (response) => {
        const addressArray = response.results[0].address_components;
        const city = getCity(addressArray);

        setCity({ city: city ? city : '' });
      },
      (error) => {
        console.error(error);
      }
    );
  };

  // Get City
  const getCity = (addressArray) => {
    let city = '';
    for (let i = 0; i < addressArray.length; i++) {
      if (
        addressArray[i].types[0] &&
        'administrative_area_level_2' === addressArray[i].types[0]
      ) {
        city = addressArray[i].long_name;
        return city;
      }
    }
  };

  // <p>Latitude: {coordinates.lat}</p>
  // <p>Longitude: {coordinates.lng}</p>

  return (
    <div className='jummah-address-container'>
      <div className='align-center jummah-address-title'>Please Enter Your Address</div>
      <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <Input
              style={{ width: '100%' }}
              size='large'
              {...getInputProps({ placeholder: 'Type address' })}
            />

            <div>
              {loading ? <div></div> : null}

              {suggestions.map((suggestion, index) => {
                const style = {
                  backgroundColor: suggestion.active
                    ? 'rgba(193, 174, 236, 0.8)'
                    : '#fff',
                  padding: '0.3rem',
                };

                return (
                  <div key={index} {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      <div className=' align-center'>
        <Link
          to={{
            pathname: '/jummah-map',
            state: { address, coordinates },
          }}
          disabled={curCity ? false : true}
        >
          <button
            className='jummah-options-btn align-center'
            style={{ borderRadius: '0', margin: '2rem 0' }}
            onClick={() => console.log(address, coordinates, curCity)}
          >
            Next
          </button>
        </Link>
      </div>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBYHSjax_jdoZXv-eNPEwRx7lFF5FlJ3qU',
})(JummahAddress);
