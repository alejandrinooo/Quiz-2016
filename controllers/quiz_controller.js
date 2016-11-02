var models=require('../models/models.js');
var counter=0;

exports.question =function(req,res){

	models.Quiz.findAll().then(function(quiz){

	res.render('quizes/question', {pregunta: quiz[0].pregunta});
})
};



exports.answer = function(req,res){


	models.Quiz.findAll().then(function(quiz){

	if(req.query.respuesta === quiz[0].respuesta){
		
		quiz[0].aciertos++;
		quiz[0].save().then(function(quiz){res.render('quizes/answer', {respuesta: 'correcto', aciertos: quiz.aciertos});});
	

	} else {

		quiz[0].fallos++;
		quiz[0].save().then(function(quiz){res.render('quizes/answer', {respuesta: 'Incorrecto', aciertos: quiz.aciertos});});
}
});
};