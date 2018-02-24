const Sequelize = require('sequelize')
const db = require('../db')
const Word = require('./word')

const Dictionary = db.define('dictionary', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  image: {
    type: Sequelize.STRING,
    allowNull: true
  }
  }, {
    defaultScope: {
      include: [{model: Word}]
    }
  }
)

module.exports = Dictionary;
