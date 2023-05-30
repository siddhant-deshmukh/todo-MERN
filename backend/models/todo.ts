import mongoose, { Types } from "mongoose";

export interface ITodoStored {
  title : string,
  desc? : string,
  author : Types.ObjectId,
  authorName : string,
  status : boolean,
  time : Date
}

const todoSchema = new mongoose.Schema<ITodoStored>({
  title: { type: String, required: true, maxlength: 100, minlength: 1 },
  desc : {type: String, maxlength: 200},
  author: {type: mongoose.SchemaTypes.ObjectId, required: true, index : true},
  authorName : {type: String, required : true},
  status: {type: Boolean, default: false },
  time : {type: Date, default: new Date()}
})

const Todo = mongoose.model<ITodoStored>("Todos", todoSchema);
export default Todo;