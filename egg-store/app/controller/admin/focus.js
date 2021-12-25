module.exports = app => {
  const pump = require('mz-modules/pump');
  const path=require('path');
const fs=require('fs');
  class Controller extends app.Controller {
    async index(){
      await this.ctx.render('/admin/focus/index')
    }
    async multi(){
      await this.ctx.render('/admin/focus/multi')
    }
    async doSingleUpload(){
      const stream = await this.ctx.getFileStream();
      // 目标文件 创建一个空文件
      const target = 'app/public/admin/upload/' + path.basename(stream.filename);
      const writeStream = fs.createWriteStream(target);
      // 写入文件内容
      await pump(stream,writeStream); 
      this.ctx.body = {
        url: target,      
        fields: stream.fields      //表单的其他数据
      }  
    }
    async doMultiUpload(){}
  }
  return Controller
}
