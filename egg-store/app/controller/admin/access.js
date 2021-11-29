module.exports = app => {
  class Controller extends app.Controller {
    async index(){
      await this.ctx.render('admin/access/index');
    }
    async add(){
      await this.ctx.render('admin/access/add');
    }
    async edit(){
      await this.ctx.render('admin/access/edit');
    }
  }
  return Controller
}
