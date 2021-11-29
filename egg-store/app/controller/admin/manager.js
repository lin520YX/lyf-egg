module.exports = app => {
  class Controller extends app.Controller {
    async index(){
      await this.ctx.render('admin/manager/index');
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
