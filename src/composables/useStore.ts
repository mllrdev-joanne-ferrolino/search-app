import { reactive, ref } from "@vue/composition-api";
export const Store = {
  searchQueries: [] as string[],
  searchQuery: ""
};
export function useStore() {
  const storeSearchQueries = reactive<string[]>(Store.searchQueries);
  const searchQuery = ref(Store.searchQuery);

  function addSearchQueries(textQuery: string) {
    storeSearchQueries.push(textQuery);
  }

  return { 
    addSearchQueries,
    searchQuery,
    storeSearchQueries
  };
}
