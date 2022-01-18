import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Kevin } from "../Kevin";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

describe("Kevin", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it("should render Hello Jean when fetch is done", async () => {
    // Mock the window.fetch with resolved promise
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ name: "Jean" }),
      })
    );

    // Render our component
    const { container } = render(<Kevin />);

    // Check we have a loading state as expected
    expect(container).toHaveTextContent("Loading");

    // Wait for the helloParagraph to be updated
    const helloParagraph = await waitFor(() => screen.findByTestId("hello"));

    // Check final state
    expect(helloParagraph).toHaveTextContent("Hello Jean");
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it("should redirect to kevinpage when user clicks the hello", async () => {
    // Mock the window.fetch with resolved promise
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ name: "Jean" }),
      })
    );

    // Create a fake history
    const history = createMemoryHistory();

    // Wrap our component with the router passing the fake history
    const { container } = render(
      <Router history={history}>
        <Kevin />
      </Router>
    );

    expect(container).toHaveTextContent("Loading");

    const helloParagraph = await waitFor(() => screen.findByTestId("hello"));

    expect(container).toHaveTextContent("Hello Jean");
    expect(global.fetch).toHaveBeenCalledTimes(1);

    // Verify we are at "/" and index = 0 (history.length === 0)
    expect(history.index).toBe(0);
    expect(history.location.pathname).toBe("/");

    // Click our paragraph to trigger the redirect
    fireEvent.click(helloParagraph);

    // Verify we are at "/kevinpage" and index = 1 (history.length === 1)
    expect(history.index).toBe(1);
    expect(history.location.pathname).toBe("/kevinpage");
  });

  it("should render Hello Unknown when fetch is done", async () => {
    // Mock the window.fetch with rejected promise
    // @ts-ignore
    global.fetch = jest.fn(() => Promise.reject(new Error("Network Error")));

    // Mock the console error with the dummy function
    const mockConsoleError = jest.spyOn(console, "error").mockImplementation();

    // Render our component
    const { container } = render(<Kevin />);

    expect(container).toHaveTextContent("Loading");

    await waitFor(() => screen.findByTestId("hello"));

    // Verify the fetch failed and set the correct default name
    expect(container).toHaveTextContent("Hello Unknown");

    // Verify the fetch has been called
    expect(global.fetch).toHaveBeenCalledTimes(1);

    // Verify we logged a console.error with the right parameter
    expect(mockConsoleError).toHaveBeenCalledWith(new Error("Network Error"));
  });
});
