<template>
  <div class="about">
    <!-- <TaskList :TaskArray="taskArray"/> -->
    <div v-for="task in taskArray" :key="task.id">
      <h1>{{task.description}} {{task.dueDate}} {{task.priority}}</h1>
      <button @click="completeTask(task.id)">Complete Task</button>
    </div>
    <br />
    <Button @click="addTask = true">Create New Task</Button>
    <form v-if="addTask == true">
      <label for="description"> Task Description </label>
      <input type="text" id="description" name="description" v-model="newTask.description" />
      <label for="dueDate">Due Date</label>
      <input type="date" id="dueDate" name="dueDate" v-model="newTask.dueDate" />
      <label for="priority">Priority</label>
      <select id="priority" name="priority" v-model="newTask.priority">
        <option id="High">High</option>
        <option id="medium">Medium</option>
        <option id="low">Low</option>
      </select>
      <button @click.prevent="addNewTask">Save New Task</button>
    </form>
  </div>
</template>

<script>
  import axios from "axios";

  export default {

    data: () => {
      return {
        taskArray:[],
        addTask: false,
        newTask:{
          todoId:Number,
          id:Number,
          description:"",
          dueDate:Date,
          priority:"",
          completed:false
        }
      }
    },

    methods: {
      addNewTask(){
        this.newTask.todoId = this.$store.getters.getSelectedTodo;
        this.newTask.id = this.getLargestTaskId();
        axios.post("http://localhost:9090/addTask",this.newTask).then(response => {
          this.taskArray = response.data;
        })
      },

      getLargestTaskId() {
        let largestId = 0;
        this.taskArray.forEach(task => {
          if(task.id > largestId){
            largestId = task.id
          }
      });
        return largestId;
      },
      
      completeTask(taskId) {
        let todoId = this.$store.getters.getSelectedTodo; 
          axios.post("http://localhost:9090/completeTask",{todoId: todoId, taskId: taskId}).then(response => {
            this.$store.getters.refreshTodoList(response.data);
          })
        }        
    },

    mounted() {
      axios.get("http://localhost:9090/getTodoByid",{params: {id:this.$store.getters.getSelectedTodo}}).then(response => {
        this.taskArray = response.data.taskArray;
      })
  }

  }
</script>

<style scoped>

</style>
