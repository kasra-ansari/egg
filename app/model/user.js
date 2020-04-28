
module.exports = app => {
  const mongoose = app.mongoose;
  const UserSchema = new mongoose.Schema({
    mobile: { type: String, unique: true, required: true },
    password: { type: String },
    fullName: { type: String },
    createdAt: { type: Date, default: Date.now },
    // posts: [
    //   { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    // ],
  });
  return mongoose.model('User', UserSchema);
}
