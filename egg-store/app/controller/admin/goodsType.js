var BaseController = require('./base.js')

module.exports = app => {
  class Controller extends BaseController {
    async index(){
      const list = await this.ctx.model.GoodsType.find({})
      await this.ctx.render('admin/goodsType/index',{
        list
      })
    }
    async add(){
      await this.ctx.render('admin/goodsType/add')
    }
    async doAdd(){
      const {title,description} = this.ctx.request.body
      await this.ctx.model.GoodsType.create({
        title,description
      })
      await this.success('/admin/goodsType','增加商品类型成功'); 
    }
    async edit(){
      let {id:_id} = this.ctx.query
      let list = await this.ctx.model.GoodsType.findOne({_id})
      await this.ctx.render('admin/goodsType/edit',{
        list
      })
    }
    async doEdit(){
      const {_id,title,description} = this.ctx.request.body
      await this.ctx.model.GoodsType.updateOne({_id},{title,description})
      await this.success('/admin/goodsType','编辑类型成功');   
    }
  }
  return Controller
}
