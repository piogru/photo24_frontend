import { screen } from "@testing-library/react";
import ProfileWrapper from "../components/ProfileWrapper";
import { renderWithProviders } from "../../../test/utils";
import { profileLoader } from "../../core/api/loaders";

describe("Profile", () => {
  it("renders user's information and statistics", async () => {});

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

  it("renders default profile picture when none was provided", async () => {});

  it("highlights tabs based on selection/route", async () => {});

  it("hides follow button when current user is the owner of profile", async () => {});

  it("allows different user to follow", async () => {});

  it("allows user to remove profile picture", async () => {});

  it("allows user to update profile picture", async () => {});
});
