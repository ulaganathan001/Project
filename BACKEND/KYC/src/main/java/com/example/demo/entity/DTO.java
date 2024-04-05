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
	private Integer kycId;
	private Integer userId;
	private String userName;
	private String email;
	private String extension;
	private String currentAddress;
	private String documentsType;
	
	private String path;
	
}
