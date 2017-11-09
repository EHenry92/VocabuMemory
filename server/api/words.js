const router = require('express').Router();
const {Word} = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
  Word.findAll({})
    .then(words => res.json(words))
    .catch(next)
})
router.get('/level/:levelId', (req, res, next) => {
  Word.findAll({
    where: {level: req.params.levelId}
  })
    .then(words => res.json(words))
    .catch(next)
})
router.post('/', (req, res, next) => {
  Word.create(req.body)
  .then(word => res.json(word))
  .catch(next)
  res.end();
})
router.get('/:id', (req, res, next) => {
  Word.findById(req.params.id)
  .then(word => res.json(word))
  .catch(next)
})
router.put('/:id', (req, res, next) => {
  Word.update(
    req.body,
    { where: {id: req.params.id} }
  )
  .then(() => res.json('edited'))
  .catch(next)
})

router.delete('/:id', (req, res, next) => {
  Word.destroy({
    where: {id: req.params.id}
  })
  .then(word => res.json(word))
  .catch(next)
})