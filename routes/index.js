var express = require('express');
var router = express.Router();
var quizcontroller=require('../controllers/quiz_controller');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: ' Quiz 2016' });


});

router.get('/quizes/question', quizcontroller.question);
router.get('/quizes/answer' ,quizcontroller.answer);

module.exports = router;
