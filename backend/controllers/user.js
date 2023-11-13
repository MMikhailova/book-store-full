import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import validateEmail from '../utils/validateEmail.js';
import validatePassword from '../utils/validatePassword.js';
import matchPasswords from '../utils/matchPasswords.js';

import db from '../models/index.js';

const User = db.users;

const userControllers = {
    register: async (req, res) => {
        try {
            const { email, password, rePassword } = req.body;

            // Check if the email already exists
            const existingUser = await User.findOne({
                where: { email: email }
            });
            if (existingUser) {
                return res
                    .status(400)
                    .json({ success: false, message: 'Email already exists' });
            }

            // Validate email and password
            if (
                !validateEmail(email) ||
                !validatePassword(password) ||
                !matchPasswords(password, rePassword)
            ) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid email or password format'
                });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user
            await User.create({
                email,
                password: hashedPassword
            });

            return res.status(201).json({
                success: true,
                message: `User with ${email} has been created`
            });
        } catch (err) {
            return res
                .status(500)
                .json({ success: false, err: 'Registration failed' });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Check if the email exists
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'User not found. Please sign up first.'
                });
            }

            // Compare passwords
            const passwordsMatch = await bcrypt.compare(
                password,
                user.password
            );

            if (passwordsMatch) {
                // Generate a JWT token
                const token = jwt.sign(
                    { user: user },
                    process.env.TOKEN_ACCESS_SECRET
                );

                // Set cookies
                res.cookie('id', user.id, {
                    secure: true
                });
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: true
                });

                return res
                    .status(200)
                    .json({ success: true, token, id: user.id });
            } else {
                return res.status(401).json({
                    success: false,
                    message: 'Email or password is incorrect'
                });
            }
        } catch (error) {
            return res
                .status(500)
                .json({ success: false, error: 'Login failed' });
        }
    },

    logout: (req, res) => {
        // Clear cookies
        res.clearCookie('token');
        res.clearCookie('id');

        return res
            .status(200)
            .json({ success: true, message: 'User logged out successfully' });
    }
};

export default userControllers;
