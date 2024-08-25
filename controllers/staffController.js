import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Staff from '../models/staff.js';

export const register = async (req, res) => {
    const { username, password, position } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const staff = await Staff.create({ username, password: hashedPassword, position });

        res.status(201).json({ message: 'Staff registered successfully', staff });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;
    console.log("i am here")
    try {
        const staff = await Staff.findOne({ where: { username } });
        // console.log(staff);
        

        if (!staff) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const isMatch = await bcrypt.compare(password, staff.password);
        // console.log(isMatch,staff.password,password);
        
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ id: staff.id, role: staff.position }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

        res.status(200).json({ message: 'Logged in successfully', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
