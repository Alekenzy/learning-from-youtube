<template>
    <div>
        <!-- <h2>{{ $store.state.likes }}</h2>  Так получают значение с vuex store состояния/значения(state)  -->
        <!-- <h2>{{ $store.getters.doubleLikes }}</h2>  И вот так получают с getters -->
        <!-- <div>
            <my-button @click="$store.commit('incrementLikes')">Like</my-button>        а вот так мутирует state, то есть вызывает mutations
            <my-button @click="$store.commit('decrementLikes')">Dislike</my-button>     с помощью функции commit('nameOfMethod')
        </div> -->

        <h3>{{$store.state.post.limit}}</h3>

        <hr style="margin: 30px 0">
        <h1 style="margin-bottom: 10px">Posts page</h1>
        <!-- <my-input 
            v-focus
            v-model="searchQuery"
            placeholder="Search..."
        /> -->
        <div class="app__btns">
            <my-button
                @click="showDialog"
                style="margin: 0"
            >
                Create Post
            </my-button>
            <!-- <my-select 
                v-model="selectedSort"
                :options="sortOptions"
            /> -->
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
    </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import { mapActions, mapState, mapMutations, mapGetters } from "vuex";

    export default {
    components: {
        PostForm,
        PostList,
    },
    data() {
        return {
            dialogVisible: false,
        }
    },
    methods: {
        ...mapMutations({
            setPage: 'post/setPage',
            setSearchQuery: 'post/setSearchQuery',
            setSelectedSort: 'post/setSelectedSort',
        }),
        ...mapActions({
            loadMorePosts: 'post/loadMorePosts',
            fetchPosts: 'post/fetchPosts'
        }),
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
    },
    mounted() {
        this.fetchPosts();
    },
    computed: {
        ...mapState({
            posts: state => state.post.posts,
            isPostsLoading: state => state.post.isPostsLoading,
            selectedSort: state => state.post.selectedSort,
            searchQuery: state => state.post.searchQuery,
            page: state => state.post.page,
            limit: state => state.post.limit,
            totalPages: state => state.post.totalPages,
            sortOptions: state => state.post.sortOptions
        }),
        ...mapGetters({
            sortedPosts: 'post/sortedPosts',
            sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
        })
    },
    watch: {
        // page() {
        //   this.fetchPosts()
        // }
  }
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