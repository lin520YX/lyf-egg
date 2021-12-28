module.exports = app => {
  const pump = require('mz-modules/pump');
  const path=require('path');
const fs=require('fs');
  class Controller extends app.Controller {
    async index(){
      await this.ctx.render('/admin/focus/index')
    }
    async multi(){
      // 多文件上传
      await this.ctx.render('/admin/focus/multi')
    }
    async doSingleUpload(){
      // enctype="multipart/form-data" 不能使用this.ctx.body.request 来接收post的数据
      const stream = await this.ctx.getFileStream();
      console.log(stream)
      // 目标文件 创建一个空文件
      const target = 'app/public/admin/upload/' + path.basename(stream.filename);
      const writeStream = fs.createWriteStream(target);
      // 写入文件内容
      // 如果失败可以关闭流 不然浏览器会卡死
      await pump(stream,writeStream); 
      this.ctx.body = {
        url: target,      
        fields: stream.fields      //表单的其他数据
      }  
    }
    async doMultiUpload(){
      // autoFields 可以将出了
      let files = []
      const parts =  this.ctx.multipart({autoFields:true})
      console.log(parts)
      let stream = ''
      while((stream = await parts())!=null){
        if(!stream.filename)return 
        const filename = stream.filename.toLowerCase()
        const fieldname = stream.fieldname
        const target = 'app/public/admin/upload'+path.basename(filename);
        const writeStream = fs.createWriteStream(target)
        await pump(stream,writeStream)
        files.push({
          [fieldname]:target
        })
      }
      this.ctx.body = {
        files:files,
        fields:parts.field
      }
    }
  }
  return Controller
}
