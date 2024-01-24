package com.project.DTO;

import java.util.Date;

public class ImageDTO {
    private long id;
    private Date date;
    private String base64Image;
    private String name;
    private String mobile;
    private String course;
    public String getName() {
		return name;
	}
    public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getCourse() {
		return course;
	}

	public void setCourse(String course) {
		this.course = course;
	}
	public void setName(String name) {
		this.name = name;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	private String comments;
  

	public ImageDTO(long id,Date date2, String base64Image2) {
		   this.id = id;
	        this.date = date;
	        this.base64Image = base64Image;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getBase64Image() {
		return base64Image;
	}

	public void setBase64Image(String base64Image) {
		this.base64Image = base64Image;
	}

	
	

   
}

