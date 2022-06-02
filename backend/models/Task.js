export default class Task{


    constructor(id, description, dueDate, priority, completed) {
        this.id=id;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = completed
    }

    getId(){
        return this.id;
    }

    setId(id){
        this.id = id;
    }

    getDescription(){
        return this.description;
    }

    setDescription(description){
        this.description = description;
    }

    getDueDate(){
        return this.dueDate;
    }

    setDueDate(dueDate){
        this.dueDate = dueDate;
    }

    getPriority(){
        return this.priority;
    }

    setPriority(priority){
        this.priority = priority;
    }
}