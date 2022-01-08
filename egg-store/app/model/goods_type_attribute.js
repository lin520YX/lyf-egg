module.exports=(app)=>{
  const mongoose = app.mongoose
  const Schema = mongoose.Schema
  var d=new Date();
  const GoodsTypeSchema = new Schema({
    cate_id:{type:Schema.Types.ObjectId},
    title:{type:String},
    attr_type:{type:String}, // 1input 2 textarea 3 select
    attr_value:{type:String}, //指定默认的多选内容 
    status:{
      type:Number,
      default:1
    },
    add_time:{
      type:Number,
      default:d.getTime()
    }
  })
 return mongoose.model('GoodsTypeAttribute', GoodsTypeSchema,'goods_type_attribute');
}