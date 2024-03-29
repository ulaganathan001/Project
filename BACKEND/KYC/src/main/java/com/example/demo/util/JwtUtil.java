package com.example.demo.util;

import java.security.Key;
import java.util.Date;
import java.util.concurrent.TimeUnit;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;






@Component
public class JwtUtil {

	

	private final Key secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS512);
	
	//6. validate email in token and database ,expDate
	 public boolean validateToken(String token,String email) {
		 String tokenEmail=getEmail(token);
		 
		 return (email.equals(tokenEmail) && !isTokenExp(token));
	 }
	
	//5. validate Exp Date
	 public boolean isTokenExp(String token) {
		 Date expDate=getExpDate(token);
		 return expDate.before(new Date(System.currentTimeMillis()));
	 }
	//4. Read subject/userName
	 public String getEmail(String token) {
		 return getClaims(token).getSubject();
	 }
	
	//3.Read Exp Date
	 public Date getExpDate(String token) {
		 
		 return getClaims(token).getExpiration();
	 }
	//2. Read claims
	 public Claims getClaims(String token) throws JwtException {
	        // Use the JwtParser builder to set the signing key
	        Jws<Claims> jws = Jwts.parserBuilder()
	                .setSigningKey(secretKey)
	                .build()
	                .parseClaimsJws(token);

	        // Get the claims from the parsed JWT
	        return jws.getBody();
	    }
	
	//1.Generate Token
	
	 public String generateToken(String subject) {
	        return Jwts.builder()
	                .setSubject(subject)
	                .setIssuer("changepond")
	                .setIssuedAt(new Date(System.currentTimeMillis()))
	                .setExpiration(new Date(System.currentTimeMillis() + TimeUnit.MINUTES.toMillis(10)))
	                // Use the signWith method that accepts a Key
	                .signWith(secretKey)
	                .compact();
	    }
}
