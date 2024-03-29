package com.example.demo.Repository;

import org.springframework.stereotype.Repository;

import com.example.demo.entity.KycDetails;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface KycRepo extends JpaRepository<KycDetails,Long > {



    
    
	@Query(value = "SELECT " +
            "kyc_details.kyc_id, " +
            "kyc_details.user_id, " +
            "user_details.user_name, " +
            "user_details.email, " +
            "kyc_details.Extension," +
            "kyc_details.current_address, " +
            "kyc_details.documents_type, " +
             
            "encode(kyc_details.path, 'base64') AS encoded_document " +
        "FROM " +
            "kyc_details " +
        "INNER JOIN " +
            "user_details ON kyc_details.user_id = user_details.user_id", nativeQuery = true)
	List<Object[]> getAll();

	
	@Modifying
	@Query(value =
    "WITH ins AS (" +
    "   INSERT INTO kyc_details(user_id, current_address, documents_type, path,extension) " +
    "   SELECT :userId, :currentAddress, :documentType, :fileContent , :fileName "+ 
    "   FROM user_details ud " +
    "   WHERE ud.user_id = :userId " +
    "   AND NOT EXISTS (" +
    "       SELECT 1 FROM kyc_details kd " +
    "       WHERE kd.user_id = :userId " +
    "   )" +
    "   RETURNING user_id" +
    ")" +
    "UPDATE kyc_details " +
    "SET current_address = :currentAddress, " +
    "    documents_type = :documentType, " +
    "    path = :fileContent ," +
    "    extension = :fileName "+
    "WHERE user_id = :userId",
    nativeQuery = true)
	int kyc_details_update(@Param("userId") Integer userId,
            @Param("currentAddress") String currentAddress,
            @Param("documentType") String documentType,
            @Param("fileContent") byte[] fileContent,
            @Param("fileName")String fileName);

	
	

	

	
}