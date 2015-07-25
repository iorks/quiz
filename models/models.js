var path = require('path');

//Cargar modelo ORM 
var Sequelize = require('sequelize');

//Usar BD SQLite
var sequelize = new Sequelize(null,null,null,
						{ dialect: "sqlite", storage: "quiz.sqlite"}
					);

//Importar la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

exports.Quiz = Quiz;  //exportar la definicion de la tabla Quiz

//sequelize.sync() crea e inicializa la tabla de preguntas en DB
sequelize.sync().success(function(){
	//success(..) ejecuta el manejador una vez creada la tabla
	Quiz.count().success(function(count){
		if (count === 0){   // la tabla se inicializa solo si esta vacia
			Quiz.create({pregunta: 'Capital de Italia',
						 respuesta: 'Roma'
						})
			Quiz.create({pregunta: 'Capital de Portugal',
						 respuesta: 'Lisboa'
						})
					.success(function(){console.log('Base de datos inicializada')});
		}
	});
});