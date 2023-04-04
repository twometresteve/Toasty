import mongoose from 'mongoose';

const Schema = mongoose.model('fs_servers', new mongoose.Schema({
  _id: {type: String, required:true},
  ip: {type: String, required:true},
  code: {type: String, require:true}
}, {versionKey: false}));

export default class FS_Servers extends Schema {
  _content: typeof Schema;
  constructor(){
    super();
    this._content = Schema;
  }
}
