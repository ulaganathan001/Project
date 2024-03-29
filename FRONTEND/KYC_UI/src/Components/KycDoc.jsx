import React, { useState } from 'react';
import { Row, Col, Form, Button, ProgressBar } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import DefiningU from './Pages/DefiningU';


import UploadKyc from './Pages/Logos/UploadKyc';
import UserNav from './UserNav';

import { useSelector } from 'react-redux'

import axios from 'axios';

function KycDoc() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentAddress, setCurrentAddress] = useState('');
  const [documentType, setDocumentType] = useState('');

  const informationData = useSelector(state => state.information);

  const showdata = () => {
    alert('User ID:' + informationData.user_id +
      'User Name:' + informationData.user_Name +
      'Email:' + informationData.email +
      'Password:' + informationData.password +
      'Token:' + informationData.token +
      'Role ID:' + informationData.role_id);
  };

  const notify = (message) => {
    toast.warning(message, {
      zIndex: 1,
    });
  };

  const notifySuccess = (message) => {
    toast.success(message, {
      zIndex: 1,
    });
  };

  const handleFileChange = (event) => {
    setSelectedFile(null);
    setUploadProgress(0);
    const file = event.target.files[0];

    if (file && file.size > 1024 * 1024) {
      // File size is greater than 1MB, show alert message
      notify("File size exceeds the allowed limit of 1MB.");
    } else {
      const allowedExtensions = ['pdf', 'doc', 'docx', 'png', 'jpg', 'jpeg'];
      const fileExtension = file.name.split('.').pop().toLowerCase();

      if (!allowedExtensions.includes(fileExtension)) {
        // File extension is not allowed, show alert message
        notify('Only PDF, DOC, DOCX, PNG, JPG, JPEG files are allowed.');
      } else {
        setSelectedFile(file);
      }
    }
  };

  const handleUploadProgress = () => {
    setUploadProgress(0);
    // Simulating file upload progress
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress === 100) {
          clearInterval(interval);
          return 100;
        } else {
          return prevProgress + 10;
        }
      });
    }, 500);
  };



  const handleAddressChange = (event) => {
    setCurrentAddress(event.target.value);
  };

  const handleDocumentTypeChange = (e) => {
    setDocumentType(e.target.value);
  };


  // ==============================================

  const handleKYCUpload = () => {
    // Retrieve user_id from localStorage
    const userId = localStorage.getItem('user_Id');


    // Check if selectedFile, currentAddress, and documentType are available
    if (!selectedFile || !currentAddress || !documentType || uploadProgress !== 100) {
      notify('Please provide all required data before uploading KYC documents.');
      return;
    }

    // Prepare formData for file upload
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('user_id', userId);
    formData.append('current_address', currentAddress);
    formData.append('document_type', documentType);

    // Make POST request to the API endpoint
    axios.post('http://localhost:8080/userInformation/uploadKYC', formData)
      .then(response => {
        // Handle successful response
        console.log(response);
        console.log('Success');
        setSelectedFile(null); // Clear selected file
        notifySuccess('Successfully Uploaded');
      })
      .catch(error => {
        // Handle error
        console.error('Error uploading KYC document:', error);
        notify('Internal server error');

        if (error.response && error.response.status === 500) {
          notify('Internal Server Error');
        }

        if (error.code === "ERR_BAD_REQUEST") {
          notify('TimeOut!..Please SignIn ');
          setAuthToken('');
          setIsSignedIn(false);
        }
      });
  };


  // ===============================================
  const getId = () => {
    alert(localStorage.getItem('user_Id'));
    alert(currentAddress + " " + documentType + " " + selectedFile + ' ')
  }

  return (
    <div className='container-fluid' style={{ backgroundColor: 'white', padding: '0px' }}>


      <UserNav></UserNav>


      <div className='container mt-5 p-3 ' style={{ border: '1px solid #f0f0f0', borderRadius: '10px', backgroundColor: 'white', boxShadow: '0px 1px 10px black' }}>
        <UploadKyc></UploadKyc>
        <ToastContainer />
        <Row >
          <Col sm={12} md={10}>
            <Row className="mt-3">
              <Col sm={6}>
                <Form.Group controlId="forProofOf">
                  <Form.Label>Current Address :<font style={{ color: 'red' }}><b>&nbsp;&nbsp;*</b></font></Form.Label>
                  <Form.Control as="textarea" rows={1} value={currentAddress} onChange={handleAddressChange} />
                </Form.Group>
              </Col>
              <Col sm={6} className='mb-4'>
                <Form.Label>Type Of Proof :<font style={{ color: 'red' }}><b>&nbsp;&nbsp;*</b></font></Form.Label><br />
                <div className="btn-group btn-group-toggle" data-toggle="buttons">
                  <label className={`btn btn-outline-secondary ${documentType === "Aadhar Card" ? "active" : ""}`}>
                    <input type="radio" name="documentType" value="Aadhar Card" onChange={handleDocumentTypeChange} autoComplete="off" checked={documentType === "Aadhar Card"} style={{ display: 'none' }} /> Aadhar Card
                  </label>
                  <label className={`btn btn-outline-secondary ${documentType === "Pan Card" ? "active" : ""}`}>
                    <input type="radio" name="documentType" value="Pan Card" onChange={handleDocumentTypeChange} autoComplete="off" checked={documentType === "Pan Card"} style={{ display: 'none' }} /> Pan Card
                  </label>
                  <label className={`btn btn-outline-secondary ${documentType === "Voter ID" ? "active" : ""}`}>
                    <input type="radio" name="documentType" value="Voter ID" onChange={handleDocumentTypeChange} autoComplete="off" checked={documentType === "Voter ID"} style={{ display: 'none' }} /> Voter ID
                  </label>
                </div>



              </Col>
              <hr></hr>
            </Row>
            <Row className="mt-3 m-2 " style={{ border: '1px solid #f0f0f0', borderRadius: '0px', backgroundColor: 'white', boxShadow: '0px 0px 0px black' }}>
              <Col sm={selectedFile ? 6 : 12} >
                <h2>File Upload</h2>
                <Form>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Select File:<font style={{ color: 'red' }}><b>&nbsp;&nbsp;*</b></font></Form.Label><br></br>
                    <Form.Label >Allowed Size: <spam className='bg-warning' style={{ borderRadius: '5px' }}>&nbsp;<b>1MB</b>&nbsp;</spam></Form.Label>
                    <Form.Control type="file" size="sm" onChange={handleFileChange} />
                  </Form.Group>

                </Form>
              </Col>
              {selectedFile && (
                <Col sm={6}>
                  <h2>File Preview</h2>
                  <p>Filename: {selectedFile.name}</p>
                  <p>Size: {(selectedFile.size / 1024).toFixed(2)} KB</p>
                  <Row>
                    <Col sm={6}>
                      <ProgressBar now={uploadProgress} label={`${uploadProgress}%`} />
                    </Col>
                    <Col sm={6}>
                      <Button variant="primary" size="sm" style={{ marginBottom: '5px', marginTop: '2px' }} onClick={handleUploadProgress}>
                        Confirm Upload
                      </Button>
                    </Col>
                  </Row>

                </Col>
              )}
            </Row>
          </Col>
          <Col className=' d-none d-md-block' sm={12} md={2}>
            <Row className="mt-5">
              <Col sm={12}>
                <div style={{ flex: '1', paddingRight: '10px' }}>
                  {/* Place your image component here */}
                  <img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*sNM_Q6uUblHJr5IQ9MaySA.gif" alt="Your Image" style={{ width: '100%', height: '100%' }} />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Button
              variant={!currentAddress || !documentType || uploadProgress !== 100 ? "secondary" : "primary"}
              onClick={() => {
                if (!(!currentAddress || !documentType || uploadProgress !== 100)) {
                  //alert("Please provide all the required data before uploading KYC documents.");
                  handleKYCUpload();
                } else {
                }
              }}

              size="sm"
              title={!currentAddress || !documentType || uploadProgress !== 100 ? "Please provide all required data before uploading KYC documents." : ""}
            >
              KYC Doc Upload
            </Button>
          </Col>
        </Row>

      </div>
      <DefiningU></DefiningU>
    </div>
  );
}

export default KycDoc;
