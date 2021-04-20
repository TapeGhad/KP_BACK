module.exports = (mongoose, Schema) => {
  const schema = new Schema(
    {
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        required: true,
      },
      emailNotif: {
        type: Boolean,
        required: true,
        default: false
      },
      name: {
        type: String,
      }

    },
    { versionKey: false,
      timestamps: true }
  );

  schema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      delete ret.password;
      delete ret._id;
    },
  });

  return mongoose.model("User", schema);
};
