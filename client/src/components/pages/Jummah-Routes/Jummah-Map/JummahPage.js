import React from 'react';
import JummahMap from './JummahMap';
import { Input } from 'antd';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { GoogleApiWrapper } from 'google-maps-react';
import './JummahMap.css';

const JummahPage = ({ location }) => {
  const [address, setAddress] = React.useState(location.state.address);
  const [coordinates, setCoordinates] = React.useState(location.state.coordinates);

  // When User Actually Selects Address
  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
  };

  return (
    <div>
      <JummahMap state={{ address, coordinates }} />
      {/* Side bar */}
      <div className='jummah-map-sidebar'>
        <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <Input
                style={{ width: '100%', color: 'black' }}
                size='large'
                {...getInputProps({ placeholder: 'Type address' })}
              />

              <div>
                {loading ? <div></div> : null}

                {suggestions.map((suggestion) => {
                  const style = {
                    backgroundColor: suggestion.active ? '#41b6e6' : '#fff',
                    padding: '0.3rem',
                    border: 'solid 0.5px lightgray',
                    paddingBottom: '0.1rem',
                    color: 'black',
                  };

                  return (
                    <div
                      key={suggestion.id}
                      {...getSuggestionItemProps(suggestion, { style })}
                    >
                      {suggestion.description}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
        <div className='jummah-map-box'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit itaque quam fuga
          autem reprehenderit saepe dolore quaerat consectetur maiores ullam!
        </div>
        <div className='jummah-map-box'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit itaque quam fuga
          autem reprehenderit saepe dolore quaerat consectetur maiores ullam!
        </div>
        <div className='jummah-map-box'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit itaque quam fuga
          autem reprehenderit saepe dolore quaerat consectetur maiores ullam!
        </div>
        <div className='jummah-map-box'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit itaque quam fuga
          autem reprehenderit saepe dolore quaerat consectetur maiores ullam!
        </div>
        <div className='jummah-map-box'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit itaque quam fuga
          autem reprehenderit saepe dolore quaerat consectetur maiores ullam!
        </div>
      </div>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBYHSjax_jdoZXv-eNPEwRx7lFF5FlJ3qU',
})(JummahPage);
