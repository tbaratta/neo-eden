import User from '../models/User.js';

// Register a new user
export const register = async (req, res) => {
    try {
        console.log('\n=== Starting Registration Process ===');
        console.log('Register request received:', {
            name: req.body.name,
            email: req.body.email,
            passwordLength: req.body.password?.length
        });

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            console.log('Missing required fields:', { name: !!name, email: !!email, password: !!password });
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        // Detailed logging for email check
        const emailLower = email.toLowerCase();
        console.log('\nChecking database for existing users:');
        console.log('Email to check (lowercase):', emailLower);
        
        // Find ALL users with similar emails to debug
        const allUsers = await User.find({});
        console.log('All existing users:', allUsers.map(u => ({ id: u._id, email: u.email })));

        const existingUser = await User.findOne({ email: emailLower });
        console.log('Direct email search result:', existingUser ? {
            id: existingUser._id,
            email: existingUser.email
        } : 'No user found');
        
        if (existingUser) {
            console.log('Email already exists:', emailLower);
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Split name into firstName and lastName
        const [firstName, ...lastNameParts] = name.trim().split(' ');
        const lastName = lastNameParts.join(' ');

        console.log('\nCreating new user with:', {
            email: emailLower,
            firstName,
            lastName
        });

        // Create new user
        const user = new User({
            email: emailLower,
            password,
            firstName,
            lastName,
            role: 'USER',
            isActive: true,
            currentLocation: {
                type: 'Point',
                coordinates: [0, 0]
            },
            lastKnownLocation: {
                type: 'Point',
                coordinates: [0, 0]
            },
            baseLocation: {
                type: 'Point',
                coordinates: [0, 0]
            }
        });

        try {
            await user.save();
            console.log('\nUser saved successfully:', {
                id: user._id,
                email: user.email
            });

            // Return success without password
            const userResponse = user.toJSON();
            res.status(201).json({
                message: 'User registered successfully',
                user: userResponse
            });
        }  catch (error) {
            console.error('🔥 Registration error details:', {
              name: error.name,
              message: error.message,
              code: error.code,
              keyPattern: error.keyPattern,
              keyValue: error.keyValue,
              stack: error.stack
            });
            return res.status(500).json({ message: 'Server error during registration', error: error.message });
          }
          
    } catch (error) {
        console.error('\nRegistration error details:', {
            name: error.name,
            message: error.message,
            code: error.code,
            keyPattern: error.keyPattern,
            keyValue: error.keyValue,
            stack: error.stack
        });
        
        // Handle specific MongoDB errors
        if (error.code === 11000) {
            console.error('Duplicate key error details:', {
                keyPattern: error.keyPattern,
                keyValue: error.keyValue
            });
            return res.status(400).json({ 
                message: 'Email already exists',
                details: process.env.NODE_ENV === 'development' ? {
                    keyPattern: error.keyPattern,
                    keyValue: error.keyValue
                } : undefined
            });
        }

        res.status(500).json({ 
            message: 'Server error during registration',
            error: process.env.NODE_ENV === 'development' ? error.toString() : undefined
        });
    }
};

// Login user
export const login = async (req, res) => {
    try {
        console.log('Login request received:', req.body);
        const { email, password } = req.body;

        if (!email || !password) {
            console.log('Missing login credentials:', { email: !!email, password: !!password });
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found:', email);
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        try {
            const isMatch = await user.comparePassword(password);
            console.log('Password match result:', isMatch);
            
            if (!isMatch) {
                console.log('Invalid password for user:', email);
                return res.status(400).json({ message: 'Invalid credentials' });
            }
        } catch (pwError) {
            console.error('Password comparison error:', {
                error: pwError.message,
                stack: pwError.stack
            });
            return res.status(500).json({ message: 'Error verifying credentials' });
        }

        // Update last login
        user.lastLogin = Date.now();
        await user.save();
        console.log('User logged in successfully:', email);

        // Return success without password
        const userResponse = user.toJSON();
        res.json({
            message: 'Login successful',
            user: userResponse
        });
    } catch (error) {
        console.error('Login error details:', {
            name: error.name,
            message: error.message,
            stack: error.stack
        });
        res.status(500).json({ 
            message: 'Server error during login',
            error: process.env.NODE_ENV === 'development' ? error.toString() : undefined
        });
    }
}; 