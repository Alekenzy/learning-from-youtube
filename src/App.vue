<template>
    <div class="app">
        <h1>Posts page</h1>
        <my-button @click="fetchPosts">Get posts</my-button>
        <my-button
            @click="showDialog"
        >
            Create Post
        </my-button>
        <my-dialog v-model:show="dialogVisible">
            <post-form 
            @create="createPost"
            />
        </my-dialog>
        <post-list
        :posts="posts"
        @remove="removePost"
        />
    </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import MyDialog from './components/UI/MyDialog.vue';
import MyButton from './components/UI/MyButton.vue';
import axios from "axios";

    export default {
        components: {
    PostForm,
    PostList,
    MyDialog,
    MyButton
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
                dialogVisible: false
            }
        },
        methods: {
            createPost(post) {
                this.posts.push(post);
                this.dialogVisible = false;
            },
            removePost(post) {
                this.posts = this.posts.filter(p => p.id !== post.id)
            },
            showDialog() {
                this.dialogVisible = true;
            },
            async fetchPosts() {
                try {
                    const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10');
                    console.log(response);
                } catch (error) {
                    alert("Error: " + error)
                }
            }
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