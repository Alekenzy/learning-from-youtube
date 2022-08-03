<template>
    <div v-if="posts.length > 0"> <!-- v-show="posts.length" можно написать и так, но это просто сделает его display: none а не удаляет его с DOM дерева -->
        <h3 style="margin-bottom: 10px; margin-top: 10px">Posts List</h3>
        <transition-group name="post-list">
            <PostItem 
                v-for="post in posts"
                :post="post"
                :key="post.id"
                @remove="$emit('remove', post)"
            />
        </transition-group>
    </div>
    <h2 v-else style="color: red; margin-top: 10px;">
        Posts list is empty
    </h2>
</template>

<script>
import PostItem from './PostItem.vue';
export default {
    props: {
        posts: {
            type: Array,
            required: true,
        }
    },
    components: { PostItem }
}
</script>

<style scoped>
.post-list-item {  /* все эти post-list-* классы из transition group animations */
  display: inline-block;
  margin-right: 10px;
}
.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.3s ease;
}
.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.post-list-move {
  transition: transform 0.7s ease;
}
</style>