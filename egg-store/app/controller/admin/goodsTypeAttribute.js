var BaseController = require('./base.js')

module.exports = (app) => {
    class Controller extends BaseController {
        // 属性列表
        async index() {
            // 分类id eg 手机这个分类的id
            const cate_id = this.ctx.query.id
            let list = await this.ctx.model.GoodsTypeAttribute.aggregate([
                {
                    $lookup: {
                        from: 'goods_type',
                        foreignField: '_id',
                        localField: 'cate_id',
                        as: 'goods_type',
                    },
                },
                {
                    $match: {
                        cate_id: this.app.mongoose.Types.ObjectId(cate_id),
                    },
                },
            ])
            await this.ctx.render('admin/goodsTypeAttribute/index', {
                list,
                cate_id,
            })
        }
        async add() {
            const cate_id = this.ctx.request.query.id
            const goodsTypes = await this.ctx.model.GoodsType.find({})
            await this.ctx.render('admin/goodsTypeAttribute/add', {
                cate_id,
                goodsTypes: goodsTypes,
            })
        }
        async doAdd() {
            await this.ctx.model.GoodsTypeAttribute.create(
                this.ctx.request.body
            )
            await this.success(
                '/admin/goodsTypeAttribute?id=' + this.ctx.request.body.cate_id,
                '增加商品类型属性成功'
            )
        }
        async edit() {
            let { id: _id } = this.ctx.query
            let list = await this.ctx.model.GoodsTypeAttribute.findOne({ _id })
            let goodsTypes = await this.ctx.model.GoodsType.find({})
            await this.ctx.render('admin/goodsTypeAttribute/edit', {
                list,
                goodsTypes,
                cate_id:list.cate_id
            })
        }
        async doEdit() {
            const { id:_id } = this.ctx.request.body
            
            await this.ctx.model.GoodsTypeAttribute.updateOne({_id},this.ctx.request.body);

          
            await this.success('/admin/goodsTypeAttribute?id='+this.ctx.request.body.cate_id,'修改商品类型属性成功');
        }
    }
    return Controller
}
