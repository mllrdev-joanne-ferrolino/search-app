import { GetUsersQuery } from "./../generated/graphql";
import { reactive } from "@vue/composition-api";
import { useGetUsersQuery, SearchType } from "@/generated/graphql";
export const Store = {
  searchResults: [] as GetUsersQuery[],
};
export function useStore() {
  const storeSearchResults = reactive<GetUsersQuery[]>(Store.searchResults);

  function getSearchResults(textQuery: string) {
    
    const { result } = useGetUsersQuery({
      query: textQuery,
      type: SearchType.User,
    });
    console.log(result.value);
    storeSearchResults.push(result.value);
  }
  return { getSearchResults, storeSearchResults };
}
