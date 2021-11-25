'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
  let homeList =  await this.ctx.service.home.homeList()
  // let peopleList =  await this.ctx.service.people.peopleList()
    console.log(homeList)
    const { ctx } = this;
    await ctx.render('index',{homeList})
  }
  async user(){
    const { ctx } = this;
    console.log(ctx.params.id)
    ctx.body = ctx.params.id;
  }
  async homePost(){
    const { ctx } = this;
    console.log(ctx)
    ctx.body = 1;
  }

}

module.exports = HomeController;
