<template>
    <form @submit.prevent>
            <h4>Creating post</h4>
            <my-input
            v-focus
                v-model="post.title"
                type="text"
                placeholder="Title"
            />
            <my-input
                v-model="post.body"
                type="text"
                placeholder="Description"
            />
            <my-button
                @click="createPost"
                style="margin-top: 15px"
            >
            Create
            </my-button>
        </form>
</template>

<script>
export default {
    data() {
        return {
            post: {
                title: "",
                body: "",
            }
        };
    },
    methods: {
        createPost() {
            this.post.id = Date.now();
            this.$emit("create", this.post);
            this.post = {
                title: "",
                body: "",
            };
        }
    },
    // watch: {                                 // глубокое наблюдение: отслеживание каждого изменения
    //     post: {
    //         handler(newValue) {
    //             console.log(newValue);
    //         },
    //         deep: true
    //     },
    // }
}
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
}
</style>