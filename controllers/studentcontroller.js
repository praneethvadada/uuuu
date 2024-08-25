import Student from '../models/student.js'; // Adjust the path as needed
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Staff from '../models/staff.js';
// Create a new student
export const studentLogin = async(req,res ) => {
  try {
    const {roll_number,password} = req.body;
    const student = await Student.findOne( { where: { roll_number } ,
      include: [
        {
          model: Staff,
          as: 'admin',
          attributes: [
            ['id', 'adminId' ],
            ['username','name']
          ] // Adjust attributes as needed
        }
      ]
    })

    if(!student){
      return res.status(401).json({message:'Invalid password or username'})
    }

    const passwordmatch = await bcrypt.compare(password,student.password)
    
    if(!passwordmatch){
      return res.status(401).json({message:'Invalid password or username'})
    }

    const token = jwt.sign({ id: student.id, role: 'student' }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    res.status(200).json({ message: 'Logged in successfully', token,student });
  } catch (error) {
    res.status(500).json({message:error})
  }
}

export const addStudent = async (req, res) => {
  try {
    const { roll_number, name, password, college_name, added_by } = req.body;
    const hashedPassword = await bcrypt.hash(password,16);
    // Create a new student record
    const newStudent = await Student.create({
      roll_number,
      name,
      password:hashedPassword,
      college_name,
      added_by,
    });

    res.status(201).json({
      message: 'Student created successfully',
      student: newStudent,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating student',
      error: error.message,
    });
  }
};

// Get all students
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll({
      include: [
        {
          model: Staff,
          as: 'admin', // Alias for the association
          attributes: [
            ['id', 'adminId'], // Aliasing 'id' to 'adminId'
            ['username', 'name'] // Aliasing 'username' to 'name'
          ]
        }
      ]
    });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching students',
      error: error.message,
    });
  }
};

// Get a single student by ID
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id, {
      include: [
        {
          model: Staff,
          as: 'admin',
          attributes: [
            ['id', 'adminId' ],
            ['username','name']
          ] // Adjust attributes as needed
        }
      ]
    })

    if (!student) {
      return res.status(404).json({
        message: 'Student not found',
      });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching student',
      error: error.message,
    });
  }
};

// Update a student's details
export const updateStudent = async (req, res) => {
  try {
    const { roll_number, name, password, college_name, added_by } = req.body;
    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: 'Student not found',
      });
    }

    // Update the student's details
    student.roll_number = roll_number || student.roll_number;
    student.name = name || student.name;
    student.password = password || student.password;
    student.college_name = college_name || student.college_name;
    student.added_by = added_by || student.added_by;

    await student.save();

    res.status(200).json({
      message: 'Student updated successfully',
      student,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating student',
      error: error.message,
    });
  }
};

// Delete a student by ID
export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: 'Student not found',
      });
    }

    await student.destroy();

    res.status(200).json({
      message: 'Student deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting student',
      error: error.message,
    });
  }
};
