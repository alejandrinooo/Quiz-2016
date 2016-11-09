module.exports = function(sequelize, DataTypes) {
	return sequelize.define(
	'quiz', 
	{ pregunta:{ 
		type: DataTypes.STRING,
		validate: {notEmpty: {msg: "--> Falta pregunta"}}
	  },
	  	respuesta:{
		type: DataTypes.STRING,
		validate: {notEmpty: {msg: "--> Falta pregunta"}}

	    }
	  }
	);
};