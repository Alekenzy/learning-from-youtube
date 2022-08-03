<template>
    <div class="navbar">
        <div class="main__page" @click="$router.push('/')">Vue 3</div>
        <div class="navbar__btns">
            <my-button @click="$router.push('/about')">About</my-button>
            <my-button @click="$router.push('/store')">Store</my-button>
            <my-button @click="$router.push('/posts')">Posts</my-button>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.navbar {
    height: 50px;
    background-color: #d3d3d3;
    box-shadow: 2px 2px 4px #808080;
    display: flex;
    align-items: center;
    padding: 0 15px;
}

.navbar__btns {
    margin-left: auto;
}

.main__page {
    color: #2e2e2e;
    font-weight: bolder;
}
</style>