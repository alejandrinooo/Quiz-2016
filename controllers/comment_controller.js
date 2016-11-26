var models = require('../models/models.js');


exports.load = function(req,res,next,commentId){
	models.Comment.findById(commentId)
	.then(function(comment){
	if(comment){
		req.comment=comment;
		next();
	}else{
		next(new Error('No existe CommentId='+commentId))
	}
	}).catch(function(error){next(error)});
};



exports.new = function(req, res) {

	res.render('comments/new.ejs', {
		quizid: req.params.quizid,
		errors: []
	});

}

exports.create = function(req, res) {


	var comment = models.Comment.build(
		{
			texto: req.body.comment.texto,
			quizId: req.params.quizid
		});
	comment
		.validate()
		.then(function(err) {
				if (err) {
					res.render('comments/new.ejs', {
						comment: comment,
						quizid: req.params.quizid,
						errors: err.errors
					});
				} else {

					comment.save()
						.then(function() {
							res.redirect('/quizes/' + req.params.quizid)
						})
				}

			}

		).catch(function(error) {
			next(error)
		});

};

exports.publish=function(req,res){
	req.comment.publicado=true;

	req.comment.save({fields: ["publicado"]})
	-then(function(){res.redirect('/quizes/'+req.params.quizid);})
	.catch(function(error){next(error)});
}