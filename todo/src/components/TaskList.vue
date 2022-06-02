<template>
    <div>
        <h1 v-for="task in TaskArray" :key="task.id">
            <h4>{{ task.description }}</h4>
            <h4>{{ task.dueDate }}</h4>
            <h4>{{ task.priority }}</h4>
        </h1>
    </div>
</template>

<script>
export default {
    name:"TaskList",

    props: {
        TaskArray:Array
    },

    data: () => {
        return {

        }
    },

}
</script>

<style scoped>

</style>