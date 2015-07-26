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

// GET /quizes/new
exports.new = function(req, res){
	var quiz = models.Quiz.build(	// crea un objeto quiz
		{pregunta: "", respuesta: ""}
	);
	res.render('quizes/new', {quiz: quiz});
};

// GET /quizes/create
exports.create = function(req, res){
	var quiz = models.Quiz.build(req.body.quiz);

	//guarda en BD los campos pregunta y respuesta de quiz
	quiz.save({fields: ["pregunta", "respuesta"]}).then(
		function(){
			res.redirect('/quizes');
		});	  // redireccion HTTP (URL relativo) listado de preguntas
};

// GET /quizes
exports.index = function(req, res){

	var search = req.query.search? req.query.search: '';

	//sustituimos espacios por %, haciendo trim previamente
	var find = ' ';
	var re = new RegExp(find, 'g');
	var searchRep = '%' + search.trim().replace(re, '%') + '%';
	//console.log('_searchRep: /' + searchRep + '/');

	models.Quiz.findAll({
		where: ["pregunta like ?", searchRep],
		order: [['pregunta', 'ASC']]
		}).success(
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
		if (req.query.respuesta.toLowerCase() === quiz.respuesta.toLowerCase()){
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