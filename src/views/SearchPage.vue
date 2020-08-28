<template>
  <div class="container">
    <search-form  @query="searchUser"></search-form>
    <div v-show="result" class="user-count">{{ formattedUserCount }}</div>
    <search-item
      v-show="searchResults"
      v-for="searchResult in searchResults"
      :key="searchResult.id"
      :searchResult="searchResult"
    ></search-item>
    <button
      class="btn btn-outline-primary"
      @click="loadMore"
      v-show="searchResults && hasNextPage"
    >
      Load more...
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from "@vue/composition-api";
import { useResult } from "@vue/apollo-composable";
import { useGetUsersQuery, SearchType } from "@/generated/graphql";
import { useStore } from "@/composables/useStore";
import SearchForm from "@/components/SearchForm.vue";
import SearchItem from "@/components/SearchItem.vue";
export default defineComponent({
  name: "search-page",
  components: { SearchForm, SearchItem },
  setup() {
    const { searchQuery, addSearchQueries, storeSearchQueries } = useStore();
    const { result, variables, fetchMore } = useGetUsersQuery({
      query: searchQuery.value,
      type: SearchType.User,
    });
    const searchResults = useResult(result, null, (data) => data.search.nodes);
    const formattedUserCount = computed(
      () =>
        `${useResult(result, null, (data) => data.search.userCount).value} users`
    );

    onMounted(() => {
      if (storeSearchQueries) {
        searchQuery.value = storeSearchQueries[storeSearchQueries.length - 1];
        variables.value = {
          query: searchQuery.value,
          type: SearchType.User,
        };
      }
    });
    function searchUser(searchQuery: string) {
      variables.value = {
        query: searchQuery,
        type: SearchType.User,
      };
      addSearchQueries(searchQuery);
    }
    function loadMore() {
      fetchMore({
        variables: {
          cursor: result.value.search.pageInfo.endCursor,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return previousResult;
          return {
            search: {
              __typename: "SearchResultItemConnection",
              nodes: [
                ...previousResult.search.nodes!,
                ...fetchMoreResult.search.nodes!,
              ],
              pageInfo: fetchMoreResult.search.pageInfo,
              userCount: fetchMoreResult.search.userCount,
            },
          };
        },
      });
    }

    const hasNextPage = computed(
      () => result.value.search?.pageInfo.hasNextPage
    );
    return {
      searchResults,
      searchUser,
      loadMore,
      hasNextPage,
      result,
      searchQuery,
      formattedUserCount,
    };
  },
});
</script>

<style lang="scss" scoped>
.container {
  font-family: sans-serif;
  width: 80%;
  search-item {
    margin-top: 10px;
    padding: 10px;
  }
  .user-count {
    text-align: left;
    margin-left: 10px;
    margin-top: 10px;
    font-weight: bold;
    font-size: 18px;
  }
  button {
    margin-bottom: 15px;
  }
}
</style>
