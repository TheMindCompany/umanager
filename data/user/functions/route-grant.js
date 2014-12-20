var backURL;

module.exports.isUserType = function (req){
	return req.session.user.type;
};

module.exports.isUser = function (req, res, next){
	if(req.session.user.type === 'guest'){
		backURL=req.header('Referer') || '/';
		return res.redirect(backURL);
	}
	return next();
};

function isAdmin(req){
	if (req.session.user.type === 'admin'){
		return true;
	}
	return false;
}

function isTeacher(req){
	if (req.session.user.type === 'teacher'){
		return true;
	}
	return false;
}

function isStudent(req){
	if (req.session.user.type === 'student'){
		return true;
	}
	return false;
}

module.exports.Admin = function (req, res, next){
	if(!isAdmin(req)){
		backURL=req.header('Referer') || '/';
		return res.redirect(backURL);
	}
	return next();
};

module.exports.Teacher = function (req, res, next){
	if(!isTeacher(req)){
		backURL=req.header('Referer') || '/';
		return res.redirect(backURL);
	}
	return next();
};

module.exports.Student = function (req, res, next){
	if(!isStudent(req)){
		backURL=req.header('Referer') || '/';
		return res.redirect(backURL);
	}
	return next();
};

module.exports.AdminTeacher = function (req, res, next){
	if(!(isAdmin(req) || isTeacher(req))){
		backURL=req.header('Referer') || '/';
		return res.redirect(backURL);
	}
	return next();
};

module.exports.StudentTeacher = function (req, res, next){
	if(!(isTeacher(req) || isStudent(req))){
		backURL=req.header('Referer') || '/';
		return res.redirect(backURL);
	}
	return next();
};

module.exports.StudentAdmin = function (req, res, next){
	if(!(isAdmin(req) || isStudent(req))){
		backURL=req.header('Referer') || '/';
		return res.redirect(backURL);
	}
	return next();
};

module.exports.StudentTeacherAdmin = function (req, res, next){
	if(!(isAdmin(req) || isTeacher(req) || isStudent(req))){
		backURL=req.header('Referer') || '/';
		return res.redirect(backURL);
	}
	return next();
};