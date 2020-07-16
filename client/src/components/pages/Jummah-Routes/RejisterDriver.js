import React, { useState, useEffect } from 'react';
import { Form, Input, notification, Checkbox } from 'antd';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { GoogleApiWrapper } from 'google-maps-react';
import Geocode from 'react-geocode';
import { isAuth } from '../../../helpers/auth';
import axios from 'axios';

Geocode.setApiKey('AIzaSyBYHSjax_jdoZXv-eNPEwRx7lFF5FlJ3qU');

const RejisterDriver = () => {
  const [buttonText, setButtonText] = useState('Submit');
  const [masjidAddress, setMasjidAddress] = React.useState('');
  const [masjidCity, setMasjidCity] = React.useState('');
  const [masjidCoordinates, setMasjidCoordinates] = React.useState({
    lat: null,
    lng: null,
  });
  const [curAddress, setCurAddress] = React.useState('');
  const [curCity, setCurCity] = React.useState('');
  const [curCoordinates, setCurCoordinates] = React.useState({
    lat: null,
    lng: null,
  });

  // When User Actually Selects Address
  const handleSelect = (name) => async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);

    if (name === 'masjid') {
      setMasjidAddress(value);
      setMasjidCoordinates(latLng);
      console.log(latLng);
      console.log('masjid');

      Geocode.fromLatLng(latLng.lat, latLng.lng).then(
        (response) => {
          const addressArray = response.results[0].address_components;
          const city = getCity(addressArray);

          setMasjidCity({ city: city ? city : '' });
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      setMasjidAddress(value);
      setMasjidCoordinates(latLng);

      Geocode.fromLatLng(latLng.lat, latLng.lng).then(
        (response) => {
          const addressArray = response.results[0].address_components;
          const city = getCity(addressArray);

          setMasjidCity({ city: city ? city : '' });
        },
        (error) => {
          console.error(error);
        }
      );
    }
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

  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
    setButtonText('Submitting...');
  };

  // Signup Form
  const signUpForm = () => (
    <div>
      <Form layout='vertical' form={form} onFinish={onFinish}>
        <Form.Item label='Name'>
          <Input style={{ color: 'grey' }} value={isAuth().name} disabled />
        </Form.Item>
        <Form.Item label='Email'>
          <Input style={{ color: 'grey' }} value={isAuth().email} disabled />
        </Form.Item>
        <Form.Item label='Age'>
          <Input style={{ color: 'grey' }} value={isAuth().age} disabled />
        </Form.Item>
        <Form.Item label='Masjid Address'>
          <PlacesAutocomplete
            value={masjidAddress}
            onChange={setMasjidAddress}
            onSelect={handleSelect('masjid')}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <Input {...getInputProps({ placeholder: 'Type address' })} />

                <div>
                  {loading ? <div></div> : null}

                  {suggestions.map((suggestion, index) => {
                    const style = {
                      backgroundColor: suggestion.active
                        ? 'rgba(37, 207, 162, 0.4)'
                        : '#fff',
                      padding: '0.3rem',
                    };

                    return (
                      <div
                        key={index}
                        className='search-suggestion'
                        {...getSuggestionItemProps(suggestion, { style })}
                      >
                        {suggestion.description}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>{' '}
        </Form.Item>

        <Form.Item>
          <button
            disabled={buttonText === 'Submitting...' ? true : false}
            className='btn'
            style={{ borderRadius: '0' }}
          >
            {buttonText}
          </button>
        </Form.Item>
      </Form>
    </div>
  );

  return (
    <div className='home-container'>
      <div className='form-style'>
        <h1 className='align-center'>Register Driver</h1>

        {signUpForm()}
      </div>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBYHSjax_jdoZXv-eNPEwRx7lFF5FlJ3qU',
})(RejisterDriver);
