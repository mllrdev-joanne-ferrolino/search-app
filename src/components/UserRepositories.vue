<template>
  <div>
    <h3>{{ user }}</h3>
    <p>Repositories:</p>
    <div v-for="repository in repositories" :key="repository.id">
      {{ repository.name }}
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
    },
    repositories: {
      type: Array as PropType<User[]>,
    },
  },
});
</script>

<style lang="scss" scoped></style>
