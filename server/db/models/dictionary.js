const Sequelize = require('sequelize')
const db = require('../db')

const Dictionary = db.define('dictionary', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    allowNull: true
  }
})

module.exports = Dictionary;

