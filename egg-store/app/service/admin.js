module.exports = (app) => {
    const url = require('url')
    class Service extends app.Service {
        async checkAuth() {
            const userInfo = this.ctx.session.userinfo
            console.log('userInfo',userInfo)
            const role_id = userInfo.role_id
            // 当前用户的访问地址
            const { pathname } = url.parse(this.ctx.request.url)
            const ignoreUrls = []
            if (userInfo.is_super == 1 || ignoreUrls.includes(pathname)) {
                return true
            }
            let roleAccessList = await this.ctx.model.RoleAccess.find({
                role_id,
            })
            let roleAccessIds = []
            roleAccessList.forEach((item) => {
                roleAccessIds.push(item.access_id.toString())
            })
            let role = await this.ctx.model.Access.findOne({ url: pathname })
            if (role) {
                if (roleAccessIds.includes(role._id.toString())) {
                    return true
                }
                return false
            }
            return false
        }
    }
    return Service
}
