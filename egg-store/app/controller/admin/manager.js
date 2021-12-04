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
      await this.ctx.render('admin/manager/add');
    }
    async edit(){
      await this.ctx.render('admin/manager/edit');
    }
  }
  return Controller
}
