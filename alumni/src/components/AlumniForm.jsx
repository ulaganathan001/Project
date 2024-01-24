import React, { useState, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

const AlumniForm = () => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [comments, setComments] = useState('');
  const [mobile, setMobile] = useState('');
  const [course, setCourse] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setSelectedFileName(selectedFile ? selectedFile.name : '');
  };

  const handleImageButtonClick = () => {
    // Trigger the file input click event when the button is clicked
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('name', name);
      formData.append('comments', comments);
      formData.append('course',course);
      formData.append('mobile',mobile);

      await axios.post('http://localhost:8081/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setFile(null);
      setName('');
      setComments('');
      setCourse('');
      setMobile('');
      setSelectedFileName('');
      alert('Data added successfully!');
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error('Error adding image and data', error);
    }
  };

  return (
    <div className="container mt-4" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' ,width:'30%'}}>
      <div className="card" style={{ backgroundColor: 'skyblue', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2 style={{textAlign:'center',color:'green',fontSize:'30px'}}>Join Our Alumni Commnunity</h2>
        <div className="card-body"style={{textAlign:'center'}}>
          <form onSubmit={handleSubmit}>
          <div className="form-group" >
             
              <div className="custom-file" style={{ display: 'none' }}>
                <input
                  type="file"
                  className="custom-file-input"
                  onChange={handleFileChange}
                  ref={fileInputRef} required
                />
                {/* Hidden file input to trigger the file selection dialog */}
              </div>
              <button
                type="button"
                className="btn btn-primary btn-block rounded-circle p-3" // Rounded shape and increased padding
                onClick={handleImageButtonClick}
                style={{ fontSize: '24px' }} // Increased font size
              >
               Image <FontAwesomeIcon icon={faImage} />
              </button>
              <div className="mt-2">
                {selectedFileName && <small>Selected file: {selectedFileName}</small>}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="name" style={{ fontWeight: 'bold', color: '#333',marginTop:'5%' }}>
                Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{marginTop:'2%'}}
              />
            </div>

            <div className="form-group">
              <label htmlFor="name" style={{ fontWeight: 'bold', color: '#333',marginTop:'5%' }}>
                Course:
              </label>
              <input
                type="text"
                className="form-control"
                id="course"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                required
                style={{marginTop:'2%'}}
              />
            </div>
            <div className="form-group">
              <label htmlFor="name" style={{ fontWeight: 'bold', color: '#333',marginTop:'5%' }}>
                Mobile No:
              </label>
              <input
                type="number"
                className="form-control"
                id="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
                style={{marginTop:'2%'}}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="comments" style={{ fontWeight: 'bold', color: '#333',marginTop:'5%' }}>
               Your Experience 
              </label>
              <textarea
                className="form-control"
                id="comments"
                rows="3"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                style={{marginTop:'2%'}}
              ></textarea>
            </div>
            <div>
            <button type="submit" className="btn btn-primary btn-block" style={{marginTop:'5%'}}>
              Submit
            </button>
            </div>
           
          </form>
        </div>
      </div>
    </div>
  );
};

export default AlumniForm;
