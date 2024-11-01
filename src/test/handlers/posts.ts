import { http, HttpResponse } from "msw";

const user1 = {
  _id: "user_1_id",
  name: "user_1",
  profilePic: {
    _id: "profile_1_id",
    publicId: "profiles/profile_1_id",
    url: "profile_1_url",
    altText: "User 1 profile picture",
    createdAt: "2024-10-02T12:48:14.732Z",
    updatedAt: "2024-10-02T12:48:14.732Z",
    hwRatio: "100%",
  },
};

export const handlers = [
  http.get("/api/posts", () => {
    return HttpResponse.json(
      [
        {
          _id: "post_1_id",
          user: user1,
          photos: [
            {
              _id: "photo_1_id",
              publicId: "photos/photo_1_id",
              url: "photo_1_url",
              altText: "Test photo #1",
              hwRatio: "100%",
              width: 320,
              height: 320,
              createdAt: "2024-10-21T12:59:17.663Z",
              updatedAt: "2024-10-21T12:59:17.663Z",
            },
          ],
          caption:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam efficitur rutrum nunc non efficitur. Nulla pharetra leo sed felis ullamcorper malesuada.",
          likes: 0,
          hideLikes: false,
          commentsOff: false,
          comments: [],
          createdAt: "2024-10-21T12:59:17.664Z",
          updatedAt: "2024-10-21T12:59:17.664Z",
          __v: 0,
        },
        {
          _id: "post_2_id",
          user: user1,
          photos: [
            {
              _id: "photo_2_id",
              publicId: "photos/photo_2_id",
              url: "photo_2_url",
              altText: "",
              hwRatio: "83.72641509433963%",
              width: 424,
              height: 355,
              createdAt: "2024-10-18T09:00:52.029Z",
              updatedAt: "2024-10-18T09:00:52.029Z",
            },
            {
              _id: "photo_3_id",
              publicId: "photos/photo_3_id",
              url: "photo_3_url",
              altText: "",
              hwRatio: "56.25%",
              width: 1920,
              height: 1080,
              createdAt: "2024-10-18T09:00:52.030Z",
              updatedAt: "2024-10-18T09:00:52.030Z",
            },
          ],
          caption: "",
          likes: 1,
          hideLikes: false,
          commentsOff: false,
          comments: [],
          createdAt: "2024-10-18T09:00:52.030Z",
          updatedAt: "2024-10-20T09:59:41.966Z",
          __v: 0,
        },
      ],
      { status: 200 },
    );
  }),

  http.post("/api/posts", () => {
    return HttpResponse.json(
      {
        _id: "post_1_id",
        user: "user_1_id",
        photos: [
          {
            _id: "photo_1_id",
            publicId: "photos/photo_1_id",
            url: "photo_1_url",
            altText: "",
            hwRatio: "100%",
            width: 320,
            height: 320,
            createdAt: "2024-10-21T12:59:17.663Z",
            updatedAt: "2024-10-21T12:59:17.663Z",
          },
        ],
        caption:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam efficitur rutrum nunc non efficitur. Nulla pharetra leo sed felis ullamcorper malesuada.",
        likes: 0,
        hideLikes: false,
        commentsOff: false,
        comments: [],
        createdAt: "2024-10-21T12:59:17.664Z",
        updatedAt: "2024-10-21T12:59:17.664Z",
        __v: 0,
      },
      { status: 201 },
    );
  }),

  http.delete("/api/posts", () => {
    return HttpResponse.json(
      {
        message: "Post deleted successfully.",
      },
      { status: 200 },
    );
  }),
];
