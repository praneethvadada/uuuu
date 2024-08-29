import Student from '../models/student.js'; // Adjust the path as needed
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/admin.js';
import sequelize from '../config/db.js';
import Batch from '../models/batch.js';
// Create a new student
export const studentLogin = async(req,res ) => {
  try {
    const {roll_number,password} = req.body;
    const student = await Student.findOne( { where: { roll_number } ,
      include: [
        {
          model: Admin,
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
  const transaction = await sequelize.transaction();

  try {
    const studentDataArray = req.body; // Assume this is an array of student objects

    // Extract batch names and prepare batch data
    const batchNames = [...new Set(studentDataArray.map(student => student.batch))];
    const batchPromises = batchNames.map(batchName =>
      Batch.findOrCreate({
        where: { name: batchName },
        defaults: { name: batchName },
        transaction
      })
    );
    console.log(batchPromises);
    

    // Create or retrieve all batches
    const batchResults = await Promise.all(batchPromises);
    console.log('......................');
    console.log(batchResults);
    
    const batchMap = batchResults.reduce((map, [batch, created]) => {
      map[batch.name] = batch.id;
      return map;
    }, {});

    // Prepare student records with batch IDs
    const students = studentDataArray.map(student => ({
      roll_number: student.roll_number,
      name: student.name,
      password: bcrypt.hashSync(student.password, 16),
      college_name: student.college_name,
      batch_id: batchMap[student.batch], // Use batch ID from the map
      branch: student.branch,
      added_by: student.added_by
    }));

    // Bulk create students
    await Student.bulkCreate(students, { transaction });

    // Commit the transaction
    await transaction.commit();
    res.status(201).json({
      message: 'Students created successfully!',
    });
  } catch (error) {
    // Rollback the transaction in case of error
    await transaction.rollback();
    console.error('Failed to create students:', error);
    res.status(500).json({
      message: 'Error creating students',
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
          model: Admin,
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
          model: Admin,
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
