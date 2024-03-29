package com.example.demo.controller;

import java.io.IOException;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.api.UserInformationApi;
import com.example.api.model.GetAllInnerModel;
import com.example.api.model.GetAllUploadsInnerModel;
import com.example.api.model.GetUserModel;
import com.example.api.model.UserDataModel;
import com.example.demo.service.ServiceImp;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class UserData implements UserInformationApi {

	@Autowired
	private ServiceImp ser;
	
	@Override
	public ResponseEntity<String> registerUser(UserDataModel userDataModel) {
		String result=ser.addData(userDataModel);
        ResponseEntity<String> responseEntity = new ResponseEntity<>(result, HttpStatus.CREATED);
        return responseEntity;
	}

	@Override
	public ResponseEntity<GetUserModel> signIn(String email, String password) {
		GetUserModel getUserModel=ser.getData(email);
		if(!email.equals(getUserModel.getEmail())) {
			
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		if( !password.equals(getUserModel.getPassword())) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
	
        return new ResponseEntity<>(getUserModel,HttpStatus.OK);
	}

	


	@Override
	public ResponseEntity<List<GetAllInnerModel>> getAll() {
		
        List<GetAllInnerModel> result=ser.getAll();
        ResponseEntity<List<GetAllInnerModel>> responseEntity=new ResponseEntity<>(result, HttpStatus.OK);
        		return responseEntity;
    }
    
	
	
	@Override
	public ResponseEntity<String> uploadFile(Integer userId, String currentAddress, String documentType,
			MultipartFile file ) {

    	String result = null;
    	if (file==null) {
    		
    	      return new ResponseEntity<>("file is empty",HttpStatus.BAD_GATEWAY);
    	    }

    	 try {
			result=ser.storeFile(userId, currentAddress, documentType, file);
		} catch (IOException e) {
			
			e.printStackTrace();
		}
    	 ResponseEntity<String> responseEntity = new ResponseEntity<>(result,HttpStatus.CREATED);
          return responseEntity;
		

	}
	
	@Override
	public ResponseEntity<List<GetAllUploadsInnerModel>> getAllUploads() {
		
        List<GetAllUploadsInnerModel> result=ser.getAllFile();
        ResponseEntity<List<GetAllUploadsInnerModel>> responseEntity=new ResponseEntity<>(result, HttpStatus.OK);
        		return responseEntity;
	}

	
	
	
	


}
