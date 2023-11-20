import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faGoogle, faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faGem, faHome, faEnvelope, faPhone, faPrint } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <>
      <footer className='text-center text-lg-start text-muted footer'>
        <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom footer'>
          <div className='me-5 d-none d-lg-block footer'>
            <span>Get connected with us on social networks:</span>
          </div>

          <div>
            <a href="https://www.facebook.com" className='me-4 text-reset'>
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="https://twitter.com/" className='me-4 text-reset'>
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="https://www.gmail.com" className='me-4 text-reset'>
              <FontAwesomeIcon icon={faGoogle} />
            </a>
            <a href="https://www.instagram.com" className='me-4 text-reset'>
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://www.linkedin.com" className='me-4 text-reset'>
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
        </section>

        <section className='footer'>
          <div className='container text-center text-md-start mt-5'>
            <div className='row mt-3'>
              <div className='col-md-3 col-lg-4 col-xl-3 mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>
                  <FontAwesomeIcon icon={faGem} className='me-3' />
                  <strong> Green Cart </strong>
                </h6>
                <p>
                  All the Organic things under one roof. <br />
                  Eat Clean... Live Green...
                </p>
              </div>

              <div className='col-md-2 col-lg-2 col-xl-2 mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>Products</h6>
                <p>
                  <a href='/' className='text-reset'>
                    Fresh Produces & Dairy's
                  </a>
                </p>
                <p>
                  <a href='/' className='text-reset'>
                    Nuts & Seeds
                  </a>
                </p>
                <p>
                  <a href='/' className='text-reset'>
                    Herbs & Oils
                  </a>
                </p>
                <p>
                  <a href='/' className='text-reset'>
                    Special Items
                  </a>
                </p>
              </div>

              <div className='col-md-3 col-lg-2 col-xl-2 mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
                <p>
                  <a href='/' className='text-reset'>
                    Home
                  </a>
                </p>
                <p>
                  <a href='/product' className='text-reset'>
                    Product
                  </a>
                </p>
                <p>
                  <a href='/about' className='text-reset'>
                    About Us
                  </a>
                </p>
                <p>
                  <a href='/contact' className='text-reset'>
                    Contact Us
                  </a>
                </p>
              </div>

              <div className='col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                <p>
                  <FontAwesomeIcon icon={faHome} className='me-2' />
                  Siruseri, Chennai, INDIA.
                </p>
                <p>
                  <FontAwesomeIcon icon={faEnvelope} className='me-3' />
                  info@greencart.com
                </p>
                <p>
                  <FontAwesomeIcon icon={faPhone} className='me-3' /> + 91 234 567 88
                </p>
                <p>
                  <FontAwesomeIcon icon={faPrint} className='me-3' /> + 91 234 567 89
                </p>
              </div>
            </div>
          </div>
        </section>

        <div
          className='text-center p-4 footer'
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
        >
          © 2023 Copyright:
          <a className='text-reset fw-bold' href='/'>
            teamSpartans@changepond.com
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;





