module.exports = app => {
  class Controller extends app.Controller {
    async index(){
      this.ctx.body = '权限列表'
    }
    async add(){
      this.ctx.body = '增加权限'
    }
    async edit(){
      this.ctx.body = '编辑权限'
    }
  }
  return Controller
}
