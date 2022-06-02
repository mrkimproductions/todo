import Todo from "./models/Todo.js";
import Task from "./models/Task.js";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors());

let todoList = [];

app.post("/addTodo",(req,res) => {
    let newTodo = new Todo(req.body.id,req.body.name,req.body.taskArray,req.body.completedTasks);
    todoList.push(newTodo);
    res.send(todoList);
})

app.get("/getTodoList",(req,res) => {
    res.send(todoList);
})

app.get("/getTodoById", (req, res) => {
    let id = req.query.id;
    let todoFound = false;
    for( let todo of todoList ) {
        if(todo.id == id ) {
            res.send(todo);
            todoFound = true;
            break;
        }
    }
    if(todoFound == false) {
        res.send("The todo with an id of "+id+" was not found");
    }
})

app.post("/updateTodoById", (req,res) => {
    let updatedTodo = new Todo(req.body.id, req.body.name, req.body.taskArray, req.body.completedTasks);
    let todoFound = false;
    
    for(let [i,todo] of todoList.entries() ) {
        if(todo.id == updatedTodo.id) {
            todoList[i] = updatedTodo;
            res.send("The todo with id " + todo.id + " has been updated");
            todoFound = true;
            break;
        }
    } 
    if(todoFound == false) {
        res.send("The todo with id " + updatedTodo.id + " was not found");
    }
})

app.post("/addTask", (req,res) => {
    let todoId = req.body.todoId;
    let newTask = new Task(req.body.id, req.body.description, req.body.dueDate, req.body.priority, req.body.completed);
    let todoFound = false;

    for(let [i,todo] of todoList.entries()) {
        if(todo.id == todoId) {
            todo.taskArray.push(newTask);
            res.send(todo.taskArray);
            todoFound = true;
            break;
        }
    }
    if(todoFound == false) {
        res.send("The todo with id " + todoId + " was not found");
    }
})

app.post("/completeTask", (req,res) => {
    let todoId = req.body.todoId;
    let taskId = req.body.id;
    let todoFound = false;
    for(let todo of todoList.entries()) {
        if(todo.id == todoId) {
            for(let task in todo.taskArray) {
                if(task.id == taskId){
                    todo.completedTasks++;
                    res.send(todoList);
                    todoFound = true;
                    break;
                }
            }            
        }
    }
    if(todoFound == false) {
        res.send("The todo with id " + todoId + " was not found");
    }
})

app.post("/deleteTodo", (req,res) => {
    for(let [i, todo] of todoList.entries()) {
        if(todo.id == req.body.id) {
            todoList.splice(i, 1);
        }
    }
     res.send(todoList);
})

app.listen(9090, () => {
    console.log("Server is listening on port 9090");
})
