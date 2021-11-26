module.exports = app => {
  class Controller extends app.Controller {
    async index() {    
      console.log(1111)

      //this.ctx.csrf  用户访问这个页面的时候生成一个密钥

      await this.ctx.render('post',{

        csrf:this.ctx.csrf
        
      });
    }
    async add() {        
      console.log(this.ctx.request.body); ///{ username: '1212', password: '212' }
  }
  }
  return Controller
}
