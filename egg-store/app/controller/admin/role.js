module.exports = app => {
  class Controller extends app.Controller {
    async index(){
      this.ctx.body = '角色列表' }
    async add(){
      this.ctx.body = '增加角色'
    }
    async edit(){
      this.ctx.body = '编辑角色'
    }
    async del(){
      this.ctx.body = '删除角色'
    }
  }
  return Controller
}
