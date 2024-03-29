package com.example.demo.entity;


import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class DTO {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer kyc_id;
	private Integer user_id;
	private String user_name;
	private String email;
	private String extension;
	private String current_address;
	private String documents_type;
	
	private String path;
	
}
