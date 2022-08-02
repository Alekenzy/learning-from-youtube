<template>
    <div class="app">
        <post-form />
        <post-list :posts="posts" />
    </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';

    export default {
        components: {
            PostForm, PostList
        },
        data() {
            return {
                posts: [
                    {
                        id: 1, title: "Javascript", body: "Description"
                    },
                    {
                        id: 2, title: "Javascript 2", body: "Description 2"
                    },
                    {
                        id: 3, title: "Javascript 3", body: "Description 3"
                    },
                    {
                        id: 4, title: "Javascript 4", body: "Description 4"
                    },
                    {
                        id: 5, title: "Javascript 5", body: "Description 5"
                    },
                ],
                title: "",
                body: ""
            }
        },
        methods: {
            createPost() {
                const newPost = {
                    id: Date.now(),
                    title: this.title,
                    body: this.body,
                }
                this.posts.push(newPost);
                this.title = "";
                this.body = "";
            },
            // inputTitle(event) {                  // Для синхронизации инпута с данными. Но использован другой метод этой синхронизации. Чекните сами теги 
            //     this.title = event.target.value;
            // }
        }
    }
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.app {
    padding: 20px;

}
</style>


<!-- <template>    // Примерная структура vue
    <div>
        <div>
            <button @click="addLike">like</button>
            <button @click="addDislike">dislike</button>
        </div>
        <div>Like count: <strong>{{likes}}</strong></div>
        <div>Dislike count: <strong>{{dislikes}}</strong></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                likes: 0,
                dislikes: 0
            }
        },
        methods: {
            addLike() {
                this.likes += 1;
            },
            addDislike() {
                this.dislikes += 1
            }
        }
    }
</script>

<style>

</style> -->