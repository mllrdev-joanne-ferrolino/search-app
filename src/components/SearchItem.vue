<template>
  <div v-if="searchResult" class="item">
    <router-link v-slot="{ navigate }" :to="goToUserPage">
      <div @click="navigate">
        <p>
          <span class="name">{{ searchResult.name }}</span> -
          {{ searchResult.login }}
        </p>
        <p class="bio">{{ searchResult.bio }}</p>
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

<style lang="scss" scoped>
.item {
  display: flex;
  width: 80%;
  margin: 10px;
  text-align: left;
  padding: 5px;
  border-radius: 10px;
  .name {
    font-weight: bold;
  }
  .bio {
    font-size: 14px;
  }
}
div:hover {
    background-color: rgb(213, 214, 216);
  }
</style>
