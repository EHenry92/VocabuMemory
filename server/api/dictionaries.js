const router = require('express').Router();
const {Dictionary} = require('../db/models');
const bodyParser = require('body-parser');
const Op = require('sequelize').Op;

module.exports = router;

router.get('/', (req, res, next) => {
  Dictionary.findAll({})
    .then(dictionaries => res.json(dictionaries))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Dictionary.findById(req.params.id)
  .then(dictionary => res.json(dictionary))
  .catch(next)
})

router.get('/user/:userId', (req, res, next) => {
  Dictionary.findAll({
    where:
    {userId: {
      [Op.or]: [req.params.userId, null]
    }}
  })
    .then(dictionaries => res.json(dictionaries))
    .catch(next)
})

router.post('/', (req, res, next) => {
  Dictionary.create(req.body)
  .then(dictionary => res.json(dictionary))
  .catch(next)
})

router.put('/:id', (req, res, next) => {
  Dictionary.update(
    req.body,
    { where: {id: req.params.id} }
  )
  .then(() => res.json('edited'))
  .catch(next)
})

router.delete('/:id', (req, res, next) => {
  Dictionary.destroy({
    where: {id: req.params.id}
  })
  .then(word => res.json(word))
  .catch(next)
})

