'use strict';

function _(app, azbn) {
	
	app.log.info(__filename);
	
	return function(req, res) {
		
		if(req.query.code) {
			
			//azbn.echo('Get code: ' + req.query.code);
			//res.send('ok: ' + req.query.code);
			
			var yandex_app = app.loadJSON('../config/yandex-app');
			
			azbn.mdl('web/http').r('POST', 'https://oauth.yandex.ru/token', {
				grant_type : 'authorization_code',
				code : req.query.code,
				client_id : yandex_app.app.id,
				client_secret : yandex_app.app.secret,
			}, function(error, response, body){
				
				//console.log(body);
				
				if(error) {
					
					res.send(error);
					
				} else {
					
					req.session.access = JSON.parse(body);
					
					res.render('page/codefromyandex', {
						html : {
							head : {
								title : 'Получен токен доступа',
							},
						},
						data : {
							access : req.session.access,
						},
					});
					
				}
				
				//res.redirect(301, '/');
				
			});
			
		} else {
			
			res.send(req.query);
			
		}
		
	};
}

module.exports = _;