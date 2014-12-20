var getUserObj = function(req){
	var name     = req.body.name     ? req.body.name     : undefined;
	var email    = req.body.email    ? req.body.email    : undefined;
	var password = req.body.password ? req.body.password : undefined;
	
	return {
			name:     name,
			email:    email,
			password: password,
			type:     'user'
		};
};
var getNameObj = function(req){
	var detail = {};
    var first  = req.body.first    ? req.body.first    : undefined;
    var last   = req.body.last     ? req.body.last     : undefined;

   	detail.id = req.session.user.id;
    if(first){
    	detail.first = first;
    }
    if(last){
    	detail.last = last;
    }
    
	return detail;
};
var getDetailObj = function(req){
	var detail = {};
    var id     = req.body.detailId ? req.body.detailId : undefined; 
    var birth  = req.body.birth    ? req.body.birth    : undefined;
    var gender = req.body.gender   ? req.body.gender   : undefined;

    if(id){
    	detail.id = id;
    }
    if(birth){
    	detail.birth = birth;
    }
    if(gender){
    	detail.gender = gender;
    }

	return detail;
};


var getHomeContactObj = function(req){
	var contact = {};
	contact.type = 'home';
	
    var id      = req.body.homeId      ? req.body.homeId       : undefined;
    var phone   = req.body.phonehome   ? req.body.phonehome    : undefined;
    var addr    = req.body.addrhome    ? req.body.addrhome     : undefined;
    var addr_2  = req.body.addr_2home  ? req.body.addr_2home   : undefined;
    var city    = req.body.cityhome    ? req.body.cityhome     : undefined;
    var state   = req.body.statehome   ? req.body.statehome    : undefined;
    var zip     = req.body.ziphome     ? req.body.ziphome      : undefined;

    if(id){
    	contact.id = id;
    }
    if(phone){
    	contact.phone = phone;
    }
    if(addr){
    	contact.addr = addr;
    }
    if(addr_2){
    	contact.addr_2 = addr_2;
    }
    if(city){
    	contact.city = city;
    }
    if(state){
    	contact.state = state;
    }
    if(zip){
    	contact.zip = zip;
    }
    
	return contact;
};

var getContactsObj = function(req){
	var contacts = [];
	
	contacts.push(getHomeContactObj(req));
	
	return contacts;
};

module.exports.getAuthenticationObj = function(req){		
	var user     = req.body.user     ? req.body.user     : undefined;
	var password = req.body.password ? req.body.password : undefined;
	var remember = req.body.remember ? true : false;
	
	return {
			user:     user,
			password: password,
			remember: remember
		};
};

module.exports.getRegistrationObj = function(req){
	var registration = {};
	var user = getUserObj(req);
	var detail = getDetailObj(req);
	var contacts = getContactsObj(req);
	
	registration.user = user;
	registration.detail = detail;
	registration.contact = contacts;
	
	return registration;
};

module.exports.getUserObj = function(req){
	var user = {};
	var detail = getDetailObj(req);
	var contacts = getContactsObj(req);
	
	user.user = getNameObj(req);
	console.log(user.user, detail, contacts);
	
	user.detail = detail;
	user.contact = contacts;
	
	return user;
};


module.exports.getNewAuthObj = function(req){
	var auth = {};
    var id      = req.body.userId;
    var type    = req.body.auth_type;	
    var active  = req.body.auth_active ? true : false;	
    auth.id		= id;
    auth.type   = type;
    auth.active = active;
    
	return auth;
};

module.exports.getSeachObj = function(req){
	var user   = {};
    var id     = req.body.userId ? req.body.userId : undefined;
    var type   = req.body.name   ? req.body.name   : undefined;
    var email  = req.body.email  ? req.body.email  : undefined;	
    var first  = req.body.first  ? req.body.first  : undefined;
    var middle = req.body.middle ? req.body.middle : undefined;
    var last   = req.body.last   ? req.body.last   : undefined;	

    if(id){
      user.user.id = id;
    }
    if(type){
      user.user.type = type;
    }
    if(email){
      user.user.email = email;
    }
    if(first){
      user.detail.first = first;
    }
    if(middle){
      user.detail.middle = middle;
    }
    if(last){
      user.detail.last = last;
    }
    
	return user;
};