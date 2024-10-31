import { http, HttpResponse } from "msw";

const followList = [];

export const handlers = [
  http.get("/api/follows/:id", ({ request, params }) => {
    return HttpResponse.json(null, { status: 200 });
  }),
];
