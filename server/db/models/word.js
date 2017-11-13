const Sequelize = require('sequelize')
const db = require('../db')

const Word = db.define('word', {
  word: {
    type: Sequelize.STRING,
    allowNull: false
  },
  definition: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  level: {
    type: Sequelize.INTEGER,
    defaultValue: 2
  },
  image: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  verified: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: true
  },
  sentence: {
    type: Sequelize.TEXT,
    allowNull: true
  }
})

module.exports = Word;

