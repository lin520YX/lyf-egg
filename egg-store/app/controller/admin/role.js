var BaseController = require('./base.js')

module.exports = (app) => {
    class Controller extends BaseController {
        async index() {
            // 查询所有
            let list = await this.ctx.model.Role.find({})
            await this.ctx.render('admin/role/index', {
                list: list || [],
            })
        }
        async add() {
            await this.ctx.render('admin/role/add')
        }
        async doAdd() {
            const { title, description } = this.ctx.request.body

            var role = new this.ctx.model.Role({ title, description })

            await role.save() //注意

            await this.success('/admin/role', '增加角色成功')
        }
        async edit() {
            const id = this.ctx.query.id
            let result = await this.ctx.model.Role.findById({ _id: id })
            await this.ctx.render('admin/role/edit', {
                data: result,
            })
        }
        async doEdit() {
            const { _id, title, description } = this.ctx.request.body
            await this.ctx.model.Role.updateOne({ _id }, { title, description })
            await this.success('/admin/role', '修改角色成功')
        }
        async auth() {
            const { id: role_id } = this.ctx.request.query
            let list = await this.ctx.model.Access.aggregate([
                {
                    $lookup: {
                        from: 'access',
                        localField: '_id',
                        foreignField: 'module_id',
                        as: 'items',
                    },
                },
                {
                    $match: { module_id: '0' },
                },
            ])
            // 查询所选中的
            let tempNodes = []
            let accessNodes = await this.ctx.model.RoleAccess.find({ role_id })
            console.log('accessNodes',accessNodes)
            accessNodes.forEach((item) => {
                tempNodes.push(item.access_id.toString())
            })
            for (let i = 0; i < list.length; i++) {
                if (tempNodes.includes(list[i]._id.toString())) {
                    list[i].checked = true
                }
                if (list[i].items.length > 0) {
                    for (var j = 0; j < list[i].items.length; j++) {
                        if (
                            tempNodes.includes(list[i].items[j]._id.toString())
                        ) {
                            list[i].items[j].checked = true
                        }
                    }
                }
            }            
            await this.ctx.render('admin/role/auth', {
                role_id: role_id,
                list,
            })
        }
        async doAuth() {
            const { role_id, access_node } = this.ctx.request.body
            // 删除他下面所有的权限
            await this.ctx.model.RoleAccess.deleteMany({ role_id })
            for (let i = 0; i < access_node.length; i++) {
                this.ctx.model.RoleAccess.create({
                    role_id,
                    access_id: access_node[i],
                })
            }
            await this.success('/admin/role/auth?id=' + role_id, '授权成功')
        }
    }
    return Controller
}
