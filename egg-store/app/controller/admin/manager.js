module.exports = app => {
  class Controller extends app.Controller {
    async index(){
      await this.ctx.render('admin/manager/index')
    }
    async add(){
      this.ctx.body = '增加管理员'
    }
    async edit(){
      this.ctx.body = '编辑管理员'
    }
  }
  return Controller
}
