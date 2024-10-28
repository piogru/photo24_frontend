import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("http://localhost:3000/api/users", () => {
    return HttpResponse.json(
      [
        {
          _id: "user_1",
          name: "User 1",
          createdAt: "2024-08-23T14:09:12.919Z",
          updatedAt: "2024-09-27T13:58:20.429Z",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sed sapien fermentum, condimentum nunc quis, rutrum neque.",
          followers: 1,
          following: 0,
          posts: 0,
          profilePic: {
            _id: "profile_1",
            publicId: "profiles/profile_1",
            url: "profile_1_url",
            altText: "User 1 profile picture",
            createdAt: "2024-10-03T12:33:38.497Z",
            updatedAt: "2024-10-03T12:33:38.497Z",
            hwRatio: "100%",
          },
        },
        {
          _id: "user_2",
          name: "User 2",
          createdAt: "2024-08-27T11:17:31.921Z",
          updatedAt: "2024-10-28T10:58:20.372Z",
          description: "",
          followers: 2,
          following: 7,
          posts: 11,
          profilePic: {
            _id: "profile_2",
            publicId: "profiles/jrux4wiiigifizrwckr7",
            url: "profile_2_url",
            altText: "User 2 profile picture",
            createdAt: "2024-10-02T12:48:14.732Z",
            updatedAt: "2024-10-02T12:48:14.732Z",
            hwRatio: "100%",
          },
        },
        {
          _id: "user_3",
          name: "User 3",
          description: "",
          posts: 2,
          followers: 1,
          following: 8,
          createdAt: "2024-09-23T08:26:58.743Z",
          updatedAt: "2024-10-21T12:58:24.110Z",
        },
      ],
      { status: 200 },
    );
  }),

  http.get("http://localhost:3000/api/users/recommended", () => {
    return HttpResponse.json(
      [
        {
          _id: "user_1",
          name: "User 1",
          profilePic: {
            _id: "profile_1",
            publicId: "profiles/profile_1",
            url: "profile_1_url",
            altText: "User 1 profile picture",
            hwRatio: "100%",
            createdAt: "2024-10-12T11:24:48.076Z",
            updatedAt: "2024-10-12T11:24:48.076Z",
          },
        },
        {
          _id: "user_2",
          name: "User 2",
        },
      ],
      { status: 200 },
    );
  }),

  http.patch("http://localhost:3000/api/users/self", () => {
    return HttpResponse.json(
      {
        _id: "user_1",
        name: "User 1",
        createdAt: "2024-08-27T11:17:31.921Z",
        updatedAt: "2024-10-28T11:58:58.386Z",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sed sapien fermentum, condimentum nunc quis, rutrum neque.",
        followers: 1,
        following: 0,
        posts: 0,
        profilePic: {
          _id: "profile_1_updated",
          publicId: "profiles/profile_1_updated",
          url: "profile_1_updated_url",
          altText: "User 1 updated profile picture",
          hwRatio: "100%",
          createdAt: "2024-10-28T11:58:58.386Z",
          updatedAt: "2024-10-28T11:58:58.386Z",
        },
      },
      { status: 200 },
    );
  }),

  http.delete("http://localhost:3000/api/users/self/profilePic", () => {
    return HttpResponse.json(
      {
        _id: "user_1",
        name: "User 1",
        createdAt: "2024-08-27T11:17:31.921Z",
        updatedAt: "2024-10-28T12:01:46.060Z",
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
