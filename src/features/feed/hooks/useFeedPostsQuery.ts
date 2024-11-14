import { useQuery } from "@tanstack/react-query";
import { feedPostsQuery } from "../api/queries";

export default function useFeedPostsQuery(variant: string) {
  return useQuery(feedPostsQuery(variant));
}
