module.exports=(app)=>{
  const mongoose = app.mongoose
  const Schema = mongoose.Schema
  const AdminSchema = new Schema({
    username:{type:String},
    password:{type:String},
    mobile:{type:String},
    email:{type:String},
    status:{type:Number,default:1},
    role_id:{type:Schema.Types.ObjectId},
    is_super: { type:Number,default:0}  
  },
  {
    timestamps:{
      createAt:'createTimer',
      updateAt:'updateTimer'
    }
  })
 return mongoose.model('Admin', AdminSchema,'admin');
}