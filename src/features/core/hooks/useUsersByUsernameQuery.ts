import { useQuery } from "@tanstack/react-query";
import { usersByUsernameQuery } from "../api/queries";
import User from "../types/user";

export default function useUsersByUsernameQuery(
  username: string,
  partial: boolean = false,
  initialData?: User[],
) {
  return useQuery({
    ...usersByUsernameQuery(username, partial),
    initialData: initialData || [],
    enabled: !!username,
  });
}
