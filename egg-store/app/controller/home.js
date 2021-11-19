'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
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
