import { Batch, College } from '../models/modelsIndex.js';

const BatchController = {
  // Create a new batch
  async create(req, res) {
    try {
      const batchData = req.body;
      const createdBatch = await Batch.create(batchData);
      res.status(201).json(createdBatch);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get all batches
  async getAll(req, res) {
    try {
      const batches = await Batch.findAll({
        include: [{ model: College, as: 'college' }],
      });
      res.json(batches);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get a specific batch by ID
  async getOne(req, res) {
    try {
      const batchId = req.params.id;
      const batch = await Batch.findByPk(batchId, {
        include: [{ model: College, as: 'college' }],
      });
      if (!batch) {
        return res.status(404).json({ error: 'Batch not found' });
      }
      res.json(batch);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update a batch by ID
  async update(req, res) {
    try {
      const batchId = req.params.id;
      const updateData = req.body;
      const batch = await Batch.findByPk(batchId);
      if (!batch) {
        return res.status(404).json({ error: 'Batch not found' });
      }
      await batch.update(updateData);
      res.json(batch);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete a batch by ID
  async delete(req, res) {
    try {
      const batchId = req.params.id;
      const batch = await Batch.findByPk(batchId);
      if (!batch) {
        return res.status(404).json({ error: 'Batch not found' });
      }
      await batch.destroy();
      res.json({ message: 'Batch deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default BatchController;