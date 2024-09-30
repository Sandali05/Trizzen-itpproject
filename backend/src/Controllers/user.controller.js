const User = require('../Models/user.model');
const jwt = require('jsonwebtoken');

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { username, firstname, lastname, address, mobilenumber, email, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ username, firstname, lastname, address, mobilenumber, email, password });
    await user.save();

    

    res.status(201).json({ user });
  } catch (error) {
    console.error(error); // Log error details to the console
    res.status(500).json({ message: 'Server error', error: error.message });
  }
  };

// Login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '8h' });

    res.json({ token,user });
  } catch (error) {
    console.error(error); // Log error details to the console
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error); // Log error details to the console
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // Make sure to pass the correct user ID to findById
    const user = await User.findById(userId);
    console.log(user);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { username, firstname, lastname, address, mobilenumber, email } = req.body;

    user.username = username || user.username;
    user.firstname = firstname || user.firstname;
    user.lastname = lastname || user.lastname;
    user.address = address || user.address;
    user.mobilenumber = mobilenumber || user.mobilenumber;
    user.email = email || user.email;

    await user.save();

    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error(error); // Log error details to the console
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.adminUpdateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.body._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { username, firstname, lastname, address, mobilenumber, email } = req.body;

    user.username = username || user.username;
    user.firstname = firstname || user.firstname;
    user.lastname = lastname || user.lastname;
    user.address = address || user.address;
    user.mobilenumber = mobilenumber || user.mobilenumber;
    user.email = email || user.email;

    await user.save();

    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error(error); // Log error details to the console
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete user profile
exports.deleteUserProfile = async (req, res) => {
  try {
    // Find the user by ID and delete
    const user = await User.findByIdAndDelete(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User profile deleted successfully' });
  } catch (error) {
    console.error(error); // Log error details to the console
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.adminDeleteUserProfile = async (req, res) => {
  try {
    // Find the user by ID and delete
    const user = await User.findByIdAndDelete(req.body.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User profile deleted successfully' });
  } catch (error) {
    console.error(error); // Log error details to the console
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find().select('-password'); // Exclude password field from the result
      res.json(users);
    } catch (error) {
      console.error(error); // Log error details to the console
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

  // Get user by ID
exports.getUserById = async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select('-password'); // Exclude password field from the result
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(user);
    } catch (error) {
      console.error(error); // Log error details to the console
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

  