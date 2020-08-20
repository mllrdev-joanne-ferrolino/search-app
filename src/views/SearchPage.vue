<template>
  <div>
    <form>
      <input type="text" />
      <input type="submit" value="search" />
      <div v-for="node in search.nodes" :key="node.id">
        <div>{{ node.name }}</div>
        <div v-for="repository in node.repositories" :key="repository.id">
          <div v-for="node in repository.nodes" :key="node.id">
            {{ node.name }}
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "@vue/composition-api";
import { Sample } from "../queries/sample";
import { User } from "@/generated/graphql";
export default defineComponent({
  name: "search-page",
  apollo: {
    search: {
      query: Sample,
      variables() {
        return {
          query: "Joanne Ferrolino",
          type: "USER"
        };
      },
    },
  },
  setup() {
    const search = reactive([]);
    return { search };
  },
});
</script>

<style lang="scss" scoped></style>
