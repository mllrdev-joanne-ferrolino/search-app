<template>
  <div class="container">
    <router-link v-slot="{ navigate }" :to="goToSearchPage">
      <button class="btn btn-outline-primary" @click="navigate">Back</button>
    </router-link>
    <div v-if="result">
      <user-repositories
        v-show="repositories"
        :user="username"
        :repositories="repositories"
      ></user-repositories>
    </div>

    <button
      v-show="repositories && hasNextPage"
      class="btn btn-outline-primary"
      @click="loadMore"
    >
      Load more
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "@vue/composition-api";
import UserRepositories from "@/components/UserRepositories.vue";
import { useResult } from "@vue/apollo-composable";
import { useGetRepositoriesQuery } from "@/generated/graphql";
export default defineComponent({
  name: "user-page",
  components: {
    UserRepositories,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  setup(props, { root }) {
    const goToSearchPage = computed(() => ({
      name: root.$routeNames.SEARCH,
    }));
    const { result, fetchMore } = useGetRepositoriesQuery({
      login: props.name,
    });
    const repositories = useResult(
      result,
      null,
      (data) => data.user?.repositories.nodes
    );
    const username = useResult(result, null, (data) => data.user?.name) ?? "";
    function loadMore() {
      fetchMore({
        variables: {
          after: result.value.user?.repositories.pageInfo.endCursor,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return previousResult;
          return {
            user: {
              __typename: "User",
              name: fetchMoreResult.user?.name,
              repositories: {
                __typename: "RepositoryConnection",
                nodes: [
                  ...previousResult.user?.repositories?.nodes!,
                  ...fetchMoreResult.user?.repositories?.nodes!,
                ],
                pageInfo: fetchMoreResult.user?.repositories.pageInfo!,
              },
            },
          };
        },
      });
    }

    const hasNextPage = computed(
      () => result.value.user?.repositories.pageInfo.hasNextPage
    );

    return {
      repositories,
      username,
      goToSearchPage,
      hasNextPage,
      loadMore,
      result,
    };
  },
});
</script>

<style lang="scss" scoped>
.container {
  font-family: sans-serif;
  width: 80%;
}
</style>
