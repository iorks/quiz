var path = require('path');

//Cargar modelo ORM 
var Sequelize = require('sequelize');

//Usar BD SQLite
var sequelize = new Sequelize(null,null,null,
						{ dialect: "sqlite", storage: "quiz.sqlite"}
					);

//Importar la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

//Importar la definición de la tabla Comment en comment.js
var Comment = sequelize.import(path.join(__dirname,'comment'));

Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

exports.Quiz = Quiz;  //exportar la definicion de la tabla Quiz
exports.Comment = Comment;

//sequelize.sync() crea e inicializa la tabla de preguntas en DB
sequelize.sync().then(function(){
	//then(..) ejecuta el manejador una vez creada la tabla
	Quiz.count().then(function(count){
		if (count === 0){   // la tabla se inicializa solo si esta vacia
			Quiz.create({pregunta: 'Capital de Italia',
						 respuesta: 'Roma',
						 tematica: 'ocio'
						})
			Quiz.create({pregunta: 'Capital de Portugal',
						 respuesta: 'Lisboa',
						 tematica: 'ocio'
						})
			Quiz.create({pregunta: 'Mejor estación del año para ir a la playa',
						 respuesta: 'Verano',
						 tematica: 'ocio'
						})
			Quiz.create({pregunta: 'Fruta más típica de las Islas Canarias',
						 respuesta: 'Plátano',
						 tematica: 'ciencia'
						})
			Quiz.create({pregunta: 'Color de un limón',
						 respuesta: 'Amarillo',
						 tematica: 'ciencia'
						})
			Quiz.create({pregunta: 'Bebida incolora, inodora e insabora',
						 respuesta: 'Agua',
						 tematica: 'ciencia'
						})
			Quiz.create({pregunta: 'País más rico de Europa',
						 respuesta: 'Alemania',
						 tematica: 'humanidades'
						})
			Quiz.create({pregunta: 'Ciudad dónde se encuentra al torre Eiffel',
						 respuesta: 'París',
						 tematica: 'tecnologia'
						})
			Quiz.create({pregunta: 'Desierto más famoso del mundo',
						 respuesta: 'Sahara',
						 tematica: 'humanidades'
						})
			Quiz.create({pregunta: 'País con más población del mundo',
						 respuesta: 'China',
						 tematica: 'tecnologia'
						})
					.then(function(){console.log('Base de datos inicializada')});
		}
	});
});