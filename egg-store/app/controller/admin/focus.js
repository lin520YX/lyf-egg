var BaseController = require('./base.js')

module.exports = (app) => {
    const pump = require('mz-modules/pump')
    const path = require('path')
    const fs = require('fs')
    class Controller extends BaseController {
        async index() {
            const list = await this.ctx.model.Focus.find({})
            await this.ctx.render('/admin/focus/index', { list })
        }
        async add() {
            await this.ctx.render('/admin/focus/add')
        }
        async doAdd() {
            let parts = this.ctx.multipart({ autoFields: true })
            let files = {}
            let stream
            while ((stream = await parts()) != null) {
                if (!stream.filename) {
                    break
                }
                let fieldname = stream.fieldname //file表单的名字
                //上传图片的目录
                let dir = await this.service.tools.getUploadFile(
                    stream.filename
                )
                // {
                //   uploadDir: 'app/public/admin/upload/20211231/1640941120602.png',
                //   saveDir: '/public/admin/upload/20211231/1640941120602.png'
                // }
                let target = dir.uploadDir
                let writeStream = fs.createWriteStream(target)

                await pump(stream, writeStream)
                files = {...files,...{[fieldname]: dir.saveDir}}
            }

             await this.ctx.model.Focus.create(
                {...files, ...(parts.field||{})}
            )
            await this.success('/admin/focus', '增加轮播图成功')
        }
        async edit(){
          const {id:_id} = this.ctx.query
          let list = await this.ctx.model.Focus.findOne({_id})
          await this.ctx.render('/admin/focus/edit',{list})
        }
        async doEdit(){
          let parts = this.ctx.multipart({ autoFields: true })
            let files = {}
            let stream
            while ((stream = await parts()) != null) {
                if (!stream.filename) {
                    break
                }
                let fieldname = stream.fieldname //file表单的名字
                //上传图片的目录
                let dir = await this.service.tools.getUploadFile(
                    stream.filename
                )
                // {
                //   uploadDir: 'app/public/admin/upload/20211231/1640941120602.png',
                //   saveDir: '/public/admin/upload/20211231/1640941120602.png'
                // }
                let target = dir.uploadDir
                let writeStream = fs.createWriteStream(target)

                await pump(stream, writeStream)
                files = {...files,...{[fieldname]: dir.saveDir}}
            }
            let {id:_id} = parts.field
            await this.ctx.model.Focus.updateOne({_id},
                {...files, ...(parts.field||{})}
            )
            await this.success('/admin/focus', '修改轮播图成功')
        }
        async multi() {
            // 多文件上传
            await this.ctx.render('/admin/focus/multi')
        }
        async doSingleUpload() {
            // enctype="multipart/form-data" 不能使用this.ctx.body.request 来接收post的数据
            const stream = await this.ctx.getFileStream()
            console.log(stream)
            // 目标文件 创建一个空文件
            const target =
                'app/public/admin/upload/' + path.basename(stream.filename)
            const writeStream = fs.createWriteStream(target)
            // 写入文件内容
            // 如果失败可以关闭流 不然浏览器会卡死
            await pump(stream, writeStream)
            this.ctx.body = {
                url: target,
                fields: stream.fields, //表单的其他数据
            }
        }
        async doMultiUpload() {
            // autoFields 可以将出了
            let files = []
            const parts = this.ctx.multipart({ autoFields: true })
            console.log(parts)
            let stream = ''
            while ((stream = await parts()) != null) {
                if (!stream.filename) return
                const filename = stream.filename.toLowerCase()
                const fieldname = stream.fieldname
                const target =
                    'app/public/admin/upload/' + path.basename(filename)
                const writeStream = fs.createWriteStream(target)
                await pump(stream, writeStream)
                files.push({
                    [fieldname]: target,
                })
            }
            this.ctx.body = {
                files: files,
                fields: parts.field,
            }
        }
    }
    return Controller
}
