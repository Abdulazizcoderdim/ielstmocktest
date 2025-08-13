const Question = require("../models/question.model");

class AdminController {
  async createQuestion(req, res) {
    try {
      const { text, options, correctAnswerIndex } = req.body;

      const question = await Question.create({
        text,
        options,
        correctAnswerIndex,
      });

      res.status(201).json(question);
    } catch (error) {
      res.status(500).json({ error: error.message });
      console.log(error);
    }
  }
  async getQuestions(req, res) {
    try {
      const { page = 1, size = 10 } = req.query;

      const pageNumber = parseInt(page);
      const pageSize = parseInt(size);
      const skip = (pageNumber - 1) * pageSize;

      const [totalElements, questions] = await Promise.all([
        Question.countDocuments(),
        Question.find().skip(skip).limit(pageSize),
      ]);

      const totalPages = Math.ceil(totalElements / pageSize);

      res.status(200).json({
        content: questions,
        page: {
          number: pageNumber,
          size: pageSize,
          totalElements,
          totalPages,
        },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
      console.log(error);
    }
  }
  catch(error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
  async getQuestionById(req, res) {
    try {
      const { id } = req.params;

      const question = await Question.findById(id);

      if (!question) {
        return res.status(404).json({ error: "Question not found" });
      }

      res.status(200).json(question);
    } catch (error) {
      res.status(500).json({ error: error.message });
      console.log(error);
    }
  }
  async updateQuestion(req, res) {
    try {
      const { id } = req.params;
      const { text, options, correctAnswerIndex } = req.body;

      const question = await Question.findById(id).exec();
      if (!question) {
        return res.status(404).json({ error: "Question not found" });
      }

      if (text) question.text = text;

      if (options) question.options = options;

      if (correctAnswerIndex !== undefined)
        question.correctAnswerIndex = correctAnswerIndex;

      await question.save();
      console.log("Question updated successfully");

      res.status(200).json(question);
    } catch (error) {
      res.status(500).json({ error: error.message });
      console.log(error);
    }
  }
  async deleteQuestion(req, res) {
    try {
      const { id } = req.params;

      const question = await Question.findByIdAndDelete(id);

      if (!question) {
        return res.status(404).json({ error: "Question not found" });
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
      console.log(error);
    }
  }
}

module.exports = new AdminController();
