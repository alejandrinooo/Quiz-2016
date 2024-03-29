var models=require('../models/models.js');


exports.load = function(req , res , next , quizid){


	models.Quiz.findOne({
		where: {id: Number(quizid)},
		include:[{model:models.Comment}]
	}).then(function(quiz){
			if(quiz){
			req.quiz = quiz;
			next();
		}else {next(new Error ('no existe quizid='+quizid));}
	}).catch(function(error){ next(error);
	});
}




exports.show =function(req,res){
	res.render('quizes/show',{quiz: req.quiz});
};



exports.answer = function(req,res){
	var resultado='incorrecto';
	if(req.query.respuesta===req.quiz.respuesta){
		
	
		resultado='correcto';
}
res.render('quizes/answer', { quiz: req.quiz, respuesta: resultado});;

};

exports.index=function(req,res){
	models.Quiz.findAll().then(
		function(quizes){
		res.render('quizes/index', {quizes:quizes, errors: []});
	}
	).catch(function(error){next(error);})
}

exports.new = function(req,res){
	var quiz=models.Quiz.build(

	{pregunta:"Pregunta", respuesta: "Respuesta"}
	);
	res.render('quizes/new', {quiz:quiz});
};

exports.create = function(req, res){

	var quiz=models.Quiz.build(req.body.quiz);

	quiz.validate().then(function(err){
			if(err){
				res.render('quizes/new', {quiz: quiz, errors: err.errors});

			}else{
				
				quiz.save({fields: ["pregunta", "respuesta"]}).then(function(){	
					res.redirect('/quizes')});
	
			
		}
	
	


	})
};

exports.edit = function(req,res){
	var quiz=req.quiz;

	res.render('quizes/edit', {quiz: quiz, errors: []});
};

exports.update=function(req,res){

	req.quiz.respuesta=req.body.quiz.respuesta;
	req.quiz.pregunta=req.body.quiz.pregunta;

	req.quiz
	.validate()
	.then(
		function(err){
			if(err){
				res.render('quizes/edit', {quizes: req.quiz, errors:err.errors});
			}else{
				req.quiz
				.save({fields: ["pregunta","respuesta"]})
				.then(function(){res.redirect('/quizes');});
			}


		}
		)
}

exports.destroy=function(req,res){

	req.quiz.destroy()
	.then(function(){res.redirect('/quizes')});	

};