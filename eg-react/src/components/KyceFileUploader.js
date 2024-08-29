import React from "react";
import { useState } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';

const allowedFormats = ['pdf', 'doc', 'docx', 'png', 'jpg', 'jpeg'];
const allowedSize = 1048576 ; // 1MB

const KyceFileUploader = ({userId,authToken,setAuthToken,setIsSignedIn}) => {

    const [file, setFile] = useState(null);
    const [forProofOf, setForProofOf] = useState();
    const [documentType, setDocumentType] = useState();

    const handleForProofOf = (event) => {
        setForProofOf(event.target.value);
    }
    const handleDocumentType = (event) => {
        setDocumentType(event.target.value);
    }


    const handleFileSelect = (e) => {
       setFile(e.target.files[0]);
       
    }


    const handleUploadFile = (e) => {
        e.preventDefault();
        if(!forProofOf){

            toast.warning('Please select type of prof!', {
                position: toast.POSITION.TOP_CENTER
            });
            return;
        }

        if(!documentType){

            toast.warning('Please select Document type!', {
                position: toast.POSITION.TOP_CENTER
            });
            return;
        }
        if (!file) {
            toast.warning('Please select a kyc doucment !', {
                position: toast.POSITION.TOP_CENTER
            });
            return;
        }

        if (file.size > allowedSize) {
            toast.warning('Kyc document is too large!', {
                position: toast.POSITION.TOP_CENTER
            });
            return;
        }

        const fileExtension = file.name.split('.').pop().toLowerCase();
        if (!allowedFormats.includes(fileExtension)) {
            toast.warning('Invalid file format! Only PDF, DOC, DOCX, PNG, JPG, and JPEG files are allowed.', {
                position: toast.POSITION.TOP_CENTER
            });
            return;
        }
    
        const fileData = new FormData();
        fileData.append('user_id', userId);
        fileData.append('for_proof_of', forProofOf);
        fileData.append('document_type', documentType);
        fileData.append('token',authToken);
        fileData.append('file', file);
       
        
        if (file.size === null) {
            toast.warning('Kyc document is empty !', {
                position: toast.POSITION.TOP_CENTER
            });
            return;
        }
        
        
        axios
            .post("http://localhost:8089/api/v1/userServiceWeb/uploadKYC", fileData)
            .then((response) => {
                console.log(response);
                console.log('success');
                setFile('');
                toast.success('succeessfully Uploaded', {
                    position: toast.POSITION.TOP_RIGHT
                });
            })
            .catch((error) => {
                console.log(error);
                toast.error(' Internal server error', {
                    position: toast.POSITION.TOP_CENTER
                });

                if (error.response.status === 500) {
                    toast.error('Internal Server Error', {
                      position: toast.POSITION.TOP_RIGHT
                    });
                  }
                  if (error.code === "ERR_BAD_REQUEST") {
                    toast.error('TimeOut!..Please SignIn ', {
                      position: toast.POSITION.TOP_RIGHT
                    });
                    setAuthToken('');
                    setIsSignedIn(false);
                  }
            });
    }
    return (
        <div className="kycForm">
            <form>
                <label><h1 className="kycFormHeading">Upload your file</h1></label> <br /> <br />
                <label>
                    <select className="proofStyle" value={forProofOf} onChange={handleForProofOf}>
                        <option>select</option>
                        <option value="ID proof">ID proof</option>
                        <option value="Address proof"> Address proof</option>
                    </select> &nbsp;
                    *For Proof of
                </label> <br /><br />

                <label>
                    <select className="docStyle" value={documentType} onChange={handleDocumentType}>
                        <option>select</option>
                        <option value="Aadhar Card">Aadhar Card</option>
                        <option value="Pan card">Pan Card</option>
                        <option value="Voter ID"> Voter ID</option>
                    </select> &nbsp; &nbsp;
                    *Document Type
                </label> <br /> <br />
                <input type="file"  name="file" onChange={handleFileSelect} className="chooseFile" /><br/> 
                

                <button onClick={handleUploadFile} className="uploadButton">Upload</button>
            </form>
        </div>
    )

}
export default KyceFileUploader;