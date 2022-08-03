<template>
    <div>
        <h1 style="margin-bottom: 10px">Posts page</h1>
        <!-- <my-button @click="fetchPosts">Get posts</my-button>  это для того, чтобы загружать данные с сервера с помощью клика   -->
        <my-input 
            v-focus
            v-model="searchQuery"
            placeholder="Search..."
        />
        <div class="app__btns">
            <my-button
                @click="showDialog"
                style="margin: 0"
            >
                Create Post
            </my-button>
            <my-select 
                v-model="selectedSort"
                :options="sortOptions"
            />
        </div>
        <my-dialog v-model:show="dialogVisible">
            <post-form 
            @create="createPost"
            />
        </my-dialog>
        <post-list
        :posts="sortedAndSearchedPosts"
        @remove="removePost"
        v-if="!isPostsLoading"
        />
        <div v-else>Loading...</div>
        <div v-intersection="loadMorePosts" class="observer">

        </div>
        <!-- <div class="page__wrapper">
            <div
                v-for="pageNumber in totalPages"
                :key="pageNumber"
                class="page"
                :class="{
                    'current-page': page === pageNumber
                }"
                @click="changePage(pageNumber)"
            >
            {{pageNumber}}
            </div>
        </div> -->
    </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import axios from "axios";
import MySelect from '@/components/UI/MySelect.vue';
import MyInput from '@/components/UI/MyInput.vue';

    export default {
        components: {
    PostForm,
    PostList,
    MySelect,
    MyInput
},
        data() {
            return {
                posts: [],
                dialogVisible: false,
                isPostsLoading: false,
                selectedSort: '',
                searchQuery: '',
                page: 1,
                limit: 10,
                totalPages: 0,
                sortOptions: [
                    {
                        value: 'title',
                        name: "sort by names"
                    },
                    {
                        value: 'body',
                        name: "sort by description"
                    }
                ]
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
            // changePage(pageNumber) {
            //     this.page = pageNumber;
            //     this.fetchPosts();
            // },
            async fetchPosts() {
                try {
                    this.isPostsLoading = true;
                    const response = await axios.get('https://jsonplaceholder.typicode.com/posts?', {
                        params: {
                            _page: this.page,
                            _limit: this.limit
                        }
                    });
                    this.totalPages = Math.ceil(response.headers["x-total-count"] / this.limit)
                    this.posts = response.data;
                } catch (error) {
                    alert("Error: " + error)
                } finally {
                    this.isPostsLoading = false;
                }
            },
            async loadMorePosts() {
                try {
                    this.page++;
                    const response = await axios.get('https://jsonplaceholder.typicode.com/posts?', {
                        params: {
                            _page: this.page,
                            _limit: this.limit
                        }
                    });
                    this.totalPages = Math.ceil(response.headers["x-total-count"] / this.limit)
                    this.posts = [...this.posts, ...response.data];
                } catch (error) {
                    alert("Error: " + error)
                }
            },
            // inputTitle(event) {                  // Для синхронизации инпута с данными. Но использован другой метод этой синхронизации. Чекните сами теги 
            //     this.title = event.target.value;
            // }
        },
        mounted() {  // для того чтобы делать вещей при загрузке страницы
            this.fetchPosts();   // загружать данные при загрузки страницы
            // console.log(this.$refs.observer); // возвращает сам DOM элемент с помощью ref

            //////////////////////////////////////////////////////////////////////////////
            // const options = {                                                        //
            //     rootMargin: '0px',                                                   //
            //     threshold: 1.0                                                       //
            // }                                                                        //
            // const callback = (entries, observer) => {                                          //
            //     if(entries[0].isIntersecting && this.page < this.totalPages) {       // // Этот код стоит в директиве VIntersection и он отвечает за это действие
            //         this.loadMorePosts();                                            //
            //     }                                                                    //
            // };                                                                       //
            // const observer = new IntersectionObserver(callback, options);            //
            // observer.observe(this.$refs.observer);                                   //
            //////////////////////////////////////////////////////////////////////////////
            
        },
        computed: {
            sortedPosts() {
                return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]));
            },
            sortedAndSearchedPosts() {
                return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
            }
        },
        watch: {
            // page() {
            //     this.fetchPosts();
            // }
        }
        // watch: {
        //     selectedSort(newValue) {    // метод должен называть точно так же как нужный элемент! Например, как здесь selectedSort. А этот selectedSort есть в методе data()
        //         this.posts.sort((post1, post2) => {
        //             return post1[newValue]?.localeCompare(post2[newValue]);
        //         })
        //     },
        // }
    }
</script>

<style scoped>
.app__btns {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
}

.page__wrapper {
    display: flex;
    margin-top: 15px;
}

.page {
    border: 1px solid #000;
    padding: 10px;
    background-color: #00808033;
}

.current-page {
    border: 2px solid  #000;
    background-color: #00808073;
}

.observer {
    height: 30px;
    background-color: #008000;
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