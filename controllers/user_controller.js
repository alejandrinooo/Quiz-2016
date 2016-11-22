var users = { admin: {id:1, username: "alejandro", password:"12345"},

			 silvia: {id:2, username: "silvia", password:"6789"}

			};

exports.autenticar = function(login,password,callback){
	if(users[login]){
		if(password===users[login].password){
			callback(null, users[login]);
		}
		else{callback(new Error('password erroneo'));}
	} else{callback(new Error('no existe el usuario'));}
};