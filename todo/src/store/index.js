import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todoList:[],
    selectedTodo:Number
  },
  getters: {
    getTaskListById: (state) => (id) => {
      let todoArrayIndex;
      for( let [i,todo] of state.todoList.entries()) {
        if(todo.id == id) {
          todoArrayIndex = i;
          break;
        }
      }
      let taskArray = state.todoList[todoArrayIndex].taskArray;
      return taskArray;
    },

    getSelectedTodo(state) {
      return state.selectedTodo;
    },

    refreshTodoList: (state) => (refreshedTodoList) => {
        state.todoList = refreshedTodoList;
        return state.todoList
    },

    refreshTaskList: (state) => (refreshedTaskList) => {
      console.log(state, refreshedTaskList);
    }
  },
  mutations: {
    SET_TODOLIST(state, data){
      state.todoList = data;
    },
    ADD_TODO(state, data){
      state.todoList.push(data);
    },
    SELECT_TODO(state, id) {
      state.selectedTodo = id;
    },
    UPDATE_COMPLETEDTASKS(state, id) {
      for(let todo in state.todoList) {
        if(todo.id == id) {
          todo.conpletedTasks++;
        }
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
