<template>
    <div class="dialog" v-if="show" @click="hideDialog">
        <div @click.stop class="dialog__content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import toggleMixin from "@/mixins/toggleMixin.js";
export default {
    name: 'my-dialog',
    mixins: [toggleMixin]
    // props: {
    //     show: {
    //         type: Boolean,
    //         default: false
    //     }
    // },
    // methods: {
    //     hideDialog() {
    //         this.$emit('update:show', false)
    //     }
    // }
}
</script>

<style scoped>
.dialog {
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #00000080;
    position: fixed;
    display: flex;
}

.dialog__content {
    margin: auto;
    background: #fff;
    border-radius: 12px;
    min-height: 50px;
    min-width: 300px;
    padding: 20px;
}
</style>    