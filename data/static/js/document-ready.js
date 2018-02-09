'use strict';

$(function() {
	
	if($('.ajax__counters-list').length > 0) {
		
		$('.ajax__counters-list')
			.empty()
			.each(function(index){
				
				var block = $(this);
				
				$.post('/api/v1/', {
					method : '/management/v1/counters'
				}, function(data){
					
					if(data.response) {
						
						if(data.response.counters) {
							
							for(var i = 0; i < data.response.counters.length; i++) {
								
								(function(c){
									
									var a = $('<a/>', {
										class : 'ajax__get-counter-goals',
										html : c.name + ' (' + c.site + ' ' + c.id + ')',
										href : '#download_goals',
									});

									a.attr('data-counter-id', c.id);

									var item = $('<div/>', {
										
									});

									a.appendTo(item);
									
									item.appendTo(block);
									
									console.dir(c);
									
								})(data.response.counters[i]);
								
							}
							
						}
						
					}
					
				});
				
			});
		
	}

	$(document.body).on('click.azbn7', '.ajax__get-counter-goals', null, function(event){
		event.preventDefault();

		var btn = $(this);
		var counter_id = btn.attr('data-counter-id') || 0;

		if(counter_id) {

			$.post('/api/v1/', {
				method : '/management/v1/counter/goals',
				counter_id : counter_id,
			}, function(data){
				
				if(data && data.response && data.response.goals) {
					
					console.log(data.response.goals);

					alert('Цели (' + data.response.goals.length + ') выведены в консоль');
					
				}
				
			});

		}

	});
	
});