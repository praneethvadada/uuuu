import { question} from '../models/modelsIndex.js' 
// Assuming combined model index

const QuestionController = {
  // Create a new question
  async create(req, res) {
    try {
      const questionData = req.body;
      const createdQuestion = await Question.create(questionData);
      res.status(201).json(createdQuestion);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get all questions
  async getAll(req, res) {
    try {
      const questions = await Question.findAll({
        include: [
          { model: 'admin', as: 'admin' }, // Include the associated admin
          { model: 'domain', as: 'domain' }, // Include the associated domain (if applicable)
        ],
      });
      res.json(questions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get a specific question by ID
  async getOne(req, res) {
    try {
      const questionId = req.params.id;
      const question = await Question.findByPk(questionId, {
        include: [
          { model: 'admin', as: 'admin' }, // Include the associated admin
          { model: 'domain', as: 'domain' }, // Include the associated domain (if applicable)
        ],
      });
      if (!question) {
        return res.status(404).json({ error: 'Question not found' });
      }
      res.json(question);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update a question by ID
  async update(req, res) {
    try {
      const questionId = req.params.id;
      const updateData = req.body;
      const question = await Question.findByPk(questionId);
      if (!question) {
        return res.status(404).json({ error: 'Question not found' });
      }
      await question.update(updateData);
      res.json(question);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete a question by ID
  async delete(req, res) {
    try {
      const questionId = req.params.id;
      const question = await Question.findByPk(questionId);
      if (!question) {
        return res.status(404).json({ error: 'Question not found' });
      }
      await question.destroy();
      res.json({ message: 'Question deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Filter questions by specific criteria (optional)
  async filter(req, res) {
    try {
      const filters = req.query; // Assuming filters are passed as query parameters
      const questions = await Question.findAll({
        where: filters, // Apply filters based on query parameters
        include: [
          { model: 'admin', as: 'admin' }, // Include the associated admin (if applicable)
          { model: 'domain', as: 'domain' }, // Include the associated domain (if applicable)
        ],
      });
      res.json(questions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default QuestionController;