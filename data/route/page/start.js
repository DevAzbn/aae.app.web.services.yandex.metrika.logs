'use strict';

function _(app, azbn) {
	
	app.log.info(__filename);
	
	return function(req, res) {
		
		res.render('page/start', {
			html : {
				head : {
					title : 'Выполните подключение к Yandex OAuth',
				},
			},
			data : {
				app : app.loadJSON('../config/yandex-app'),
			},
		});
		
	};
}

module.exports = _;