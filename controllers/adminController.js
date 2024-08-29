import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {Admin} from '../models/modelsIndex.js'

export const register = async (req, res) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = await Admin.create({ username, password: hashedPassword });

        res.status(201).json({ message: 'Admin added successfully', admin });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await Admin.findOne({ where: { username } });

        if (!admin) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

        res.status(200).json({ message: 'Logged in successfully', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};