
module.exports = app => {
  const mongoose = app.mongoose;
  const PostSchema = new mongoose.Schema({
    title: { type: String, required: 'title required' },
    subTitle: { type: String },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  }, {
    timestamps: true,
  });
  return mongoose.model('Post', PostSchema);
}
