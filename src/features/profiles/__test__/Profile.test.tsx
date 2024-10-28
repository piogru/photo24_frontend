import { render, screen, waitFor } from "@testing-library/react";
// import { Routes, Route } from "react-router-dom"
// import { renderWithProviders } from "../../../utils/test-utils"
import userEvent from "@testing-library/user-event";
import ProfileWrapper from "../components/ProfileWrapper";

describe("Profile", () => {
  it("renders the photo correctly", () => {
    render(<ProfileWrapper />);

    screen.debug(); // prints out the jsx in the App component unto the command line
  });

  it("renders the author correctly", () => {});

  it("renders camera params correctly", () => {});

  it("renders correct number of comments", () => {});

  it("increases photo like count after like", () => {});

  it("decreases photo like count after removing like", () => {});
});
