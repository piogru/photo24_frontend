import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/auth/me", () => {
    return HttpResponse.json(
      {
        _id: "user_1_id",
        name: "user_1",
        createdAt: "2024-08-23T14:09:12.919Z",
        updatedAt: "2024-09-27T13:58:20.429Z",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sed sapien fermentum, condimentum nunc quis, rutrum neque.",
        followers: 1,
        following: 0,
        posts: 0,
      },
      { status: 200 },
    );
  }),
];
