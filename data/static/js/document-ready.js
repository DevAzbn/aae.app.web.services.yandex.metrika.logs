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
									
									var item = $('<div/>', {
										html : c.name + ' (' + c.site + ' ' + c.id + ')',
									});
									
									item.appendTo(block);
									
									console.dir(c);
									
								})(data.response.counters[i]);
								
							}
							
						}
						
					}
					
				})
				
			});
		
	}
	
});