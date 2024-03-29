import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UploadedFilesLogo from './Pages/Logos/UploadedFilesLogo';

const AllUploads = () => {
    const [uploads, setUploads] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDocumentType, setSelectedDocumentType] = useState('Search by Type Of Proof'); // Default value for document type filter

    useEffect(() => {
        fetchUploads();
    }, []);

    const fetchUploads = async () => {
        try {
            const response = await axios.get('http://localhost:8080/userInformation/getAllUploads');
            setUploads(response.data);
        } catch (error) {
            console.error('Error fetching uploads:', error);
        }
    };

    const openModal = (file) => {
        setSelectedFile(file);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const renderFile = (upload) => {
        if (!upload.file_path) {
            return <span>No file available</span>;
        }

        if (upload.extension.toLowerCase().match(/(pdf|png|jpg|jpeg)$/)) {
            return (
                <div>
                    <a href={`data:application/octet-stream;base64,${upload.file_path}`} download={`${upload.extension}`}>
                        <button className='btn btn-secondary'>Download</button>
                    </a>
                    <button className='btn btn-light m-1' onClick={() => openModal(upload)}>View</button>
                </div>
            );
        } else {
            return (
                <div>
                    <a href={`data:application/octet-stream;base64,${upload.file_path}`} download={`${upload.extension}`}>
                        <button className='btn btn-secondary'>Download</button>
                    </a>
                </div>
            );
        }
    };

    // Filter uploads based on the search term and selected document type
    const filteredUploads = uploads.filter(upload =>
        (upload.user_name.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm === '') &&
        (selectedDocumentType === 'Search by Type Of Proof' || upload.document_type === selectedDocumentType)
    );

    // List of document types
    const documentTypes = ['Search by Type Of Proof', 'Aadhar Card', 'Pan Card', 'Voter ID'];

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
        }

    return (
        <div className="file-upload-container">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2><UploadedFilesLogo/></h2>
                <h5 className='p-1 mt-3' style={{ border: '1px solid rgb(145, 144, 144, 0.2)', boxShadow: '5px 5px 10px -1px rgb(145, 144, 144, 0.8)' ,borderRadius:'8px'}}>&nbsp;&nbsp;Number of User Upload:&nbsp;
                    <font className='bg-warning' style={{borderRadius:'8px'}}><b>&nbsp;{uploads.length}&nbsp;</b></font>&nbsp;</h5>
            </div>
            <div className="search-box mb-3 d-flex flex-column flex-md-row">
    <input 
        type="text" 
        className="form-control mb-2 mb-md-0 flex-md-grow-1 mr-md-2 m-1" 
        placeholder="Search by User Name" 
        aria-describedby="basic-addon1" 
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ transition: 'box-shadow 0.3s', boxShadow: 'none' }}
        onMouseOver={(e) => e.target.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.7)'}
        onMouseOut={(e) => e.target.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.3)'}
    />
    <select 
        className="form-select flex-md-grow-1 mb-2 mb-md-0 mr-md-2 m-1" 
        onChange={(e) => setSelectedDocumentType(e.target.value)}
        style={{ transition: 'box-shadow 0.3s', boxShadow: 'none', }}
        onMouseOver={(e) => e.target.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.7)'}
        onMouseOut={(e) => e.target.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.3)'}
    >
        {documentTypes.map(type => (
            <option key={type} value={type}>{type}</option>
        ))}
    </select>
</div>


            <div className="container">
                <div className="row">
                    {filteredUploads.map((upload, index) => (
                        <div key={upload.kyc_id || index} className="col-md-4 mb-4" >
                            <div className="card " style={{backgroundColor:'rgb(145, 144, 144, 0.1)'}}>
                                <div className="card-body">
                                    <h3 className="card-text  p-1 m-2">{capitalizeFirstLetter(upload.user_name)}</h3><hr></hr>
                                    <p className="card-text"><strong>Email:</strong> {upload.email}</p>
                                    <p className="card-text"><strong>File Name:</strong> {upload.extension}</p>
                                    <p className="card-text"><strong>Address:</strong> {upload.current_address}</p>
                                    <p className="card-text"><strong>Document Type:</strong> {upload.document_type}</p>
                                    <div className="d-flex justify-content-center">
                                        {renderFile(upload)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {modalOpen && (
                <div className="modal" style={modalStyle}>
                    <span className="close" style={close} onClick={closeModal}>close</span>
                    {selectedFile.extension.toLowerCase().match(/(jpg|jpeg|png|gif)$/) ? (
                        <img src={`data:application/octet-stream;base64,${selectedFile.file_path}`} alt="Uploaded file" style={imageStyle} />
                    ) : selectedFile.extension.toLowerCase().match(/(pdf)$/) ? (
                        <embed src={`data:application/pdf;base64,${selectedFile.file_path}`} type="application/pdf" width="100%" height="500px" style={imageStyle} />
                        ) : selectedFile.extension.toLowerCase().match(/(docx|doc)$/) ? (
                            <div dangerouslySetInnerHTML={{ __html: selectedFile.htmlContent }} />
                        ) : (
                            <p>File type not supported for preview. Please download to view.</p>
                        )}
                </div>
            )}
        </div>
    );
};



const modalStyle = {
    display: 'block',
    position: 'fixed',
    zIndex: 1000,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)'
};

const imageStyle = {
    display: 'block',
    margin: '10% auto',
    maxWidth: '90%',
    maxHeight: '90%',
};

const close = {
    position: 'absolute',
    top: '70px',
    right: '20px',
    fontSize: '20px',
    color: '#fff',
    cursor: 'pointer'
};

export default AllUploads;