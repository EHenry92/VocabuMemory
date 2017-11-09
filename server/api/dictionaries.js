const router = require('express').Router();
const {Dictionary} = require('../db/models');
const bodyParser = require('body-parser');
module.exports = router;

router.get('/', (req, res, next) => {
  Dictionary.findAll({})
    .then(dictionaries => res.json(dictionaries))
    .catch(next)
})

router.post('/', (req, res, next) => {
  Dictionary.create(req.body)
  .then(dictionary => res.json(dictionary))
  .catch(next)
})

router.get('/:id', (req, res, next) => {
  Dictionary.findById(req.params.id)
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

router.post('/:id', (req, res, next) => {
  Dictionary.findById(req.params.id, {
    where: {id: req.params.id}
  })
  .then(dictionary => {
  dictionary.createWord(
    req.body
  )})
  .then(() => res.json('word added to dictionary'))
  .catch(next)
})

router.delete('/:id', (req, res, next) => {
  Dictionary.destroy({
    where: {id: req.params.id}
  })
  .then(word => res.json(word))
  .catch(next)
})

router.delete('/:dId/:wordId', (req, res, next) => {
  Dictionary.findById(req.params.dId)
  .then(dictionary => {
    dictionary.removeWord(req.params.wordId)
  })
  .then(data => res.json(data))
  .catch(next)
})
