import  Trainer from '../models/trainer.js'; // Assuming you're using a combined model index
import { Op } from 'sequelize';

// Controller for Trainer model
const TrainerController = {
  // Create a new trainer
  async create(req, res) {
    try {
      const trainerData = req.body;
      const createdTrainer = await Trainer.create(trainerData);
      res.status(201).json(createdTrainer);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get all trainers
  async getAll(req, res) {
    try {
      const trainers = await Trainer.findAll();
      res.json(trainers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get a specific trainer by ID
  async getOne(req, res) {
    try {
      const trainerId = req.params.id;
      const trainer = await Trainer.findByPk(trainerId);
      if (!trainer) {
        return res.status(404).json({ error: 'Trainer not found' });
      }
      res.json(trainer);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update a trainer by ID
  async update(req, res) {
    try {
      const trainerId = req.params.id;
      const updateData = req.body;
      const trainer = await Trainer.findByPk(trainerId);
      if (!trainer) {
        return res.status(404).json({ error: 'Trainer not found' });
      }
      await trainer.update(updateData);
      res.json(trainer);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete a trainer by ID
  async delete(req, res) {
    try {
      const trainerId = req.params.id;
      const trainer = await Trainer.findByPk(trainerId);
      if (!trainer) {
        return res.status(404).json({ error: 'Trainer not found' });
      }
      await trainer.destroy();
      res.json({ message: 'Trainer deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Bulk add trainers
  async bulkAdd(req, res) {
    try {
      const trainerData = req.body;
      const createdTrainers = await Trainer.bulkCreate(trainerData);
      res.status(201).json(createdTrainers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Search for trainers by name or user_id
  async search(req, res) {
    try {
      const searchQuery = req.query.search;
      const trainers = await Trainer.findAll({
        where: {
          [Op.or]: [
            { name: { [Op.like]: `%${searchQuery}%` } },
            { user_id: { [Op.like]: `%${searchQuery}%` } },
          ],
        },
      });
      res.json(trainers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default TrainerController;