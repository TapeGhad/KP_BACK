module.exports = (mongoose, Schema) => {
    const schema = new Schema(
      {
        message: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          required: true,
          expires: 86400
        },
        name: {
          type: String,
          required: true,
        },
      },
      { versionKey: false,
        timestamps: false }
    );
  
    return mongoose.model("Chat", schema);
  };
  