import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, notification, Checkbox } from 'antd';
import axios from 'axios';
import HomeNavbar from '../layouts/Home-Navbar/Navbar';
import './Auth.css';

const RegisterMasjid = () => {
  const [buttonText, setButtonText] = useState('Submit');
  const [terms, setTerms] = useState(false);

  const [form] = Form.useForm();

  const onFinish = (values) => {
    if (JSON.parse(values.age) < 18) {
      return notification.error({
        message: 'Must be 18 or older to sign up!',
      });
    }

    if (!terms) {
      return notification.error({
        message: 'Must Agree With Terms And Conditions',
      });
    }

    setButtonText('Submitting...');

    axios
      .post('/api/signup', {
        name: values.name,
        email: values.email,
        age: values.age,
        password: values.confirm,
        masjid: 'true',
      })
      .then((response) => {
        notification.success({ message: response.data.message });
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

  // Check box
  function onChange(e) {
    setTerms(e.target.checked);
  }

  // Signup Form
  const masjidForm = () => (
    <div>
      <Form layout='vertical' form={form} onFinish={onFinish}>
        <Form.Item
          name='name'
          label='Masjid Name'
          rules={[{ required: true, message: 'Please input your Masjid Name!' }]}
        >
          <Input placeholder='Masjid Name' />
        </Form.Item>
        <Form.Item
          name='email'
          label='Email'
          rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
        >
          <Input placeholder='Your Email' />
        </Form.Item>
        <Form.Item
          name='age'
          label='Year Founded'
          rules={[{ required: true, message: 'Please input your age!' }]}
        >
          <Input placeholder='Founded' type='number' />
        </Form.Item>
        <Form.Item
          name='password'
          label='Password'
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password placeholder='Your Password' />
        </Form.Item>

        <Form.Item
          name='confirm'
          label='Confirm Password'
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('The two passwords that you entered do not match!');
              },
            }),
          ]}
        >
          <Input.Password placeholder='Confirm Your Password' />
        </Form.Item>

        <Form.Item name='terms'>
          <Checkbox onChange={onChange}>
            I Agree With <Link to='/terms-conditions'>Terms & Conditions</Link>
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <button
            disabled={buttonText === 'Submitting...' ? true : false}
            className='btn l-spacing'
          >
            {buttonText}
          </button>
        </Form.Item>
      </Form>
    </div>
  );

  return (
    <div className='home-container'>
      <HomeNavbar />
      <div className='form-style'>
        <h1 className='align-center'>Masjid Registration</h1>

        {masjidForm()}
        <div>
          Already have an account? <Link to='/sign-in'>Sign In</Link> here
        </div>
      </div>
    </div>
  );
};

export default RegisterMasjid;
