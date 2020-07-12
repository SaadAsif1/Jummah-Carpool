import React, { useState } from 'react';
import { Form, Input, notification } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import HomeNavbar from '../layouts/Home-Navbar/Navbar';
import './Auth.css';

const ForgotPassword = () => {
  const [buttonText, setButtonText] = useState('Submit');

  const [form] = Form.useForm();

  const onFinish = (values) => {
    setButtonText('Submitting...');

    axios({
      method: 'PUT',
      url: `/api/forgot-password`,
      data: { email: values.email },
    })
      .then((response) => {
        form.resetFields();
        notification.success({ message: response.data.message });
        setButtonText('Submit');
      })
      .catch((error) => {
        notification.error({ message: error.response.data.error });
        setButtonText('Submit');
      });
  };

  // Signup Form
  const forgotPasswordForm = () => (
    <div>
      <Form layout='vertical' form={form} onFinish={onFinish}>
        <Form.Item
          name='email'
          label='Email'
          rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
        >
          <Input placeholder='Your Email' />
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

  // Form Styles
  const forgotPasswordStyles = {
    margin: '5rem auto',
    width: '50%',
    marginTop: '4rem',
    padding: '2rem',
    backgroundColor: '#ffff',
  };

  return (
    <div className='home-container'>
      <HomeNavbar />
      <div className='form-style'>
        <h1 className='align-center'>Forgot password</h1>
        {forgotPasswordForm()}

        <div>
          Already Have an Account <Link to='/sign-in'>Sign In</Link> here
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
