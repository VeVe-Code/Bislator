const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db"); // your MariaDB connection

class News extends Model {}

News.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true, // optional
    },
    description: {
      type: DataTypes.TEXT, // for longer text
      allowNull: false,
    },
    about: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "News",
    tableName: "news", // table name in MariaDB
    timestamps: true, // createdAt & updatedAt
  }
);

module.exports = News;
