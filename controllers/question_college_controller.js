import { QuestionCollege } from '../models/modelsIndex'; // Assuming combined model index

const QuestionCollegeController = {
  // Create a new question-college association
  async create(req, res) {
    try {
      const questionCollegeData = req.body;
      const createdQuestionCollege = await QuestionCollege.create(questionCollegeData);
      res.status(201).json(createdQuestionCollege);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get all question-college associations for a specific question
  async getAllByQuestionId(req, res) {
    try {
      const questionId = req.params.questionId;
      const questionColleges = await QuestionCollege.findAll({
        where: { question_id: questionId },
      });
      res.json(questionColleges);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get all question-college associations for a specific batch
  async getAllByBatchId(req, res) {
    try {
      const batchId = req.params.batchId;
      const questionColleges = await QuestionCollege.findAll({
        where: { batch_id: batchId },
      });
      res.json(questionColleges);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete a question-college association by ID
  async delete(req, res) {
    try {
      const questionCollegeId = req.params.id;
      const questionCollege = await QuestionCollege.findByPk(questionCollegeId);
      if (!questionCollege) {
        return res.status(404).json({ error: 'Question-College association not found' });
      }
      await questionCollege.destroy();
      res.json({ message: 'Question-College association deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default QuestionCollegeController;