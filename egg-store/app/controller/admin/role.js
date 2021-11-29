var BaseController =require('./base.js');

module.exports = app => {
 
  class Controller extends BaseController {
    async index(){
      await this.ctx.render('admin/role/index');
    }
    async add(){
      await this.ctx.render('admin/role/add');
    }
    async edit(){
      await this.ctx.render('admin/role/edit');
    }
    async del(){
      this.ctx.body = '删除角色'
    }
  }
  return Controller
}
