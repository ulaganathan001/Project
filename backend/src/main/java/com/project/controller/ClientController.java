package com.project.controller;

import com.project.DTO.ImageDTO;
import com.project.model.Image;

import com.project.service.ImageServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.sql.rowset.serial.SerialException;
import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Collections;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ClientController {
    @Autowired
    private ImageServiceImpl imageService;

    @GetMapping("/ping")
    @ResponseBody
    public String hello_world(){
        return "Hello World!";
    }

    
    
    @GetMapping("/displayAll")
    public ResponseEntity<List<String>> displayAllImages() {
        List<Image> images = imageService.getAllImages();
        List<String> base64Images = new ArrayList<>();

        try {
            base64Images = imageService.convertImagesToBase64(images);
            return ResponseEntity.ok().body(base64Images);
        } catch (IOException | SQLException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body(Collections.singletonList("Error converting images to Base64"));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<byte[]> displayImage(@PathVariable long id) throws IOException {
        try {
         
            Image image = imageService.viewById(id);
            byte[] imageBytes = image.getImage().getBytes(1, (int) image.getImage().length());
            return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imageBytes);
        } catch (SQLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    
    @PostMapping("/add")
    public ResponseEntity<String> addImage(@RequestParam("image") MultipartFile file,@RequestParam("name") String name,
            @RequestParam("comments") String comments,@RequestParam("mobile") String mobile,@RequestParam("course") String course) throws SerialException {
        try {
            byte[] bytes = file.getBytes();
            Blob blob = new javax.sql.rowset.serial.SerialBlob(bytes);

            Image image = new Image();
            image.setImage(blob);
            image.setName(name);
            image.setComments(comments);
            image.setMobile(mobile);
            image.setCourse(course);
            imageService.create(image);

            return ResponseEntity.ok("Image and data added successfully");
        } catch (IOException | SQLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding image and data");
        }
    }

    

    
    @GetMapping("/displayAllData")
    public ResponseEntity<List<ImageDTO>> displayAllImagesData() {
        List<ImageDTO> imageDTOs;
        try {
            imageDTOs = imageService.getAllImagesData();
            return ResponseEntity.ok().body(imageDTOs);
        } catch (IOException | SQLException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @DeleteMapping("/delete/{id}")
	public String delete(@PathVariable Long id) {
		return imageService.deleteAlumni(id);
	}
    
    @GetMapping("/top3Images")
    public ResponseEntity<List<ImageDTO>> getTop3ImagesData() {
        try {
            List<ImageDTO> top3ImagesData = imageService.getTop3ImagesData();
            return ResponseEntity.ok().body(top3ImagesData);
        } catch (IOException | SQLException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
}
