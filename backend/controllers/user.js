import User from '../models/User.js';

// Register a new user
export const register = async (req, res) => {
  try {
    const { username, email, password, firstName, lastName } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (existingUser) {
      return res.status(400).json({ 
        message: 'User with this email or username already exists' 
      });
    }

    const user = new User({
      username,
      email,
      password,
      firstName,
      lastName
    });

    await user.save();
    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Update last login
    user.lastLogin = Date.now();
    await user.save();

    res.json({ user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get user profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const updates = {};
    const allowedUpdates = ['username', 'email', 'password', 'firstName', 'lastName'];
    
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    Object.keys(updates).forEach(update => user[update] = updates[update]);
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user role
export const updateRole = async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.role = role;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Deactivate user
export const deactivateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isActive = false;
    await user.save();
    res.json({ message: 'User deactivated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update user location
export const updateLocation = async (req, res) => {
  try {
    const { longitude, latitude } = req.body;
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    await user.updateLocation(longitude, latitude);
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get user location history
export const getLocationHistory = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user.locationHistory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update base location
export const updateBaseLocation = async (req, res) => {
  try {
    const { longitude, latitude } = req.body;
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user.baseLocation = {
      type: 'Point',
      coordinates: [longitude, latitude]
    };
    
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get nearby users
export const getNearbyUsers = async (req, res) => {
  try {
    const { longitude, latitude, maxDistance } = req.query;
    const users = await User.getNearbyUsers(
      parseFloat(longitude),
      parseFloat(latitude),
      maxDistance ? parseFloat(maxDistance) : undefined
    );
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update search radius
export const updateSearchRadius = async (req, res) => {
  try {
    const { radius } = req.body;
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user.searchRadius = radius;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}; 