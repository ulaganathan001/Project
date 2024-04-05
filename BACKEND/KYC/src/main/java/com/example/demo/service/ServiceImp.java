package com.example.demo.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.api.model.GetAllInnerModel;
import com.example.api.model.GetAllUploadsInnerModel;
import com.example.api.model.GetUserModel;
import com.example.api.model.UserDataModel;
import com.example.demo.entity.DTO;
import com.example.demo.entity.UserDetails;
import com.example.demo.mapper.Intermediate;
import com.example.demo.repository.KycRepo;
import com.example.demo.repository.UserRepo;

import jakarta.annotation.Resource;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import java.util.logging.Logger;

@Service
@RequiredArgsConstructor
public class ServiceImp {

	@Resource
	private KycRepo krepo;
	@Resource
	private UserRepo repo;
	
	@Resource
	private Intermediate in;
	
	Logger logger = Logger.getLogger(getClass().getName());

	@Transactional
	public String addData(UserDataModel userDataModel) {
		try {
			
		String username=userDataModel.getUserName();
		String email=userDataModel.getEmail();
		String password=userDataModel.getPassword();
		
		 int emailExists = repo.checkEmailExists(email);
	        if (emailExists == 1) {
	            return "Email already exists. Failed to add user.";
	        }
		
		int result=repo.addData(username,email,password);
		
		 if (result == 1) {
             return "User added successfully!";
         } else {
             return "Failed to add user.";
         }
     } catch (Exception e) {
        
         return "An error occurred while adding the user.";
     }
	}

	public GetUserModel getData(String email) {
		UserDetails userdata=repo.getUserData(email);
		if (userdata == null) {
		    return new GetUserModel();
		   
		} 
		return in.constructUserModel(userdata);		
	}

	
	public List<GetAllInnerModel> getAll() {		
		 List<UserDetails> result=repo.getAll();
		return in.constructDataModel(result);
	}



	@Transactional
	public String storeFile(Integer userId, String currentAddress, String documentType, MultipartFile file) {
	    try {
	        byte[] fileContent = file.getBytes();
	        String fileName = file.getOriginalFilename();
	        
	        krepo.kyc_details_update(userId, currentAddress, documentType, fileContent,fileName);
	        
	        return "added successfully";
	    } catch (IOException e) {
	        e.printStackTrace();
	        return "error storing file";
	    }
	}
	

	public List<GetAllUploadsInnerModel> getAllFile() {

	    List<Object[]> result = krepo.getAll();
	    List<DTO> kycDetailsList = new ArrayList<>();
	    
	    

	   
	    for (Object[] row : result) {
	        DTO dto = new DTO(((Integer) row[0]), ((Integer) row[1]), (String) row[2], (String) row[3], (String) row[4], (String) row[5], (String) row[6], (String) row[7]);
	        kycDetailsList.add(dto);
	    }
	    
	    if (result == null) {
	        return Collections.emptyList();
	    }
	    return in.constructUploadFiles(kycDetailsList);
	}


	
}
