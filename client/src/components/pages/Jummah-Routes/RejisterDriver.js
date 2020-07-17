import React, { useState, useEffect } from 'react';
import { Form, Input, notification, Checkbox, TimePicker } from 'antd';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { GoogleApiWrapper } from 'google-maps-react';
import Geocode from 'react-geocode';
import { isAuth, getCookie } from '../../../helpers/auth';
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
  const [jummah, setJummah] = useState({
    start: '',
    end: '',
  });
  const [timeLeaving, setTimeLeaving] = useState('');

  // When User Actually Selects Address
  const handleSelect = (name) => async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);

    if (name === 'masjid') {
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
    } else {
      setCurAddress(value);
      setCurCoordinates(latLng);

      Geocode.fromLatLng(latLng.lat, latLng.lng).then(
        (response) => {
          const addressArray = response.results[0].address_components;
          const city = getCity(addressArray);

          setCurCity({ city: city ? city : '' });
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
    if (!masjidCity) {
      return notification.error({ message: 'Please enter a masjid address!' });
    }
    if (!curCity) {
      return notification.error({ message: 'Please enter a your current location!' });
    }

    setButtonText('Submitting...');

    // Get Token
    const token = getCookie('token');

    // Send to serve
    axios
      .post(
        '/api/driver/create',
        {
          masjid_location: [
            {
              city: masjidCity.city,
              address: masjidAddress,
              coordinates: masjidCoordinates,
            },
          ],
          time_leaving: timeLeaving,
          jumma_timings: jummah,
          current_location: [
            { city: curCity.city, address: curAddress, coordinates: curCoordinates },
          ],
          city: curCity.city,
          phone_number: values.phone,
          radius_in_miles: values.radius_in_miles,
          message: values.message,
        },
        {
          headers: {
            'auth-token': token,
          },
        }
      )
      .then((response) => {
        form.resetFields();
        setButtonText('Submit');
      })
      .catch((error) => {
        notification.error({
          message: error.response.data.error,
        });
        setButtonText('Submit');
      });
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

                <div style={{ border: 'solid 0.5px lightgray' }}>
                  {loading ? <div></div> : null}

                  {suggestions.map((suggestion, index) => {
                    const style = {
                      backgroundColor: suggestion.active ? '#f4f4f4' : '#fff',
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

        <div>
          <h3 className='align-center'>Jummah Timings (Friday)</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Form.Item
              name='jummah-start-time-1'
              style={{ width: '48%', display: 'block' }}
              rules={[{ required: true, message: 'Enter jummah start time!' }]}
            >
              <TimePicker
                use12Hours
                format='h:mm a'
                style={{ width: '100%', display: 'block' }}
                placeholder='Jummah start time'
                onChange={(value, time) =>
                  setJummah({
                    start: time,
                    end: jummah.end,
                  })
                }
              />
            </Form.Item>
            <Form.Item
              name='jummah-end-time-1'
              style={{ width: '48%', display: 'block' }}
              rules={[{ required: true, message: 'Enter jummah end time!' }]}
            >
              <TimePicker
                use12Hours
                format='h:mm a'
                placeholder='Jummah end time'
                style={{ width: '100%', display: 'block' }}
                onChange={(value, time) =>
                  setJummah({
                    start: jummah.start,
                    end: time,
                  })
                }
              />
            </Form.Item>
          </div>
        </div>

        <Form.Item label='Current Location'>
          <PlacesAutocomplete
            value={curAddress}
            onChange={setCurAddress}
            onSelect={handleSelect('current_location')}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <Input {...getInputProps({ placeholder: 'Type Location' })} />

                <div style={{ border: 'solid 0.5px lightgray' }}>
                  {loading ? <div></div> : null}

                  {suggestions.map((suggestion, index) => {
                    const style = {
                      backgroundColor: suggestion.active ? '#f4f4f4' : '#fff',
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
          </PlacesAutocomplete>
        </Form.Item>

        <Form.Item
          name='time_leaving'
          label='Time Leaving Current Location'
          rules={[{ required: true, message: 'Enter Time Leaving Current Location!' }]}
        >
          <TimePicker
            use12Hours
            format='h:mm a'
            placeholder='Time Leaving'
            style={{ width: '100%', display: 'block' }}
            onChange={(value, time) => setTimeLeaving(time)}
          />
        </Form.Item>

        <Form.Item
          name='phone'
          label='Phone Number'
          rules={[{ required: true, message: 'Please input your phone number!' }]}
        >
          <Input placeholder='Your Number' />
        </Form.Item>

        <Form.Item
          name='radius_in_miles'
          label='Travel Radius'
          rules={[{ required: true, message: 'This Feild is Required!' }]}
        >
          <Input
            placeholder='miles willing to drive to meet pickup someone '
            type='number'
          />
        </Form.Item>

        <Form.Item
          rules={[{ required: true, message: 'This Message is Required!' }]}
          name='message'
          label='Message'
        >
          <Input.TextArea
            placeholder='You can enter a meetup point or a detailed description of how far or where to meet up'
            autoSize={{ minRows: 8, maxRows: 15 }}
          />
        </Form.Item>

        <Form.Item>
          <button
            disabled={buttonText === 'Submitting...' ? true : false}
            className='btn'
            style={{
              borderRadius: '0',
              width: '100%',
              marginTop: '1rem',
              fontSize: '1rem',
            }}
          >
            {buttonText}
          </button>
        </Form.Item>
      </Form>
    </div>
  );

  return (
    <div className='home-container'>
      <div className='driver-form'>
        <h1 className='align-center'>Register Driver</h1>

        {signUpForm()}
      </div>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBYHSjax_jdoZXv-eNPEwRx7lFF5FlJ3qU',
})(RejisterDriver);
