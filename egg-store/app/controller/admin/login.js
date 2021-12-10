var BaseController =require('./base.js');

module.exports = app => {
 
  class Controller extends BaseController {
    async index(){
      console.log('this.ctx.csrf',this.ctx.csrf)
      await this.ctx.render('admin/login')
    }
    async doLogin(){
      const {username,password,code} = this.ctx.request.body
      let md5password = await this.service.tools.md5(password)
      if(code&&code.toLowerCase()===this.ctx.session.code.toLowerCase()){
        // if(username == '00204'){
        //   console.log(1111)
        //   await this.ctx.model.Admin.create({username,password:md5password,is_super:1})
        //   return 
        // }
        let result = await this.ctx.model.Admin.find({username,password:md5password})
        console.log('result',result)
        if(result.length>0){
            //登录成功

            // 1、保存用户信息
            this.ctx.session.userinfo=result[0];

            //2、跳转到用户中心
            this.ctx.redirect('/admin/manager');
        }else{
          await this.error('/admin/login','用户名或者密码不对');
        }
      }else{
        //注意：异步和  await
        await this.error('/admin/login','验证码错误');
      }

    }
    async loginOut() {
      this.ctx.session.userinfo=null;
      this.ctx.redirect('/admin/login');
    }
  }
  return Controller
}
