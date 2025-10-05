const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db"); // your MariaDB connection

class Contactus extends Model {}

Contactus.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phno: {
      type: DataTypes.STRING,
      allowNull: false
    },
    msg: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "Contactus",
    tableName: "contactus",
    timestamps: true 
  }
);

module.exports = Contactus;