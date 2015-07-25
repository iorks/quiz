var models = require('../models/models.js')


//Autoload - factoriza el codigo si la ruta incluye :quizId
exports.load = function(req, res, next, quizId){
	models.Quiz.find(quizId).then(
		function(quiz){
			if (quiz) {
				req.quiz = quiz;
				next();
			}
			else { next(new Error('No existe quizId=' + quizId));}
	}).catch(function(error) { next(error); });
};

// GET /quizes
exports.index = function(req, res){
	models.Quiz.findAll().success(
		function(quizes){
			res.render('quizes/index', {quizes: quizes});
	});

	// no se puede aplicar catch a metod success
	//.catch(function(error) { next(error); });
};


// GET /quizes/:id
exports.show = function(req, res){
	models.Quiz.find(req.params.quizId).then(function(quiz){
			res.render('quizes/show', {quiz: quiz});
		});
};

// GET /quizes/:id/answer
exports.answer = function(req, res){
	models.Quiz.find(req.params.quizId).then(function(quiz){
		if (req.query.respuesta === quiz.respuesta){
			res.render('quizes/answer', 
				{quiz: quiz, respuesta: 'Correcto'});
		}
		else {
			res.render('quizes/answer', 
				{quiz: quiz, respuesta: 'Incorrecto'});
		}
	});
};

// GET /author
exports.author = function(req, res){
	res.render('author', {autor: 'Jorge Benítez'});
};