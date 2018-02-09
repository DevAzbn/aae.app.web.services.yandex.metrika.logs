'use strict';

var azbn = new require(__dirname + '/../../../../../../../../../../../../../system/bootstrap')({
	
});

var app = azbn.loadApp(module, '/../../../../../../');

var _data = azbn.mdl('process/child').parseCliData(process.argv);

//console.log(_data);

var _at = '';

if(_data.session.access) {
	
	_at = _data.session.access.access_token;
	
} else if(_data.post.access_token) {
	
	_at = _data.post.access_token;
	
}

var app_cfg = app.loadJSON('../config/yandex-app');

var req_url = app_cfg.metrika.base_url + '/management/v1/counter/' + _data.post.counter_id + '/goals?access_token=' + _at;

azbn.mdl('web/http').r('GET', req_url, {
	
}, function(error, response, body){
	
	if(error) {
		
		process.send({
			kill_child : 1,
			app_fork : 1,
			error : error,
		});
		
	} else {
		
		var res = JSON.parse(body);

		app.saveJSON('json/' + _data.post.counter_id + '_goals', res);

		process.send({
			kill_child : 1,
			app_fork : 1,
			response : res,
		});
		
	}
	
});