package com.project.service;

import com.project.DTO.ImageDTO;
import com.project.model.Image;
import com.project.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Service
public class ImageServiceImpl  {
    @Autowired
    private ImageRepository imageRepository;


    
    public Image create(Image image) {
        return imageRepository.save(image);
    }

  
    public List<Image> viewAll() {
        return (List<Image>) imageRepository.findAll();
    }

   
    public Image viewById(long id) {
        return imageRepository.findById(id).get();
    }
   
    public List<Image> getAllImages() {
        return (List<Image>) imageRepository.findAll();
    }
    
    public List<String> convertImagesToBase64(List<Image> images) throws IOException, SQLException {
        List<String> base64Images = new ArrayList<>();

        for (Image image : images) {
            Blob imageBlob = image.getImage();
            byte[] imageBytes = imageBlob.getBytes(1, (int) imageBlob.length());
            String base64Image = Base64.getEncoder().encodeToString(imageBytes);
            base64Images.add(base64Image);
        }

        return base64Images;
    }
  

    
    public List<ImageDTO> getAllImagesData() throws IOException, SQLException {
        List<Image> images = getAllImages();
        List<ImageDTO> imageDTOs = new ArrayList<>();

        for (Image image : images) {
            ImageDTO imageDTO = new ImageDTO(0, null, null);
            imageDTO.setId(image.getId());
            imageDTO.setDate(image.getDate());
            imageDTO.setName(image.getName());
            imageDTO.setComments(image.getComments());
            imageDTO.setMobile(image.getMobile());
            imageDTO.setCourse(image.getCourse());
            // Assuming there is a getDate() method in your Image class
            imageDTO.setBase64Image(convertImageToBase64(image.getImage()));
            imageDTOs.add(imageDTO);
        }

        return imageDTOs;
    }

    private String convertImageToBase64(Blob imageBlob) throws IOException, SQLException {
        byte[] imageBytes = imageBlob.getBytes(1, (int) imageBlob.length());
        return Base64.getEncoder().encodeToString(imageBytes);
    }
    
    public String deleteAlumni(Long id) {
    	imageRepository.deleteById(id);
		return "deleted";
    }
    
    public List<ImageDTO> getTop3ImagesData() throws IOException, SQLException {
        List<Image> images = getAllImages();
        List<ImageDTO> imageDTOs = new ArrayList<>();

        int count = 0; 

        for (Image image : images) {
            ImageDTO imageDTO = new ImageDTO(0, null, null);
            imageDTO.setId(image.getId());
            imageDTO.setDate(image.getDate());
            imageDTO.setName(image.getName());
            imageDTO.setComments(image.getComments());
            imageDTO.setCourse(image.getCourse());
            imageDTO.setMobile(image.getMobile());
            imageDTO.setBase64Image(convertImageToBase64(image.getImage()));
            imageDTOs.add(imageDTO);

            count++;
            if (count >= 3) {
                break;
            }
        }

        return imageDTOs;
    }
}
