// client/__tests__/Auth.test.js

import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import Auth from "../src/components/Auth/Auth";

const mockStore = configureStore([]);

describe("Auth Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: { token: null, isLoading: false, error: null },
    });
  });

  test("renders login form", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Auth />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Log In/i)).toBeInTheDocument();
  });

  test("renders sign up form when switching", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Auth />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText(/Sign up/i));
    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
  });
});
