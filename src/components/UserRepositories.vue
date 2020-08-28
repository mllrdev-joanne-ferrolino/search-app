<template>
  <div class="container" v-if="user">
    <p class="user-name">{{ user }}</p>
    <header>Repositories</header>
    <div class="item" v-for="repository in repositories" :key="repository.id">
      <div>
        <p class="repository-name">{{ repository.name }}</p>
        <p class="repository-description">{{ repository.description }}</p>
      </div>
    </div>
  </div>
  <div v-else>No user repositories.</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";
import { User } from "@/generated/graphql";

export default defineComponent({
  name: "user-repositories",
  props: {
    user: {
      type: String,
      required: true,
    },
    repositories: {
      type: Array as PropType<User[]>,
    },
  },
});
</script>

<style lang="scss" scoped>
.container {
  margin-bottom: 5px;
  .user-name {
    margin-left: 10px;
    margin-top: 10px;
    font-weight: bold;
    font-size: 18px;
  }
  header {
    text-align: left;
    padding: 5px;
    font-weight: bold;
  }
  .item {
    display: contents;
    width: 80%;
    margin: 10px;
    text-align: left;
    padding: 5px;
    div {
      border: 3px solid rgb(213, 214, 216);
      border-radius: 10px;
      padding: 5px;
      margin-bottom: 5px;
    }
    .repository-name {
      color: rgb(90, 90, 240);
    }
    .repository-description {
      font-size: 14px;
      margin-left: 8px;
    }
  }
}
</style>
