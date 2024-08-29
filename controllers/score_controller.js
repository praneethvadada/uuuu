import Score from '../models/scores'; // Assuming you're using a combined model index

const ScoreController = {
  // Create a new score
  async create(req, res) {
    try {
      const scoreData = req.body;
      const createdScore = await Score.create(scoreData);
      res.status(201).json(createdScore);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get all scores for a specific student
  async getAllByStudentId(req, res) {
    try {
      const studentId = req.params.studentId;
      const scores = await Score.findAll({
        where: { student_id: studentId },
      });
      res.json(scores);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get all scores for a specific question
  async getAllByQuestionId(req, res) {
    try {
      const questionId = req.params.questionId;
      const scores = await Score.findAll({
        where: { question_id: questionId },
      });
      res.json(scores);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get a specific score by ID
  async getOne(req, res) {
    try {
      const scoreId = req.params.id;
      const score = await Score.findByPk(scoreId);
      if (!score) {
        return res.status(404).json({ error: 'Score not found' });
      }
      res.json(score);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update a score by ID
  async update(req, res) {
    try {
      const scoreId = req.params.id;
      const updateData = req.body;
      const score = await Score.findByPk(scoreId);
      if (!score) {
        return res.status(404).json({ error: 'Score not found' });
      }
      await score.update(updateData);
      res.json(score);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete a score by ID
  async delete(req, res) {
    try {
      const scoreId = req.params.id;
      const score = await Score.findByPk(scoreId);
      if (!score) {
        return res.status(404).json({ error: 'Score not found' });
      }
      await score.destroy();
      res.json({ message: 'Score deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default ScoreController;