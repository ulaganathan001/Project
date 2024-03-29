package com.example.demo.mapper;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.example.api.model.GetAllInnerModel;
import com.example.api.model.GetAllUploadsInnerModel;
import com.example.api.model.GetUserModel;
import com.example.demo.entity.DTO;
import com.example.demo.entity.UserDetails;


@Component
public class Intermediate {

	public GetUserModel constructUserModel(UserDetails userdata) {
		GetUserModel result = new GetUserModel();
		result.setUserId(userdata.getUser_Id());
		result.setUserName(userdata.getUser_Name());
		result.setEmail(userdata.getEmail());
		result.setPassword(userdata.getPassword());
		
		return result;
	}

	public List<GetAllInnerModel> constructDataModel(List<UserDetails> result) {
		List<GetAllInnerModel> al = new ArrayList<>();
		for(UserDetails u:result) {
			GetAllInnerModel model=new GetAllInnerModel();
			model.setUserId(u.getUser_Id());
			model.setUserName(u.getUser_Name());
			model.setEmail(u.getEmail());
			model.setPassword(u.getPassword());
			al.add(model);
		}
		return al;
	}

	public List<GetAllUploadsInnerModel> constructUploadFiles(List<DTO> result) {
		List<GetAllUploadsInnerModel> uploads = new ArrayList<>();
        for (DTO kycDetails : result) {
            GetAllUploadsInnerModel model = new GetAllUploadsInnerModel();
            model.setKycId(kycDetails.getKyc_id());
            model.setUserId(kycDetails.getUser_id());
            model.setUserName(kycDetails.getUser_name());
            model.setEmail(kycDetails.getEmail());
            model.setExtension(kycDetails.getExtension());
          
            model.setCurrentAddress(kycDetails.getCurrent_address());
            model.setDocumentType(kycDetails.getDocuments_type());
            model.setFilePath(kycDetails.getPath());
                 
            uploads.add(model);
        }
        return uploads;
    
	}

}
