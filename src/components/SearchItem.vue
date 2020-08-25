<template>
  <div v-if="searchResult">
    <router-link v-slot="{ navigate }" :to="goToUserPage">
      <div @click="navigate">
        <p>{{ searchResult.name }} - {{ searchResult.login }}</p>
      </div>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "@vue/composition-api";
import { User } from "@/generated/graphql";
export default defineComponent({
  name: "search-item",
  props: {
    searchResult: {
      type: Object as PropType<User>,
    },
  },
  setup(props, { root }) {
    const goToUserPage = computed(() => ({
      name: root.$routeNames.USER,
      params: { name: props.searchResult?.login },
    }));
    return { goToUserPage };
  },
});
</script>

<style lang="scss" scoped></style>
