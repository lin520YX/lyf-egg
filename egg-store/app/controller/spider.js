module.exports = app => {
  class Controller extends app.Controller {
    // http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=1

    // http://www.phonegap100.com/appapi.php?a=getPortalArticle&aid=123
    async index(){
     let res = await this.ctx.curl(this.config.api+'a=getPortalList&catid=20&page=1')
     var data=res.data.toString();
     await this.ctx.render('newList',{list:JSON.parse(data).result})
    }
    async newscontent(){
      let res = await this.ctx.curl(this.config.api+'a=getPortalArticle&aid='+this.ctx.query.aid)
      var data=res.data.toString();
      var data=res.data.toString();
      await this.ctx.render('newscontent',{content:JSON.parse(data).result[0].content})
    }
  }
  return Controller
}
