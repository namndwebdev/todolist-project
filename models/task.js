const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todo-project', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Schema = mongoose.Schema;
 
const taskSchema = new Schema({
 title: String,
 deadline: Date
});

const TaskModel = mongoose.model('task', taskSchema)

module.exports = TaskModel