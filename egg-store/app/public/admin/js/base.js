$(function(){
	app.init();
})


var app={


	init:function(){
		this.toggleAside();

	},
	toggleAside:function(){
			$('.aside h4').click(function(){
				$(this).siblings('ul').slideToggle();
			})
	},

	changeStatus:function(el,model,attr,id){
		$.ajax({
			url: '/admin/changeStatus',
			data: {model:model,attr:attr,id:id},
			success: (e)=>{
				if (e.success) {
					if (el.src.indexOf('yes') != -1) {
						el.src = '/public/admin/images/no.gif';
					} else {
						el.src = '/public/admin/images/yes.gif';
					}
	
				}
			}});
	}
}

