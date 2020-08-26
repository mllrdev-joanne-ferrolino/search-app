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
import { defineComponent, ref, onMounted } from "@vue/composition-api";
import { useResult } from "@vue/apollo-composable";
import { useGetUsersQuery, SearchType } from "@/generated/graphql";
import SearchForm from "@/components/SearchForm.vue";
import SearchItem from "@/components/SearchItem.vue";
export default defineComponent({
  name: "search-page",
  components: { SearchForm, SearchItem },
  setup() {
    const textQuery = ref("");
    const limit = 10;
    const { result, variables, fetchMore } = useGetUsersQuery({
      query: textQuery.value,
      type: SearchType.User,
      limit: limit,
    });
    const searchResults = useResult(result, null, (data) => data.search.nodes);
    function searchUser(searchQuery: string) {
      variables.value = {
        query: searchQuery,
        type: SearchType.User,
        limit: limit,
      };
    }
    function loadMore() {
      // fetchMore({
      //   variables: {
      //     cursor: result.value.search.pageInfo.endCursor,
      //   },
      //   updateQuery: (previousResult, { fetchMoreResult }) => {
      //     if (!fetchMoreResult) return previousResult;

      //     return {
      //       search: {
      //         __typename: SearchType.User,
      //         nodes: [previousResult.search.nodes, fetchMoreResult.search.nodes]
      //       }
      //     };
      //   },
      // });
    }
    return {
      searchResults,
      searchUser,
      loadMore
    };
  },
});
</script>

<style lang="scss" scoped></style>
