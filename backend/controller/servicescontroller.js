const Service = require("../model/Service"); // ✅ Fixed import
const { Op } = require("sequelize");

let servicesController = {
  // GET /api/services?page=1
  index: async (req, res) => {
  try {
    // fallback: req.query.page undefined or NaN
    let page = parseInt(req.query.page);
    if (isNaN(page) || page < 1) page = 1;

    const limit = 6;

    const { count: totalServicesCount, rows: services } = await Service.findAndCountAll({
      offset: (page - 1) * limit,
      limit,
      order: [["createdAt", "DESC"]],
    });

    const totalPagesCount = Math.ceil(totalServicesCount / limit);

    let links = {
      nextPage: totalPagesCount === page ? false : true,
      previousPage: page === 1 ? false : true,
      currentPage: page,
      loopLink: [],
    };

    for (let i = 0; i < totalPagesCount; i++) {
      links.loopLink.push({ number: i + 1 });
    }

    return res.json({ links, data: services });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
}
,

  // POST /api/services
  store: async (req, res) => {
    try {
      const { title, about } = req.body;

      const service = await Service.create({ title, about });

      return res.status(200).json(service);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Server error" });
    }
  },

  // GET /api/services/:id
  show: async (req, res) => {
    try {
      const id = req.params.id;

      const service = await Service.findByPk(id);

      if (!service) {
        return res.status(404).json({ msg: "Service not found" });
      }

      return res.json(service);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Server error" });
    }
  },

  // DELETE /api/services/:id



    destroy: async (req, res) => {
  try {
    let id = req.params.id;

    // Optional: check if ID is a valid number (Sequelize usually uses numeric IDs)
    if (isNaN(id)) {
      return res.status(400).json({ msg: "Invalid ID" });
    }

    // Find the service by primary key
    let service = await Service.findByPk(id);

    if (!service) {
      return res.status(404).json({ msg: "Service not found" });
    }

    // Delete the service
    await service.destroy();

    return res.json({ msg: "Service deleted successfully", service });

  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Server error" });
  }
}

,


  // PATCH /api/services/:id
  update: async (req, res) => {
    try {
      const id = req.params.id;

      const service = await Service.findByPk(id);

      if (!service) {
        return res.status(404).json({ msg: "Service not found" });
      }

      await service.update({ ...req.body });

      return res.status(200).json(service);

    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Server error" });
    }
  },
};

module.exports = servicesController;
