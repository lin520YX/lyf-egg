module.exports = (app) => {
    const mongoose = app.mongoose
    const Schema = mongoose.Schema
    const RoleSchema = new Schema(
        {
            title: { type: String },
            description: { type: String },
            status: { type: Number, default: 1 },
        },
        {
            timestamps: {
                createAt: 'createTimer',
                updateAt: 'updateTimer',
            },
        }
    )
    return mongoose.model('Role', RoleSchema, 'role')
}
