var BaseController =require('./base.js');

module.exports = app => {
 
  class Controller extends BaseController {
    async index(){
      var list=(await this.ctx.model.Admin.aggregate([{
        $lookup:{
          from:'role',
          localField:'role_id',
          foreignField:'_id',
          as:'role'
        }      
      }]))||[]
      await this.ctx.render('admin/manager/index',{
        list
      });
    }
    async add(){
      var roleResult=await this.ctx.model.Role.find();
      await this.ctx.render('admin/manager/add',{
  
        roleResult
      });
    }
    async doAdd(){

      var addResult=this.ctx.request.body;
      addResult.password=await this.service.tools.md5(addResult.password);


      //判断当前用户是否存在

      var adminResult=await this.ctx.model.Admin.find({"username":addResult.username});

      
      if(adminResult.length>0){

          await this.error('/admin/manager/add','此管理员已经存在');
      }else{

        var admin=new this.ctx.model.Admin(addResult);

        admin.save();
        await this.success('/admin/manager','增加用户成功');
  

      }
    }
    async edit(){
      let {id:_id} = this.ctx.query
      let result = await this.ctx.model.Admin.findOne({_id})
      let roleResult = await this.ctx.model.Role.find({})
      // 获取的编辑的数据

      await this.ctx.render('admin/manager/edit',{result,roleResult});
    }
  }
  return Controller
}
