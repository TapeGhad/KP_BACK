module.exports = (mongoose, Schema) => {
    const schema = new Schema(
      {
        name: {
          type: String,
          required: true,
        },
        repetitors: {
          type: Number,
          required: true,
          default: 0,
        },
        active: {
            type: Boolean,
            required: true,
            default: false,
          },
        averagePrice: {
            type: Number,
            required: true,
            default: 0,
        }
      },
      { versionKey: false,
        timestamps: true }
    );
  
    return mongoose.model("Subject", schema);
  };
  