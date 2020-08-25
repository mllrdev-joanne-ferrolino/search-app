<template>
  <div>
    <search-form @query="searchUser"></search-form>
    <search-item
      v-for="searchResult in searchResults"
      :key="searchResult.id"
      :searchResult="searchResult"
    ></search-item>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";
import { useResult } from "@vue/apollo-composable";
import { useGetUsersQuery, SearchType } from "@/generated/graphql";
import { useStore } from "@/composables/useStore";
import SearchForm from "@/components/SearchForm.vue";
import SearchItem from "@/components/SearchItem.vue";
export default defineComponent({
  name: "search-page",
  components: { SearchForm, SearchItem },
  setup() {
    const textQuery = ref("");
    const { storeSearchResults } = useStore();
    const { result, variables } = useGetUsersQuery({
      query: textQuery.value,
      type: SearchType.User,
    });
    const searchResults = useResult(result, null, (data) => data.search.nodes);
    function searchUser(searchQuery: string) {
      variables.value = { query: searchQuery, type: SearchType.User };
    }
    return {
      searchResults,
      searchUser,
      storeSearchResults,
    };
  },
});
</script>

<style lang="scss" scoped></style>
