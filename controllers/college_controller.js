import { College } from '../models/modelsIndex.js';

const CollegeController = {
  // Create a new college
  async create(req, res) {
    try {
      const collegeData = req.body;
      const createdCollege = await College.create(collegeData);
      res.status(201).json(createdCollege);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get all colleges
  async getAll(req, res) {
    try {
      const colleges = await College.findAll();
      res.json(colleges);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get a specific college by ID
  async getOne(req, res) {
    try {
      const collegeId = req.params.id;
      const college = await College.findByPk(collegeId);
      if (!college) {
        return res.status(404).json({ error: 'College not found' });
      }
      res.json(college);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update a college by ID
  async update(req, res) {
    try {
      const collegeId = req.params.id;
      const updateData = req.body;
      const college = await College.findByPk(collegeId);
      if (!college) {
        return res.status(404).json({ error: 'College not found' });
      }
      await college.update(updateData);
      res.json(college);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete a college by ID
  async delete(req, res) {
    try {
      const collegeId = req.params.id;
      const college = await College.findByPk(collegeId);
      if (!college) {
        return res.status(404).json({ error: 'College not found' });
      }
      await college.destroy();
      res.json({ message: 'College deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default CollegeController;