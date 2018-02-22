const router = require('express').Router();
const {Group} = require('../db/models');
module.exports = router;

// router.post('/', (req, res, next) => {
//   Group.create(req.body)
//   .then(group => res.json(group))
//   .catch(next)
// })
router.post('/:dictId/:wordId', (req, res, next) => {
  Group.create({dictionaryId: parseInt(req.params.dictId, 10), wordId: parseInt(req.params.wordId, 10)})
  .then(group => res.json(group))
  .catch(next)
})
router.get('/', (req, res, next) => {
  Group.findAll()
  .then(group => res.json(group))
  .catch(next)
})

router.delete('/:dictId/:wordId', (req, res, next) => {
  Group.destroy({where: {dictionaryId: req.params.dictId, wordId: req.params.wordId}})
  .then(group => res.json(group))
  .catch(next)
})
