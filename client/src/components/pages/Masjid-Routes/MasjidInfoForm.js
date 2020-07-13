import React, { useEffect, useState } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, TimePicker } from 'antd';
import { isAuth, getCookie } from '../../../helpers/auth';
import './Masjid.css';

const MasjidInfoForm = ({ history }) => {
  const [data, setData] = useState('');
  const [buttonText, setButtonText] = useState('Submit');
  const [jummah1, setJummah1] = useState({
    start: '',
    end: '',
  });
  const [jummah2, setJummah2] = useState({
    start: '',
    end: '',
  });

  const [form] = Form.useForm();

  useEffect(() => {
    // Get Token
    const token = getCookie('token');

    // Call Api to see if masjid filled out pre info
    axios
      .get(`/api/masjid/${isAuth()._id}`, {
        headers: {
          'auth-token': token,
        },
      })
      .then((response) => {
        setData(response.data.masjidProfile);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Form Submit
  const onFinish = (values) => {
    // Get Token
    const token = getCookie('token');

    const { address, city, website } = values;
    let jummahTimes = [jummah1];

    // If There is a Jummah two
    if (jummah2.start) {
      jummahTimes.push(jummah2);
    }

    // Change Button Text
    setButtonText('Submitting...');

    axios
      .post(
        '/api/masjid/info',
        { city, address, website, setup: 'true', jummahTimes },
        {
          headers: {
            'auth-token': token,
          },
        }
      )
      .then((response) => {
        setButtonText('Submit');
        history.push('/masjid-home');
      })
      .catch((error) => {
        console.log(error);
        setButtonText('Submit');
      });
  };

  return (
    <div className='masjid-container'>
      {data ? (
        JSON.parse(data.setup) ? (
          <Redirect to='/masjid-home' />
        ) : (
          <div className='masjid-info-form'>
            <div className='masjid-info-title-container align-center'>
              <h1 className='masjid-info-title l-spacing'>Masjid Info</h1>
            </div>

            <Form layout='vertical' form={form} onFinish={onFinish}>
              <Form.Item
                name='city'
                label='City'
                rules={[
                  {
                    required: true,
                    message: 'Please input your city!',
                  },
                ]}
              >
                <Input placeholder='Your City' />
              </Form.Item>

              <Form.Item
                name='address'
                label='Address'
                rules={[
                  {
                    required: true,
                    message: 'Please input your address!',
                  },
                ]}
              >
                <Input placeholder='Your Address' />
              </Form.Item>

              <Form.Item
                name='website'
                label='Website'
                rules={[
                  {
                    required: true,
                    message: 'Please input your website!',
                  },
                ]}
              >
                <Input addonBefore='Full Link' />
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
                        setJummah1({
                          start: time,
                          end: jummah1.end,
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
                        setJummah1({
                          start: jummah1.start,
                          end: time,
                        })
                      }
                    />
                  </Form.Item>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Form.Item
                    name='jummah-start-time-2'
                    style={{ width: '48%', display: 'block' }}
                  >
                    <TimePicker
                      use12Hours
                      format='h:mm a'
                      style={{ width: '100%', display: 'block' }}
                      placeholder='Jummah start time'
                      onChange={(value, time) =>
                        setJummah2({
                          start: time,
                          end: jummah2.end,
                        })
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    name='jummah-end-time-2'
                    style={{ width: '48%', display: 'block' }}
                  >
                    <TimePicker
                      use12Hours
                      format='h:mm a'
                      placeholder='Jummah end time'
                      style={{ width: '100%', display: 'block' }}
                      onChange={(value, time) =>
                        setJummah2({
                          start: jummah2.start,
                          end: time,
                        })
                      }
                    />
                  </Form.Item>
                </div>
              </div>

              <Form.Item>
                <button
                  disabled={buttonText === 'Submitting...' ? true : false}
                  className='btn l-spacing'
                  style={{ width: '100%', marginTop: '1rem' }}
                >
                  {buttonText}
                </button>
              </Form.Item>
            </Form>
          </div>
        )
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default withRouter(MasjidInfoForm);
