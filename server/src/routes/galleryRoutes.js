import express from 'express';
import { protect, authorizeRoles } from '../middlewares/authMiddleware.js';

const router = express.Router();

// @route   GET /api/gallery
// @desc    Get all gallery images
// @access  Public
router.get('/', async (req, res) => {
  try {
    // This is a placeholder for the actual controller function
    res.status(200).json({
      success: true,
      message: 'Gallery images retrieved successfully',
      images: [
        {
          _id: '1',
          title: 'Annual Function 2024',
          description: 'Students performing cultural dance during annual function',
          imageUrl: '/src/assets/images/gallery/annual-function-2024.jpg',
          category: 'events',
          uploadedOn: '2024-12-15'
        },
        {
          _id: '2',
          title: 'Science Exhibition',
          description: 'Students showcasing their science projects',
          imageUrl: '/src/assets/images/gallery/science-exhibition.jpg',
          category: 'academics',
          uploadedOn: '2024-11-05'
        },
        {
          _id: '3',
          title: 'Sports Day',
          description: 'Athletic events during annual sports day',
          imageUrl: '/src/assets/images/gallery/sports-day.jpg',
          category: 'sports',
          uploadedOn: '2024-10-20'
        },
        {
          _id: '4',
          title: 'Independence Day',
          description: 'Flag hoisting ceremony on Independence Day',
          imageUrl: '/src/assets/images/gallery/independence-day.jpg',
          category: 'events',
          uploadedOn: '2024-08-15'
        },
        {
          _id: '5',
          title: 'Classroom Activities',
          description: 'Students engaged in interactive classroom activities',
          imageUrl: '/src/assets/images/gallery/classroom.jpg',
          category: 'academics',
          uploadedOn: '2024-09-10'
        }
      ]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/gallery/:id
// @desc    Get gallery image by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    res.status(200).json({
      success: true,
      message: `Gallery image with id ${id} retrieved successfully`,
      image: {
        _id: id,
        title: 'Annual Function 2024',
        description: 'Students performing cultural dance during annual function. The event showcased various talents of our students including dance, music, drama and more.',
        imageUrl: '/src/assets/images/gallery/annual-function-2024.jpg',
        category: 'events',
        uploadedOn: '2024-12-15',
        uploadedBy: {
          _id: '1',
          name: 'Admin'
        },
        tags: ['cultural', 'annual day', 'performance']
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   POST /api/gallery
// @desc    Upload new image to gallery
// @access  Private/Admin
router.post('/', protect, authorizeRoles('admin', 'teacher'), async (req, res) => {
  try {
    res.status(201).json({
      success: true,
      message: 'Image uploaded successfully',
      image: {
        ...req.body,
        _id: Date.now().toString(),
        uploadedOn: new Date().toISOString().split('T')[0],
        uploadedBy: req.user._id
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   PUT /api/gallery/:id
// @desc    Update gallery image
// @access  Private/Admin
router.put('/:id', protect, authorizeRoles('admin', 'teacher'), async (req, res) => {
  try {
    const { id } = req.params;
    
    res.status(200).json({
      success: true,
      message: `Gallery image with id ${id} updated successfully`,
      image: {
        ...req.body,
        _id: id,
        updatedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   DELETE /api/gallery/:id
// @desc    Delete gallery image
// @access  Private/Admin
router.delete('/:id', protect, authorizeRoles('admin', 'teacher'), async (req, res) => {
  try {
    const { id } = req.params;
    
    res.status(200).json({
      success: true,
      message: `Gallery image with id ${id} deleted successfully`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/gallery/category/:category
// @desc    Get gallery images by category
// @access  Public
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    
    res.status(200).json({
      success: true,
      message: `Gallery images for category ${category} retrieved successfully`,
      images: [
        {
          _id: '1',
          title: `Sample ${category} Image 1`,
          description: `Image from ${category} category`,
          imageUrl: `/src/assets/images/gallery/${category}-1.jpg`,
          category: category,
          uploadedOn: '2024-12-15'
        },
        {
          _id: '2',
          title: `Sample ${category} Image 2`,
          description: `Another image from ${category} category`,
          imageUrl: `/src/assets/images/gallery/${category}-2.jpg`,
          category: category,
          uploadedOn: '2024-11-05'
        }
      ]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

export default router;