<template>
  <div v-if="searchResult" class="item">
    <router-link v-slot="{ navigate }" :to="goToUserPage">
      <div class="info" @click="navigate">
        <span class="name">{{ searchResult.name }}</span>
        <span class="login">{{ searchResult.login }}</span>
        <div class="bio">{{ searchResult.bio }}</div>
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
  display: contents;
  width: 80%;
  margin: 10px;
  text-align: left;
  padding: 5px;
  span {
    margin: 5px;
  }

  div {
    padding: 5px;
    border-radius: 5px;
  }
  .info {
    border: 2px solid rgb(213, 214, 216);
    margin-bottom: 5px;
  }
  .name {
    font-weight: bold;
    color: rgb(90, 90, 240);
  }
  .bio {
    font-size: 14px;
  }
}
div:hover {
  background-color: rgb(213, 214, 216);
}
</style>
