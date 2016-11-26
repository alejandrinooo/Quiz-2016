module.exports = function(sequelize, DataTypes) {
	return sequelize.define(
	'comments', 
	{ texto:{ 
		type: DataTypes.STRING,
		validate: {notEmpty: {msg: "--> Falta comentario"}}
	  },
	  publicado: {
	  	type: DataTypes.BOOLEAN,
	  	defaultValue:false
	  }
	}
	);
}