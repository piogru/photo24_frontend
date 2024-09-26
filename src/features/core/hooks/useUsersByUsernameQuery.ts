import { useQuery } from "@tanstack/react-query";
import { usersByUsernameQuery } from "../api/queries";

export default function useUsersByUsernameQuery(
  username: string,
  partial: boolean = false,
) {
  return useQuery({
    ...usersByUsernameQuery(username, partial),
    enabled: !!username,
  });
}
