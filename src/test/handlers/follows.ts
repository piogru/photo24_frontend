import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/follows/:id", () => {
    return HttpResponse.json(null, { status: 200 });
  }),

  http.post("/api/follows/:id", ({ params }) => {
    return HttpResponse.json(
      {
        follower: "user_1_id",
        target: params.id,
        _id: "follow_1_id",
        createdAt: "2024-11-01T00:09:12.192Z",
        updatedAt: "2024-11-01T00:09:12.192Z",
        __v: 0,
      },
      { status: 200 },
    );
  }),
];
