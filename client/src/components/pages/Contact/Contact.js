import React, { Component } from 'react';
import HomeNavbar from '../../layouts/Home-Navbar/Navbar';
import './Contact.css';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.state = {
      status: '',
      btnText: 'Submit',
    };
  }

  submitForm(ev) {
    ev.preventDefault();

    this.setState({ btnText: 'Submitting . . . ' });

    const form = ev.target;
    const data = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        form.reset();
        this.setState({ btnText: 'Thank You!' });
        setTimeout(() => {
          this.setState({ btnText: 'Submit' });
        }, 2000);
      } else {
        this.setState({ status: 'ERROR' });
      }
    };
    xhr.send(data);
  }

  render() {
    const { btnText } = this.state;
    return (
      <div className='home-container'>
        <HomeNavbar />

        <form
          onSubmit={this.submitForm}
          action='https://formspree.io/mwkrwppz'
          method='POST'
          className='contact-container'
        >
          <div className='contact-title-container'>
            <div className='contact-title'>Contact</div>
          </div>
          <div className='input-container'>
            <label className='input-label'>Name </label>
            <input type='text' name='name' placeholder='Your Name . . .' required />
          </div>
          <div className='input-container'>
            <label className='input-label'>Email </label>
            <input type='email' name='email' placeholder='Your Email . . .' required />
          </div>
          <div className='input-container'>
            <label className='input-label'>Message </label>
            <textarea type='text' name='message' placeholder='Your Message . . .' required />
          </div>
          <button className='btn l-spacing' style={{ width: '100%', padding: '0.6rem' }}>
            {btnText}
          </button>
        </form>
      </div>
    );
  }
}

export default Contact;
