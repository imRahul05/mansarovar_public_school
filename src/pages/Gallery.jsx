import React, { useState, useEffect } from 'react';
import axios from 'axios';

import GalleryHeader from '../components/gallery/GalleryHeader';
import CategoryFilter from '../components/gallery/CategoryFilter';
import GalleryGrid from '../components/gallery/GalleryGrid';
import ImageModal from '../components/gallery/ImageModal';
import SubmitPhotosSection from '../components/gallery/SubmitPhotosSection';

// Import gallery data
import galleryImages, { galleryCategories } from '../data/galleryData';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  useEffect(() => {
    const fetchGalleryImages = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/gallery');
        setImages(response.data.images);
        if(response.data.images===undefined){
          setImages(galleryImages)
        }
       
        // console.log("fef")
      } catch (error) {
        console.error('Error fetching gallery images:', error);
        // Use the sample data from our data file
        // setImages(galleryImages);
        // console.log(images)
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryImages();
  }, []);

  // Safely filter images
  const filteredImages = images && images.length > 0 
    ? (filter === 'all' 
        ? images 
        : images.filter(image => image.category === filter))
    : [];

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };
  
  const handleFilterChange = (categoryId) => {
    setFilter(categoryId);
  };
  
  const handleSubmitPhotosClick = () => {
    // Handle photo submission logic
    console.log("Submit photos clicked");
    // This could navigate to a form page or open a modal
  };

  const galleryTitle = filter === 'all' 
    ? 'All Photos' 
    : galleryCategories.find(c => c.id === filter)?.name;

  return (
    <div className="min-h-screen">
      {/* Header Component */}
      <GalleryHeader 
        title="School Gallery" 
        description="Explore moments from our school events, activities, and life on campus through our photo gallery." 
      />
      
      {/* Category Filter Component */}
      <CategoryFilter 
        categories={galleryCategories}
        activeFilter={filter}
        onFilterChange={handleFilterChange}
      />
      
      {/* Gallery Grid Component */}
      <GalleryGrid 
        images={filteredImages}
        loading={loading}
        title={galleryTitle}
        onImageClick={handleImageClick}
      />
      
      {/* Submit Photos Section Component */}
      <SubmitPhotosSection 
        title="Have Photos to Share?"
        description="Are you a parent or student with school event photos? Share them with us to be featured in our gallery!"
        buttonText="Submit Your Photos"
        onButtonClick={handleSubmitPhotosClick}
      />
      
      {/* Image Modal Component */}
      <ImageModal 
        image={selectedImage}
        onClose={closeModal}
      />
    </div>
  );
};

export default Gallery;