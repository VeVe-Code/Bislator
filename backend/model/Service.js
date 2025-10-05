const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // adjust path to your sequelize instance

const Service = sequelize.define('Service', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    about: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
    tableName: 'services' // optional: explicitly name the table
});

module.exports = Service;
