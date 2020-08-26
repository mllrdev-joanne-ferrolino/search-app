<template>
  <div>
    <router-link v-slot="{ navigate }" :to="goToSearchPage">
      <div @click="navigate">Back</div>
    </router-link>
    <user-repositories
      :user="user"
      :repositories="repositories"
    ></user-repositories>
    <button v-show="hasNextPage" class="btn btn-primary">Load more</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "@vue/composition-api";
import UserRepositories from "@/components/UserRepositories.vue";
import { useResult } from "@vue/apollo-composable";
import { User, useGetRepositoriesQuery } from "@/generated/graphql";
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
    const user = useResult(result, null, (data) => data.user?.name);
    function loadMore() {
      // fetchMore({
      //   variables: {
      //     after: result.value.user?.repositories.pageInfo.endCursor,
      //   },
      //   updateQuery: (previousResult, { fetchMoreResult }) => {
      //     if (!fetchMoreResult) return previousResult;
      //     return {
      //       repositories: {
      //         nodes: [
      //           ...previousResult.user?.repositories.nodes,
      //           ...fetchMoreResult.user?.repositories.nodes
      //         ],
      //       },
      //     };
      //   },
      // });
    }
    const hasNextPage = computed(
      () => result.value.user?.repositories.pageInfo.hasNextPage
    );

    return { repositories, user, goToSearchPage, hasNextPage };
  },
});
</script>

<style lang="scss" scoped></style>
