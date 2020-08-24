<template>
  <div>
    <search-form @query="searchUser"></search-form>
    <div v-if="result">
      <div v-if="error">Error: {{ error.message }}</div>
      <div v-for="searchResult in searchResults" :key="searchResult.id">
        <p>{{ searchResult.name }}</p>
        Repositories:
        <div
          v-for="repository in searchResult.repositories.nodes"
          :key="repository.id"
        > {{ repository.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";
import { useQuery, useResult } from "@vue/apollo-composable";
import { Sample } from "../queries/sample";
import SearchForm from "@/components/SearchForm.vue";
import gql from "graphql-tag";
export default defineComponent({
  name: "search-page",
  components: { SearchForm },
  setup() {
    const textQuery = ref("");
    const { result, error, variables } = useQuery(Sample, {
      query: textQuery.value,
      type: "USER",
    });
    const searchResults = useResult(result, null, (data) => data.search.nodes);
    function searchUser(searchQuery: string) {
      variables.value = { query: searchQuery, type: "USER" };
    }
    return {
      result,
      searchResults,
      textQuery,
      searchUser,
      error,
    };
  },
});
</script>

<style lang="scss" scoped></style>
