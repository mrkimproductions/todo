<template>
    <div>
        <h1>{{ todoData.name }}  {{ todoData.completedTasks }} / {{ totalTasks }}</h1>
    </div> 
</template>

<script>
export default {
    name:"TodoComp",
    props: {
        todoData:Object
    },

    data: () => {
        return {
            
        }
    },

    computed: {
        totalTasks() {
            return this.todoData.taskArray.length;
        }
    }

}
</script>

<style scoped>

</style>