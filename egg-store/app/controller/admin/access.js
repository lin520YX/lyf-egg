var BaseController = require('./base.js')

module.exports = (app) => {
    class Controller extends BaseController {
        async index() {
            // $match - 用于过滤数据，只输出符合条件的文档
            let list = await this.ctx.model.Access.aggregate([
                {
                    $lookup:{
                        from:'access',
                        localField:'_id',
                        foreignField:'module_id',
                        as:'items'
                    }
                },{
                    $match:{'module_id':'0'}
                }
            ])
            await this.ctx.render('admin/access/index',{list})
        }
        async add() {
            var result = await this.ctx.model.Access.find({ module_id: '0' })
            await this.ctx.render('admin/access/add', {
                moduleList: result,
            })
        }
        async doAdd() {
            let addResult = this.ctx.request.body
            let module_id = addResult.module_id

            //菜单  或者操作
            // 保证菜单操作的id和模块的是一个类型
            if (module_id != 0) {
                addResult.module_id = this.app.mongoose.Types.ObjectId(module_id)
            }
            await this.ctx.model.Access.create(addResult)
            await this.success('/admin/access', '增加权限成功')
        }
        async edit() {
            await this.ctx.render('admin/access/edit')
        }
    }
    return Controller
}
