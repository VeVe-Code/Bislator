const { Op } = require("sequelize"); // <-- import this at the top
const Contactus = require("../model/Contactus");
const { JSDOM } = require("jsdom");
const createDOMPurify = require("isomorphic-dompurify");

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

let ContactusController = {
  index: async (req, res) => {
    try {
      const name = req.query.name || "";

      const data = await Contactus.findAll({
        where: {
          name: {
            [Op.like]: `%${name}%` // <-- use Op.like
          }
        },
        order: [["createdAt", "DESC"]]
      });

      return res.json(data);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ msg: "Server error" });
    }
  },

  store: async (req, res) => {
    try {
      let { name, email, phno, msg } = req.body;
      const safeMsg = DOMPurify.sanitize(msg, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });

      const data = await Contactus.create({
        name,
        email,
        phno,
        msg: safeMsg
      });

      return res.json(data);
    } catch (e) {
      console.error(e);
      return res.status(400).json({ msg: "Error creating contact" });
    }
  },

  destroy: async (req, res) => {
    try {
      const { id } = req.params;

      const deleted = await Contactus.destroy({
        where: { id }
      });

      if (!deleted) return res.status(404).json({ msg: "Data not found" });

      return res.json({ msg: "Contact deleted successfully" });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ msg: "Server error" });
    }
  }
};

module.exports = ContactusController;



//   destroy: async(req, res) => {
//      try {
//     let id = req.params.id;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ msg: "Invalid ID" });
//     }

//     let service = await Service.findByIdAndDelete(id);

//     if (!service) {
//       return res.status(404).json({ msg: "Service not found" });
//     }

//     return res.json(service);

//   } catch (e) {
//     console.error(e); // Optional: log the actual error
//     return res.status(500).json({ msg: "Server error" });
//   }
//   },
