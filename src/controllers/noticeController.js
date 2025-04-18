import Notice from '../models/Notice.js';

// @desc    Get all notices
// @route   GET /api/notices
// @access  Public
export const getAllNotices = async (req, res) => {
  try {
    const { 
      category, 
      important, 
      forClass, 
      limit = 10, 
      page = 1 
    } = req.query;
    
    // Build query
    const query = { isActive: true };
    
    if (category) query.category = category;
    if (important === 'true') query.important = true;
    if (forClass) query.forClass = { $in: [forClass, 'all'] };
    
    // Check if notice has expired
    query.$or = [
      { expiresOn: { $gt: new Date() } },
      { expiresOn: { $exists: false } }
    ];
    
    // Execute query with pagination
    const total = await Notice.countDocuments(query);
    const notices = await Notice.find(query)
      .sort({ important: -1, date: -1 })
      .limit(Number(limit))
      .skip(Number(limit) * (Number(page) - 1))
      .populate('publishedBy', 'name');
      
    res.json({
      success: true,
      count: notices.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
      notices
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get notice by ID
// @route   GET /api/notices/:id
// @access  Public
export const getNoticeById = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id)
      .populate('publishedBy', 'name');
      
    if (!notice) {
      return res.status(404).json({
        success: false,
        message: 'Notice not found'
      });
    }
    
    res.json({
      success: true,
      notice
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Create new notice
// @route   POST /api/notices
// @access  Private (Admin/Teacher)
export const createNotice = async (req, res) => {
  try {
    const { 
      title, 
      description, 
      category, 
      important, 
      attachmentUrl, 
      forClass, 
      expiresOn 
    } = req.body;
    
    const notice = await Notice.create({
      title,
      description,
      category,
      important,
      attachmentUrl,
      forClass: forClass || ['all'],
      publishedBy: req.user._id,
      expiresOn
    });
    
    res.status(201).json({
      success: true,
      notice
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update notice
// @route   PUT /api/notices/:id
// @access  Private (Admin/Teacher)
export const updateNotice = async (req, res) => {
  try {
    const { 
      title, 
      description, 
      category, 
      important, 
      attachmentUrl, 
      forClass, 
      expiresOn,
      isActive
    } = req.body;
    
    let notice = await Notice.findById(req.params.id);
    
    if (!notice) {
      return res.status(404).json({
        success: false,
        message: 'Notice not found'
      });
    }
    
    // Check if user is authorized to update notice
    if (notice.publishedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this notice'
      });
    }
    
    notice.title = title || notice.title;
    notice.description = description || notice.description;
    notice.category = category || notice.category;
    notice.important = important !== undefined ? important : notice.important;
    notice.attachmentUrl = attachmentUrl || notice.attachmentUrl;
    notice.forClass = forClass || notice.forClass;
    notice.expiresOn = expiresOn || notice.expiresOn;
    notice.isActive = isActive !== undefined ? isActive : notice.isActive;
    
    await notice.save();
    
    res.json({
      success: true,
      notice
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Delete notice
// @route   DELETE /api/notices/:id
// @access  Private (Admin/Teacher)
export const deleteNotice = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    
    if (!notice) {
      return res.status(404).json({
        success: false,
        message: 'Notice not found'
      });
    }
    
    // Check if user is authorized to delete notice
    if (notice.publishedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this notice'
      });
    }
    
    // Instead of actually deleting, just mark as inactive
    notice.isActive = false;
    await notice.save();
    
    res.json({
      success: true,
      message: 'Notice removed'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};