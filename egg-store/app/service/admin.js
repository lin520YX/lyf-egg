module.exports = (app) => {
    const url = require('url')
    class Service extends app.Service {
        async checkAuth() {
            const userInfo = this.ctx.session.userinfo
            console.log('userInfo',userInfo)
            const role_id = userInfo.role_id
            // 当前用户的访问地址
            const { pathname } = url.parse(this.ctx.request.url)
            const ignoreUrls = ['/admin/login','/admin/doLogin','/admin/verify','/admin/loginOut']
            console.log(pathname)
            console.log(ignoreUrls.includes(pathname))
            if (userInfo.is_super == 1 || !ignoreUrls.includes(pathname)) {
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
        async getAuthList(role_id){
            console.log('1111111')
            // 查询所有权限列表
            let allAuthList = await this.ctx.model.Access.aggregate([{
                $lookup:{
                    from:'access',
                    localField:'_id',
                    foreignField:'module_id',
                    as:'items'
                }
            },{
                $match:{
                    module_id:'0'
                }
            }])
            var accessResult=await this.ctx.model.RoleAccess.find({"role_id":role_id});
            var roleAccessArray=[];
            accessResult.forEach(function(value){
              
              roleAccessArray.push(value.access_id.toString());
            })
            allAuthList.forEach(item=>{
                if(roleAccessArray.includes(item._id.toString())){
                    item.checked = true
                }
                if(Array.isArray(item.items)){
                    item.items.forEach(childItem=>{
                        if(roleAccessArray.includes(childItem._id.toString())){
                            childItem.checked = true
                        }
                    })
                }
            })
            console.log(JSON.stringify(allAuthList))
            return allAuthList
        }
    }
    return Service
}
