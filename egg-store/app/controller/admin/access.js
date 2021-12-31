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
            console.log(result)
            await this.ctx.render('admin/access/add', {
                moduleList: result,
            })
        }
        async doAdd() {
            let addResult = this.ctx.request.body
            let module_id = addResult.module_id
            if(module_id==0&&addResult.type!=1){
                this.error('/admin/access','顶级模块类型只能为模块');
                return
            }
            //菜单  或者操作
            // 保证菜单操作的id和模块的是一个类型
            if (module_id != 0) {
                addResult.module_id = this.app.mongoose.Types.ObjectId(module_id)
            }
            await this.ctx.model.Access.create(addResult)
            await this.success('/admin/access', '增加权限成功')
        }
        async edit() {
            let {id:_id} = this.ctx.request.query
            let list = await this.ctx.model.Access.findOne({_id})
            let moduleList =  await this.ctx.model.Access.find({module_id:'0'})
            console.log(list,
                moduleList)
            await this.ctx.render('admin/access/edit',{
                list,
                moduleList
            })
        }
        async doEdit(){
            let result = this.ctx.request.body
            let {id:_id,module_id}= result
            // 类型转换
            if(module_id!=0){
                result.module_id = this.app.mongoose.Types.ObjectId(module_id)
            }
            await this.ctx.model.Access.updateOne({_id},{...result})
            await this.success('/admin/access', '修改权限成功')
        }
    }
    return Controller
}
