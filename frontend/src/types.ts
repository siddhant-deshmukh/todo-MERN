export interface ITodoItem {
  _id?: string,
  title: string,
  desc?: string,
  author?: string,
  authorName? : string,
  status: boolean
  time: string,
}
export interface IUser {
  _id : string,
  name: string,
}
