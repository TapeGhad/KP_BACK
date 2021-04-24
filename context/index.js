module.exports = (mongoose) => {
  const Schema = mongoose.Schema;

  const connectionOptions = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  };

  mongoose.connect(
    process.env.MONGO_URL,
    connectionOptions
  );

  const User = require("../modules/users/users.model")(
    mongoose,
    Schema
  );

  const Subject = require("../modules/users/subject.model")(
    mongoose,
    Schema
  );

  const Chat = require("../modules/chat/chat.model")(
    mongoose,
    Schema
  );

  return {
    users: User,
    subject: Subject,
    chat: Chat,
  };
};
