const Question = require("../models/question.model");

class UserController {
  async test(req, res) {
    try {
      const questions = await Question.aggregate([
        { $sample: { size: 10 } },
        { $project: { correctAnswerIndex: 0 } },
      ]);

      res.status(200).json(questions);
    } catch (error) {
      res.status(500).json({ error: error.message });

      console.log(error);
    }
  }
  async submit(req, res) {
    try {
      const { answers } = req.body;

      if (!Array.isArray(answers) || answers.length === 0) {
        return res.status(400).json({ error: "Answers are required" });
      }

      let correctCount = 0;

      for (let ans of answers) {
        const question = await Question.findById(ans.questionId);

        if (question && question.correctAnswerIndex === ans.selectedOption) {
          correctCount++;
        }
      }

      const total = answers.length;
      const percentage = ((correctCount / total) * 100).toFixed(2);

      res.status(200).json({
        correctCount,
        total,
        percentage,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });

      console.log(error);
    }
  }
}

module.exports = new UserController();
