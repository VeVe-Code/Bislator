const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");
const bcrypt = require("bcrypt");

class Admin extends Model {
  // Register new admin
  static async register(name, email, password) {
    const adminExists = await Admin.findOne({ where: { email } });
    if (adminExists) throw new Error("Admin already exists");

    const hash = await bcrypt.hash(password.trim(), 10);

    const admin = await Admin.create({
      name,
      email,
      password: hash
    });

    return admin;
  }

  // Login admin
  static async login(email, password) {
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) throw new Error("Admin does not exist");

    const isCorrect = await bcrypt.compare(password.trim(), admin.password);
    if (!isCorrect) throw new Error("Password incorrect");

    return admin;
  }
}

Admin.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    modelName: "Admin",
    tableName: "admins",
    timestamps: true,
  }
);

module.exports = Admin;
