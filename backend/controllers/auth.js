import User from '../models/User.js';

// Register a new user
export const register = async (req, res) => {
    try {
        console.log('Register request received:', req.body);
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            console.log('Missing required fields:', { name: !!name, email: !!email, password: !!password });
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('User already exists:', email);
            return res.status(400).json({ message: 'User already exists' });
        }

        // Split name into firstName and lastName
        const [firstName, ...lastNameParts] = name.trim().split(' ');
        const lastName = lastNameParts.join(' ') || firstName;

        // Create new user
        const user = new User({
            username: email.split('@')[0], // Use part of email as username
            email,
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

        console.log('Attempting to save user:', {
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        });

        await user.save();
        console.log('User registered successfully:', email);

        // Return success without password
        const userResponse = user.toJSON();
        res.status(201).json({
            message: 'User registered successfully',
            user: userResponse
        });
    } catch (error) {
        console.error('Register error details:', {
            name: error.name,
            message: error.message,
            stack: error.stack,
            code: error.code
        });
        
        // Handle specific MongoDB errors
        if (error.code === 11000) {
            return res.status(400).json({ 
                message: 'Email or username already exists'
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