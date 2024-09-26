import { useQuery } from "@tanstack/react-query";
import { usersByUsernameQuery } from "../api/queries";

export default function useUsersByUsernameQuery(username: string) {
  return useQuery({
    ...usersByUsernameQuery(username),
    enabled: !!username,
  });
}
