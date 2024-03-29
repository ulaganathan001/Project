package com.example.demo.entity;

import java.util.Arrays;

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
	    private Integer kyc_id;
	private String current_address;
	private String documents_type;
	@Lob
	@Column(name = "path", columnDefinition = "bytea")
	private byte[] path;
	private Integer user_id;
	private String Extension;

	@Override
	public String toString() {
		return "KycDetails [kyc_id=" + kyc_id + ", current_address=" + current_address + ", documents_type="
				+ documents_type + ", path=" + Arrays.toString(path) + ", user_id=" + user_id + ", Extension="
				+ Extension + "]";
	}
	
}
