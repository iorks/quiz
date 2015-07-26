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
			Quiz.create({pregunta: 'Mejor estación del año para ir a la playa',
						 respuesta: 'Verano'
						})
			Quiz.create({pregunta: 'Fruta más típica de las Islas Canarias',
						 respuesta: 'Plátano'
						})
			Quiz.create({pregunta: 'Color de un limón',
						 respuesta: 'Amarillo'
						})
			Quiz.create({pregunta: 'Bebida incolora, inodora e insabora',
						 respuesta: 'Agua'
						})
			Quiz.create({pregunta: 'País más rico de Europa',
						 respuesta: 'Alemania'
						})
			Quiz.create({pregunta: 'Ciudad dónde se encuentra al torre Eiffel',
						 respuesta: 'París'
						})
			Quiz.create({pregunta: 'Desierto más famoso del mundo',
						 respuesta: 'Sahara'
						})
			Quiz.create({pregunta: 'País con más población del mundo',
						 respuesta: 'China'
						})
					.success(function(){console.log('Base de datos inicializada')});
		}
	});
});