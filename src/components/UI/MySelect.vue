<!-- eslint-disable vue/no-mutating-props -->
<template>
    <select v-model="modelValue" @change="changeOption">
        <option disabled value="">Choose from list</option>
        <option 
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        >
            {{option.name}}
        </option>
    </select>
</template>

<script>
export default {
    name: "my-select",
    props: {
        modelValue: {
            type: String,
        },
        options: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        changeOption(event) {
            this.$emit('update:modelValue', event.target.value);
        }
    }
}
</script>

<style scoped>

</style>