import { screen } from "@testing-library/react";
import ProfileWrapper from "../components/ProfileWrapper";
import { renderWithProviders } from "../../../test/utils";
import { profileLoader } from "../../core/api/loaders";
import userEvent from "@testing-library/user-event";
import { server } from "../../../test/server";
import { http, HttpResponse } from "msw";

describe("Profile", () => {
  it("renders user's information and statistics", async () => {
    renderWithProviders(<ProfileWrapper />, {
      route: "/:username",
      url: "/user_1",
      loader: profileLoader,
    });

    const usernameHeading = await screen.findByRole("heading", { level: 2 });
    expect(usernameHeading).toBeInTheDocument();
    expect(usernameHeading).toHaveTextContent("user_1");

    expect(
      screen.getByText(
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sed sapien fermentum, condimentum nunc quis, rutrum neque.",
      ),
    ).toBeInTheDocument();
    expect(
      await screen.getByText(
        (_, element) => element?.textContent === "1 followers",
      ),
    ).toBeInTheDocument();
    expect(
      await screen.getByText(
        (_, element) => element?.textContent === "3 following",
      ),
    ).toBeInTheDocument();
    expect(
      await screen.getByText(
        (_, element) => element?.textContent === "5 posts",
      ),
    ).toBeInTheDocument();
  });

  it("renders profile picture correctly when available", async () => {
    renderWithProviders(<ProfileWrapper />, {
      route: "/:username",
      url: "/user_1",
      loader: profileLoader,
    });

    const profilePicture = await screen.findByRole<HTMLImageElement>("img");
    expect(profilePicture.src).toContain("profile_1_url");
    expect(profilePicture.alt).toContain("User 1 profile picture");
  });

  it("renders default profile picture when none was provided", async () => {
    renderWithProviders(<ProfileWrapper />, {
      route: "/:username",
      url: "/user_3",
      loader: profileLoader,
    });

    const usernameHeading = await screen.findByRole("heading", { level: 2 });
    expect(usernameHeading).toHaveTextContent("user_3");

    const image = await screen.findByTitle("Default profile picture");
    expect(image).toBeInTheDocument();
  });

  it("set posts as default selected tab ", async () => {
    renderWithProviders(<ProfileWrapper />, {
      route: "/:username",
      url: "/user_1",
      loader: profileLoader,
    });

    const postsTab = await screen.findByRole("tab", { name: "Posts" });
    const savedTab = await screen.findByRole("tab", { name: "Saved" });

    expect(postsTab).toHaveAttribute("aria-selected", "true");
    expect(savedTab).toHaveAttribute("aria-selected", "false");
  });

  it("allows different user to follow", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ProfileWrapper />, {
      route: "/:username",
      url: "/user_3",
      loader: profileLoader,
    });

    const usernameHeading = await screen.findByRole("heading", { level: 2 });
    expect(usernameHeading).toHaveTextContent("user_3");

    const followButton = await screen.findByRole("button", { name: "Follow" });
    expect(followButton).toBeInTheDocument();

    server.use(
      http.get(
        "/api/follows/:id",
        ({ params }) => {
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
        },
        { once: true },
      ),
    );

    await user.click(followButton);

    expect(
      await screen.findByRole("button", { name: "Following" }),
    ).toBeInTheDocument();
  });

  it("does not render follow button for its owner", async () => {
    renderWithProviders(<ProfileWrapper />, {
      route: "/:username",
      url: "/user_1",
      loader: profileLoader,
    });

    const usernameHeading = await screen.findByRole("heading", { level: 2 });
    expect(usernameHeading).toHaveTextContent("user_1");

    expect(
      await screen.findByRole("button", { name: "Follow" }),
    ).not.toBeInTheDocument();
  });

  it("allows user to remove profile picture", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ProfileWrapper />, {
      route: "/:username",
      url: "/user_1",
      loader: profileLoader,
    });

    const modalButton = await screen.findByRole("button", {
      name: "Modify profile picture",
    });
    expect(modalButton).toBeInTheDocument();
    await user.click(modalButton);

    server.use(
      http.get(
        "/api/users",
        () => {
          return HttpResponse.json(
            [
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
              },
            ],
            { status: 200 },
          );
        },
        { once: true },
      ),
    );

    const changeHeading = await screen.findByText("Change profile picture");
    expect(changeHeading).toBeInTheDocument();

    const deleteButton = await screen.findByRole("button", {
      name: "Remove current photo",
    });
    await user.click(deleteButton);

    const image = await screen.findByTitle("Default profile picture");
    expect(image).toBeInTheDocument();

    screen.debug(undefined, Infinity);
  });

  it("allows user to upload profile picture", async () => {
    server.use(
      http.get(
        "/",
        () => {
          return HttpResponse.json(
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
            },
            { status: 200 },
          );
        },
        { once: true },
      ),
    );
    const user = userEvent.setup();
    renderWithProviders(<ProfileWrapper />, {
      route: "/:username",
      url: "/user_1",
      loader: profileLoader,
    });

    const modalButton = await screen.findByRole("button", {
      name: "Modify profile picture",
    });
    expect(modalButton).toBeInTheDocument();
    await user.click(modalButton);

    const changeHeading = await screen.findByText("Change profile picture");
    expect(changeHeading).toBeInTheDocument();

    server.restoreHandlers();

    const file = new File(["test-image"], "profile_1_url", {
      type: "image/png",
    });
    const editButton = await screen.findByRole("button", {
      name: "Upload new photo",
    });
    await user.click(editButton);
    const fileInput = screen.getByLabelText("Profile picture");
    await user.upload(fileInput, file);

    const profilePicture = await screen.findByRole<HTMLImageElement>("img");
    expect(profilePicture.src).toContain("profile_1_url");
    expect(profilePicture.alt).toContain("User 1 profile picture");
  });
});
