var express = require('express');
var router = express.Router();
var quizcontroller=require('../controllers/quiz_controller');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: ' quiz 2016' });
});

router.param('quizid', quizcontroller.load);


router.get('/quizes', quizcontroller.index);
router.get('/quizes/:quizid(\\d+)', quizcontroller.show);
router.get('/quizes/:quizid(\\d+)/answer', quizcontroller.answer);
router.get('/quizes/new', quizcontroller.new);
router.get('/quizes/:quizid(\\d)/edit', quizcontroller.edit);
router.post('/quizes/create', quizcontroller.create);
router.put('/quizes/:quizid(\\d+)', quizcontroller.update);

module.exports = router;

