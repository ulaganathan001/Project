import React from 'react';
import loc from "../assets/Images/Map.jpg"
import placeholderImage from '../assets/Images/location.gif';
import placeholderImage1 from '../assets/Images/phone.gif';
import placeholderImage2 from '../assets/Images/message.gif';


const ContactForm = () => {
  const [formStatus, setFormStatus] = React.useState('Send');

  const onSubmit = (e) => {
    e.preventDefault();
    setFormStatus('Sending...');

    const { name, email, message } = e.target.elements;
    let formData = {
      name: name.value,
      email: email.value,
      message: message.value,
    };

    // Assuming you have a backend endpoint for handling form submissions
    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to submit form');
      })
      .then((data) => {
        window.alert('Contact form submitted successfully');
        console.log(data); // You can handle the response from the server here
      })
      .catch((error) => {
        console.error('Error submitting form:', error);
        window.alert('Failed to submit contact form. Please try again.');
      })
      .finally(() => {
        setFormStatus('Send');
      });
  };

  return (
    <div className="container-fluid justify-content-center" style={{ backgroundColor: '#ffeec8' }}>
      <div className="row ">
        <div className="col-md-6 mt-3">
          <h2>Contact Us</h2>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="name">
               <h5>Name</h5> 
              </label>
              <input className="form-control" type="text" id="name" required />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="email">
                <h5>Email</h5>
              </label>
              <input className="form-control" type="email" id="email" required />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="message">
                <h5>Message</h5>
              </label>
              <textarea className="form-control" id="message" required />
            </div>
            
            <button className="btn btn-warning" type="submit" disabled={formStatus === 'Sending...'}>
              {formStatus}
            </button>
          </form>
        </div>
        <div className="col-md-6">
          <div className="location-container">

            <a href="/location" target="_blank" rel="noopener noreferrer">
              <img src={loc} alt="Location" className="location-image" />
            </a>
          </div>
        </div>
      </div><br /><br />


      <div>
        <div class="container marketing">

          <div class="row">
            <div class="col-lg-4">
              <svg
                className="bd-placeholder-img rounded-circle"
                width="140"
                height="140"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder: 140x140"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#4B6F44" />
                <image href={placeholderImage} width="100%" height="100%" />
              </svg>

              <h2>Address</h2>
              <p>#43, SIPCOT IT Park</p>
              <p>Chennai, 639005</p>

            </div>
            <div class="col-lg-4">
              <svg
                className="bd-placeholder-img rounded-circle"
                width="140"
                height="140"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder: 140x140"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#4B6F44" />
                <image href={placeholderImage1} width="100%" height="100%" />
              </svg>

              <h2>Phone</h2>
              <p>+22 1254 5489</p>
            </div>
            <div class="col-lg-4">
              <svg
                className="bd-placeholder-img rounded-circle"
                width="140"
                height="140"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#4B6F44" />
                <image href={placeholderImage2} width="100%" height="100%" />
              </svg>

              <h2>Email</h2>
              <p>teamspartans@greencart.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default ContactForm;
