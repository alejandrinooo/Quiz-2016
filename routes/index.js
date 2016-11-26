var express = require('express');
var router = express.Router();
var quizcontroller=require('../controllers/quiz_controller');
var commentController= require('../controllers/comment_controller');
var sessionController=require('../controllers/session_controller');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: ' quiz 2016' });
});

router.param('quizid', quizcontroller.load);
router.param('commentId',commentController.load);


router.get('/login', sessionController.new);
router.post('/login',sessionController.create);
router.get('/logout',sessionController.destroy);


router.get('/quizes', quizcontroller.index);
router.get('/quizes/:quizid(\\d+)', quizcontroller.show);
router.get('/quizes/:quizid(\\d+)/answer', quizcontroller.answer);
router.get('/quizes/new',   sessionController.loginRequired, quizcontroller.new);

router.get('/quizes/:quizid(\\d)/edit',  sessionController.loginRequired , quizcontroller.edit);
router.post('/quizes/create',  sessionController.loginRequired , quizcontroller.create);
router.put('/quizes/:quizid(\\d+)',  sessionController.loginRequired , quizcontroller.update);
router.delete('/quizes/:quizid(\\d+)',  sessionController.adminRequired,quizcontroller.destroy);

router.get('/quizes/:quizid(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizid(\\d+)/comments', commentController.create);
router.get('/quizes/:quizid(\\d+)/comments/:commentId(\\d+)/publish',
	sessionController.loginRequired,commentController.publish);

module.exports = router;

