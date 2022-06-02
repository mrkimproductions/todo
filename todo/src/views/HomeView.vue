<template>
  <div class="home">
    <div v-for="todo in this.todoList" :key="todo.key">
      <button @click="selectTodoId(todo.id), $router.push('about')">
        <TodoComp :todoData="todo" />
      </button>
       <!-- <button @click.prevent="deleteTodo(todo.id), $router.push('/')"> Delete Todo </button>  -->
       <button @click="deleteTodo(todo.id)">Delete Todo</button>
    </div>
    <div> 
      <button @click="addTodo = true">Add a new Todo</button>
      <form v-if="addTodo == true">
        <label for="todoName">Enter Todo Name </label>
        <input v-model="newTodo.name" id="todoName" name="todoName" type="text" placeholder="Todo Name" />
        <button @click.prevent="createTodo">Save New Todo</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import TodoComp from '@/components/TodoComp.vue';

export default {
  name: 'HomeView',
  components: {
    TodoComp
  },

  data: () => {
    return {
      todoList:[],
      addTodo:false,
      newTodo:{
        id:Number,
        name:"",
        completedTasks:0,
        taskArray:[]
      }
    }
    
  },

  methods: {
    createTodo() {
      this.newTodo.id = this.getLargestTodoId() +1;
      axios.post("http://localhost:9090/addTodo",this.newTodo).then(response => {
          this.todoList = this.$store.getters.refreshTodoList(response.data);
      })
      this.addTodo = false;
    },

    deleteTodo(todoId){
      axios.post("http://localhost:9090/deleteTodo",{id:todoId}).then(response => {
        this.todoList = this.$store.getters.refreshTodoList(response.data);
      })     
    },

    selectTodoId(id){
      this.$store.commit("SELECT_TODO", id);
    },

    getLargestTodoId() {
      let largestId = 0;
      this.todoList.forEach(todo => {
          if(todo.id > largestId){
            largestId = todo.id
          }
      });
      return largestId;
    }
  },

  mounted() {
    axios.get("http://localhost:9090/getTodoList").then(response => {
      this.todoList = response.data;
      this.$store.commit('SET_TODOLIST', response.data);
    })
  }
}
</script>
