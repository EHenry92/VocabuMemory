const User = require('./user');
const Dictionary = require('./dictionary');
const Word = require('./word');

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
Dictionary.belongsToMany(Word, {through: 'Groups'});
// Word.belongsToMany(Dictionary, {through: 'Groups'});

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User, Dictionary, Word
}
