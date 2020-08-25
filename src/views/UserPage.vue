<template>
  <div>
    <router-link v-slot="{ navigate }" :to="goToSearchPage">
      <div @click="navigate">Back</div>
    </router-link>
    <user-repositories
      :user="user"
      :repositories="repositories"
    ></user-repositories>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "@vue/composition-api";
import UserRepositories from "@/components/UserRepositories.vue";
import { useQuery, useResult } from "@vue/apollo-composable";
import { GetRepositories } from "../queries/getRepositories";
import { User } from "@/generated/graphql";
export default defineComponent({
  name: "user-page",
  components: {
    UserRepositories,
  },
  props: {
    name: {
      type: String,
    },
  },
  setup(props, { root }) {
    const goToSearchPage = computed(() => ({
      name: root.$routeNames.SEARCH,
    }));
    const { result } = useQuery(GetRepositories, {
      login: props.name,
    });
    const repositories = useResult(
      result,
      null,
      (data) => data.user.repositories.nodes
    );
    const user = useResult(result, null, (data) => data.user.name);
    return { repositories, user, goToSearchPage };
  },
});
</script>

<style lang="scss" scoped></style>
