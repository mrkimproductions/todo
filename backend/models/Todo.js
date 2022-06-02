export default class Todo{
     

    constructor(id, name, taskArray, completedTasks, ){
        this.id = id;
        this.name = name;
        this.completedTasks = completedTasks;
        this.taskArray = taskArray;
    }

    getId() {
        return this.id;
    }
    
    setId(id) {
        this.id = id;
    }

    getName(){
        return this.name;
    }

    setName(name){
        this.name = name;
    }

    getCompletedTasks() {
        return this.completedTasks;
    }

    setCompletedTasks(completedTasks){
        this.completedTasks = completedTasks;
    }

    getTaskArray(){
        return this.taskArray;
    }

    setTaskArray(taskArray){
        this.taskArray = taskArray;
    }

    updateCompletedTasks(){
        this.completedTasks = this.completedTasks++;
    }

    getNewTaskId(){
        let currentTaskId = this.taskArray[this.taskArray.length -1].getId();
        return currentTaskId++;
    }
}