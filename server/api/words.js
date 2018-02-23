const router = require('express').Router();
const {Word} = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
  Word.findAll({ order: [
    ['word', 'ASC']
    ]})
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
  let {sentence, word, definition} = req.body;
  Word.create({sentence, word, definition})
  .then(pData => res.json(pData))
  .catch(next)
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
