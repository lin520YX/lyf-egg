$(function(){
	app.init();
})


var app={


	init:function(){
		this.toggleAside();
		this.deleteConfirm()
	},
	deleteConfirm:function(){
		$('.delete').click(()=>{
			let flag = window.confirm('您确定要删除吗')
			return flag
		})
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
	},
	editNum:function(el,model,attr,id){
		const val = $(el).html();
		const input = $("<input value='' />")
		$(el).html(input)
		$(input).trigger('focus').val(val)
		// 阻止冒泡
		$(input).click(()=>{
			return false
		})
		// 给span赋值
		$(input).blur(function(){
			$(el).html($(this).val())
			$.ajax({
				url: '/admin/editNum',
				data: {model:model,attr:attr,id:id,num:$(this).val()},
				success: (e)=>{
					if(e.success){
						alert('排序修改成功')
					}
				}});
		})
	}
}

