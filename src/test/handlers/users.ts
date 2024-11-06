import { http, HttpResponse } from "msw";

const userList = [
  {
    _id: "user_1_id",
    name: "user_1",
    createdAt: "2024-08-23T14:09:12.919Z",
    updatedAt: "2024-09-27T13:58:20.429Z",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sed sapien fermentum, condimentum nunc quis, rutrum neque.",
    followers: 1,
    following: 3,
    posts: 5,
    profilePic: {
      _id: "profile_1_id",
      publicId: "profiles/profile_1",
      url: "profile_1_url",
      altText: "User 1 profile picture",
      createdAt: "2024-10-03T12:33:38.497Z",
      updatedAt: "2024-10-03T12:33:38.497Z",
      hwRatio: "100%",
    },
  },
  {
    _id: "user_2_id",
    name: "user_2",
    createdAt: "2024-08-27T11:17:31.921Z",
    updatedAt: "2024-10-28T10:58:20.372Z",
    description: "",
    followers: 1,
    following: 0,
    posts: 0,
    profilePic: {
      _id: "profile_2_id",
      publicId: "profiles/jrux4wiiigifizrwckr7",
      url: "profile_2_url",
      altText: "User 2 profile picture",
      createdAt: "2024-10-02T12:48:14.732Z",
      updatedAt: "2024-10-02T12:48:14.732Z",
      hwRatio: "100%",
    },
  },
  {
    _id: "user_3_id",
    name: "user_3",
    description: "",
    posts: 2,
    followers: 1,
    following: 8,
    createdAt: "2024-09-23T08:26:58.743Z",
    updatedAt: "2024-10-21T12:58:24.110Z",
  },
];

export const handlers = [
  http.get("/api/users", ({ request }) => {
    const url = new URL(request.url);
    const partialFlag = url.searchParams.get("partial");
    const name = url.searchParams.get("name");

    if (name) {
      const response =
        partialFlag ?
          userList.find((item) => item.name.match(name))
        : userList.find((item) => item.name === name);
      return HttpResponse.json([response], { status: 200 });
    }

    return HttpResponse.json(userList, { status: 200 });
  }),

  http.get("/api/users/recommended", () => {
    return HttpResponse.json(
      [
        {
          _id: "user_1_id",
          name: "user_1",
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
          _id: "user_2_id",
          name: "user_2",
        },
      ],
      { status: 200 },
    );
  }),

  http.patch("/api/users/self", () => {
    return HttpResponse.json(
      {
        _id: "user_1_id",
        name: "user_1",
        createdAt: "2024-08-27T11:17:31.921Z",
        updatedAt: "2024-10-28T11:58:58.386Z",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sed sapien fermentum, condimentum nunc quis, rutrum neque.",
        followers: 1,
        following: 3,
        posts: 5,
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

  http.delete("/api/users/self/profilePic", () => {
    return HttpResponse.json(
      {
        _id: "user_1_id",
        name: "user_1",
        createdAt: "2024-08-27T11:17:31.921Z",
        updatedAt: "2024-10-28T12:01:46.060Z",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sed sapien fermentum, condimentum nunc quis, rutrum neque.",
        followers: 1,
        following: 3,
        posts: 5,
      },
      { status: 200 },
    );
  }),
];
