<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <input
        class="form-control"
        type="text"
        v-model="textQuery"
        placeholder="Search by user"
      />
      <input class="btn btn-primary" type="submit" value="search" />
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";
export default defineComponent({
  name: "search-form",
  props: {
    query: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const textQuery = ref(props.query);
    function handleSubmit() {
      emit("query", textQuery.value);
    }
    return { textQuery, handleSubmit };
  },
});
</script>

<style lang="scss" scoped>
form {
  display: flex;
  input {
    margin: auto;
  }
  .form-control {
    width: 80%;
  }
}
</style>
