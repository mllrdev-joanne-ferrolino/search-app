<template>
  <div>
    <p class="user-name">{{ user }}</p>
    <p>Repositories</p>
    <div class="item" v-for="repository in repositories" :key="repository.id">
      <p class="repository-name">{{ repository.name }}</p>
      <p class="repository-description">{{ repository.description }}</p>
    </div>
  </div>
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
.user-name {
  margin-left: 10px;
  margin-top: 10px;
  font-weight: bold;
  font-size: 18px;
}
.item {
  display: flex;
  width: 80%;
  margin: 10px;
  text-align: left;
  padding: 5px;
  border-radius: 10px;
  .repository-description {
    font-size: 14px;
  }
}
</style>
