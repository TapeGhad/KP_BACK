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
        default: true,
      },
      faivourites: {
        type: Array,
        required: true,
        default: [],
      },
      name: {
        type: String,
      },
      rating: {
        type: String,
      },
      subject: {
        type: String,
      },
      expa: {
        type: String,
      },
      comeFrom: {
        type: String,
      },
      personalMsg: {
        type: Boolean,
        default: true,
      },
      about: {
        type: String,
      },
      price: {
        type: Number,
      },
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
