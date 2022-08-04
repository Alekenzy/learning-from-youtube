<template>
    <div>
        <h1 style="margin-bottom: 10px">Posts page</h1>
        <my-input 
            v-focus
            v-model="searchQuery"
            placeholder="Search..."
        />
        <div class="app__btns">
            <my-button
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
            />
        </my-dialog>
        <post-list
        :posts="sortedAndSearchedPosts"
        v-if="!isPostsLoading"
        />
        <div v-else>Loading...</div>
    </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import {usePosts} from "@/hooks/usePosts";
import useSortedPosts from "@/hooks/useSortedPosts";
import useSortedAndSearchedPosts from "@/hooks/useSortedAndSearchedPosts";

export default {
    components: {
        PostList,
        PostForm
    },
    data() {
        return {
            dialogVisible: false,
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
    // eslint-disable-next-line no-unused-vars
    setup(props) {
        const {posts, totalPages, isPostsLoading} = usePosts(10);
        const {sortedPosts, selectedSort} = useSortedPosts(posts);
        const {searchQuery, sortedAndSearchedPosts} = useSortedAndSearchedPosts(sortedPosts)


        return {
            posts,
            totalPages,
            isPostsLoading,
            sortedPosts,
            selectedSort,
            searchQuery,
            sortedAndSearchedPosts
        }
    }
    }
</script>

<style scoped>
.app__btns {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
}
</style>