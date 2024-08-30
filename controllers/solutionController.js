import  Solution  from '../models/solution.js'; // Assuming you're using a combined model index

const SolutionController = {
  // Create a new solution
  async create(req, res) {
    try {
      const solutionData = req.body;
      const createdSolution = await Solution.create(solutionData);
      res.status(201).json(createdSolution);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get all solutions for a specific question
  async getAllByQuestionId(req, res) {
    try {
      const questionId = req.params.questionId;
      const solutions = await Solution.findAll({
        where: { question_id: questionId },
      });
      res.json(solutions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get a specific solution by ID
  async getOne(req, res) {
    try {
      const solutionId = req.params.id;
      const solution = await Solution.findByPk(solutionId);
      if (!solution) {
        return res.status(404).json({ error: 'Solution not found' });
      }
      res.json(solution);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update a solution by ID
  async update(req, res) {
    try {
      const solutionId = req.params.id;
      const updateData = req.body;
      const solution = await Solution.findByPk(solutionId);
      if (!solution) {
        return res.status(404).json({ error: 'Solution not found' });
      }
      await solution.update(updateData);
      res.json(solution);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete a solution by ID
  async delete(req, res) {
    try {
      const solutionId = req.params.id;
      const solution = await Solution.findByPk(solutionId);
      if (!solution) {
        return res.status(404).json({ error: 'Solution not found' });
      }
      await solution.destroy();
      res.json({ message: 'Solution deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default SolutionController;