var BaseController =require('./base.js');

module.exports = app => {
 
  class Controller extends BaseController {
    async index(){
      // 查询所有
      let list = await this.ctx.model.Role.find({})
      await this.ctx.render('admin/role/index',{
        list:list||[]
      });
    }
    async add(){
      await this.ctx.render('admin/role/add');
    }
    async doAdd() {
      const {title,description} = this.ctx.request.body

      var role=new this.ctx.model.Role({title,description})
      
      await role.save();   //注意

      await this.success('/admin/role','增加角色成功');


    } 
    async edit(){
      const id = this.ctx.query.id
      let result = await this.ctx.model.Role.findById({_id:id})
      await this.ctx.render('admin/role/edit',{
        data:result
      });
    }
    async doEdit(){
      
      const {_id,title,description} = this.ctx.request.body
      await this.ctx.model.Role.updateOne({_id},{title,description})
      await this.success('/admin/role','修改角色成功'); 

    }
    async auth(){
      const {id:_id}= this.ctx.request.query
      let list =  await this.ctx.model.Access.aggregate([{
        $lookup:{
          from:'access',
          localField:'_id',
          foreignField:'module_id',
          as:'items'
        }
      },{
        $match:{module_id:'0'}
      }])
      await this.ctx.render('admin/role/auth',{
        role_id:_id,
        list
      });
    }
    async doAuth(){
      const {role_id,access_node} = this.ctx.request.body
      // 删除他下面所有的权限
      await this.ctx.model.RoleAccess.deleteMany({role_id})
      for(let i = 0;i<access_node.length;i++){
        this.ctx.model.RoleAccess.create({
          role_id,
          access_node:access_node[i]
        })
      }
      await this.success('/admin/role/auth?id='+role_id,"授权成功");
    }
  }
  return Controller
}
