package com.example.demo.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
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
@Entity
public class KycDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer kycId;
	private String currentAddress;
	private String documentsType;
	@Lob
	@Column(name = "path", columnDefinition = "bytea")
	private byte[] path;
	private Integer userId;
	private String extension;

	
	
}
