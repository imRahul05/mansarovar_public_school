import Event from '../models/Event.js';

// @desc    Get all events
// @route   GET /api/events
// @access  Public
export const getAllEvents = async (req, res) => {
  try {
    const { 
      category, 
      upcoming = 'false', 
      forClass, 
      limit = 10, 
      page = 1 
    } = req.query;
    
    // Build query
    const query = { isActive: true };
    
    if (category) query.category = category;
    if (forClass) query.forClass = { $in: [forClass, 'all'] };
    
    // Filter for upcoming events if requested
    if (upcoming === 'true') {
      query.date = { $gte: new Date() };
    }
    
    // Execute query with pagination
    const total = await Event.countDocuments(query);
    const events = await Event.find(query)
      .sort({ date: upcoming === 'true' ? 1 : -1 }) // Ascending for upcoming, descending for past
      .limit(Number(limit))
      .skip(Number(limit) * (Number(page) - 1))
      .populate('organizerId', 'name');
      
    res.json({
      success: true,
      count: events.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
      events
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

// @desc    Get event by ID
// @route   GET /api/events/:id
// @access  Public
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('organizerId', 'name')
      .populate('participants', 'name');
      
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    res.json({
      success: true,
      event
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

// @desc    Create new event
// @route   POST /api/events
// @access  Private (Admin/Teacher)
export const createEvent = async (req, res) => {
  try {
    const { 
      title, 
      description, 
      date,
      endDate,
      time,
      location,
      category,
      image,
      gallery,
      forClass,
      organizer,
      registrationRequired,
      registrationDeadline,
      maxParticipants
    } = req.body;
    
    const event = await Event.create({
      title,
      description,
      date,
      endDate,
      time,
      location,
      category,
      image,
      gallery,
      forClass: forClass || ['all'],
      organizer: organizer || req.user.name,
      organizerId: req.user._id,
      registrationRequired,
      registrationDeadline,
      maxParticipants
    });
    
    res.status(201).json({
      success: true,
      event
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

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private (Admin/Teacher)
export const updateEvent = async (req, res) => {
  try {
    const { 
      title, 
      description, 
      date,
      endDate,
      time,
      location,
      category,
      image,
      gallery,
      forClass,
      organizer,
      registrationRequired,
      registrationDeadline,
      maxParticipants,
      isActive
    } = req.body;
    
    let event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    // Check if user is authorized to update event
    if (event.organizerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this event'
      });
    }
    
    event.title = title || event.title;
    event.description = description || event.description;
    event.date = date || event.date;
    event.endDate = endDate || event.endDate;
    event.time = time || event.time;
    event.location = location || event.location;
    event.category = category || event.category;
    event.image = image || event.image;
    event.gallery = gallery || event.gallery;
    event.forClass = forClass || event.forClass;
    event.organizer = organizer || event.organizer;
    event.registrationRequired = registrationRequired !== undefined ? registrationRequired : event.registrationRequired;
    event.registrationDeadline = registrationDeadline || event.registrationDeadline;
    event.maxParticipants = maxParticipants || event.maxParticipants;
    event.isActive = isActive !== undefined ? isActive : event.isActive;
    
    await event.save();
    
    res.json({
      success: true,
      event
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

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private (Admin/Teacher)
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    // Check if user is authorized to delete event
    if (event.organizerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this event'
      });
    }
    
    // Instead of actually deleting, just mark as inactive
    event.isActive = false;
    await event.save();
    
    res.json({
      success: true,
      message: 'Event removed'
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

// @desc    Register student for an event
// @route   POST /api/events/:id/register
// @access  Private (Student)
export const registerForEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    // Check if event registration is open
    if (!event.registrationRequired) {
      return res.status(400).json({
        success: false,
        message: 'Registration is not required for this event'
      });
    }
    
    // Check if registration deadline has passed
    if (event.registrationDeadline && new Date(event.registrationDeadline) < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Registration deadline has passed'
      });
    }
    
    // Check if max participants limit reached
    if (event.maxParticipants && event.participants.length >= event.maxParticipants) {
      return res.status(400).json({
        success: false,
        message: 'Event has reached maximum participants'
      });
    }
    
    // Check if student is already registered
    if (event.participants.includes(req.user._id)) {
      return res.status(400).json({
        success: false,
        message: 'You are already registered for this event'
      });
    }
    
    // Add student to participants
    event.participants.push(req.user._id);
    await event.save();
    
    res.status(200).json({
      success: true,
      message: 'Successfully registered for the event'
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