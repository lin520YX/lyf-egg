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
    async del(){
      this.ctx.body = '删除角色'
    }
  }
  return Controller
}
