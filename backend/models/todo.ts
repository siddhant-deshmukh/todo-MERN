import mongoose, { Types } from "mongoose";

export interface ITodoStored {
  title : string,
  desc? : string,
  author : Types.ObjectId,
  status : boolean,
  date : Date
}

const todoSchema = new mongoose.Schema<ITodoStored>({
  title: { type: String, required: true, maxlength: 50, minlength: 1 },
  desc : {type: String, maxlength: 200},
  author: {type: mongoose.SchemaTypes.ObjectId, required: true, index : true},
  status: {type: Boolean, default: false },
  date : {type: Date, default: new Date()}
})

const Todo = mongoose.model<ITodoStored>("Todos", todoSchema);
export default Todo;