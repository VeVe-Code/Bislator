const path = require("path");
const fs = require("fs");
const { Op } = require("sequelize");
const News = require("../model/News");

// Helper to remove old file safely
const removeFile = (filePath) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

const NewsController = {
  // List news with pagination & search
  index: async (req, res) => {
    try {
      const title = req.query.title || "";
      const page = parseInt(req.query.page) || 1;
      const limit = 8;

      const where = title
        ? { title: { [Op.like]: `%${title}%` } }
        : {};

      const { rows: news, count: totalnewscount } = await News.findAndCountAll({
        where,
        limit,
        offset: (page - 1) * limit,
        order: [["createdAt", "DESC"]],
      });

      const totalpagescount = Math.ceil(totalnewscount / limit);

      const links = {
        nextPage: totalpagescount === page ? false : true,
        previousPage: page === 1 ? false : true,
        currentPage: page,
        loopLink: Array.from({ length: totalpagescount }, (_, i) => ({ number: i + 1 })),
      };

      return res.json({ links, data: news });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ msg: "Server error" });
    }
  },

  // Create news
  store: async (req, res) => {
    try {
      const { title, description, about } = req.body;
      const news = await News.create({ title, description, about });
      return res.status(200).json(news);
    } catch (e) {
      console.error(e);
      return res.status(400).json({ msg: "Error creating news" });
    }
  },

  // Show single news
  show: async (req, res) => {
    try {
      const id = req.params.id;
      const news = await News.findByPk(id);
      if (!news) return res.status(404).json({ msg: "News not found" });
      return res.json(news);
    } catch (e) {
      console.error(e);
      return res.status(400).json({ msg: "Server error" });
    }
  },

  // Update news
  update: async (req, res) => {
    try {
      const id = req.params.id;
      const news = await News.findByPk(id);
      if (!news) return res.status(404).json({ msg: "News not found" });

      await news.update(req.body);
      return res.json(news);
    } catch (e) {
      console.error(e);
      return res.status(400).json({ msg: "Server error" });
    }
  },

  // Delete news
  destroy: async (req, res) => {
    try {
      const id = req.params.id;
      const news = await News.findByPk(id);
      if (!news) return res.status(404).json({ msg: "News not found" });

      if (news.photo) removeFile(path.join(__dirname, "..", "public", news.photo));
      await news.destroy();

      return res.json({ msg: "News deleted successfully" });
    } catch (e) {
      console.error(e);
      return res.status(400).json({ msg: "Server error" });
    }
  },

  // Upload photo
   upload: async (req, res) => {
    try {
      const id = req.params.id;
      const news = await News.findByPk(id);
      if (!news) return res.status(404).json({ msg: "News not found" });

      if (!req.file) return res.status(400).json({ msg: "Photo is required" });
      if (news.photo) await removefile(__dirname + "/../public" + news.photo);

      await news.update({ photo: "/" + req.file.filename });
      return res.json(news);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ msg: "Server error" });
    }
  },
};

module.exports = NewsController;
