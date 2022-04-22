import { fireEvent, render, within, waitFor } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { Coin } from "../interfaces";
import { SearchBar } from "./SearchBar";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../styles";
import { SelectedCoins } from "../SelectedCoins/SelectedCoins";
import userEvent from "@testing-library/user-event";

const default_props = {
  coins: [],
};

describe("SearchBar Component", () => {
  test("displays a search bar", () => {
    const { getByPlaceholderText } = render(
      <RecoilRoot>
        <SearchBar {...default_props} />
      </RecoilRoot>
    );

    const searchBar = getByPlaceholderText("Search");

    expect(searchBar).toBeInTheDocument();
  });

  test("displays a magnifying icon in the search bar", () => {
    const { getByTestId } = render(
      <RecoilRoot>
        <SearchBar {...default_props} />
      </RecoilRoot>
    );

    const searchIcon = getByTestId("SearchIcon");

    expect(searchIcon).toBeInTheDocument();
  });

  test("as a user searches for coins, the search bar filters for results by name", () => {
    const coins: Coin[] = [
      { id: "bitcoin", symbol: "btc", name: "Bitcoin" },
      { id: "ethereum", symbol: "ethereum", name: "Ethereum" },
      { id: "solana", symbol: "sol", name: "Solana" },
    ];

    const { getByTestId } = render(
      <RecoilRoot>
        <SearchBar coins={coins} />
      </RecoilRoot>
    );

    const autoCompleteSearch = getByTestId("autocomplete-search");
    const input = within(autoCompleteSearch).getByRole("combobox");

    autoCompleteSearch.focus();

    fireEvent.change(input, { target: { value: "bitcoi" } });
    fireEvent.keyDown(autoCompleteSearch, { key: "ArrowDown" });
    fireEvent.keyDown(autoCompleteSearch, { key: "Enter" });

    expect(input).toHaveValue("Bitcoin");
  });

  test("display error when user selects more than 10 coins", () => {
    const coins: Coin[] = [
      { id: "coin1", symbol: "coin1", name: "Coin1" },
      { id: "coin2", symbol: "coin2", name: "Coin2" },
      { id: "coin3", symbol: "coin3", name: "Coin3" },
      { id: "coin4", symbol: "coin4", name: "Coin4" },
      { id: "coin5", symbol: "coin5", name: "Coin5" },
      { id: "coin6", symbol: "coin6", name: "Coin6" },
      { id: "coin7", symbol: "coin7", name: "Coin7" },
      { id: "coin8", symbol: "coin8", name: "Coin8" },
      { id: "coin9", symbol: "coin9", name: "Coin9" },
      { id: "coin10", symbol: "coin10", name: "Coin10" },
      { id: "coin11", symbol: "coin11", name: "Coin11" },
    ];

    const { getByTestId, getByRole } = render(
      <RecoilRoot>
        <SearchBar coins={coins} />
      </RecoilRoot>
    );

    const autoCompleteSearch = getByTestId("autocomplete-search");
    const input = within(autoCompleteSearch).getByRole("combobox");

    for (let i = 0; i < coins.length; i++) {
      fireEvent.change(input, { target: { value: "coin" } });
      for (let j = 0; j <= i; j++) {
        fireEvent.keyDown(autoCompleteSearch, { key: "ArrowDown" });
      }
      fireEvent.keyDown(autoCompleteSearch, { key: "Enter" });
      fireEvent.change(input, { target: { value: "" } });
    }

    const errorMessage = getByRole("combobox", {
      description:
        "You can only select 10 coins. Please remove a coin to select another.",
    });
    expect(errorMessage).toBeInTheDocument();
  });

  test("input text field is disabled when user has selected 10 coins", () => {
    const coins: Coin[] = [
      { id: "coin1", symbol: "coin1", name: "Coin1" },
      { id: "coin2", symbol: "coin2", name: "Coin2" },
      { id: "coin3", symbol: "coin3", name: "Coin3" },
      { id: "coin4", symbol: "coin4", name: "Coin4" },
      { id: "coin5", symbol: "coin5", name: "Coin5" },
      { id: "coin6", symbol: "coin6", name: "Coin6" },
      { id: "coin7", symbol: "coin7", name: "Coin7" },
      { id: "coin8", symbol: "coin8", name: "Coin8" },
      { id: "coin9", symbol: "coin9", name: "Coin9" },
      { id: "coin10", symbol: "coin10", name: "Coin10" },
      { id: "coin11", symbol: "coin11", name: "Coin11" },
    ];

    const { getByTestId } = render(
      <RecoilRoot>
        <SearchBar coins={coins} />
      </RecoilRoot>
    );

    const autoCompleteSearch = getByTestId("autocomplete-search");
    const input = within(autoCompleteSearch).getByRole("combobox");

    for (let i = 0; i < coins.length; i++) {
      fireEvent.change(input, { target: { value: "coin" } });
      for (let j = 0; j <= i; j++) {
        fireEvent.keyDown(autoCompleteSearch, { key: "ArrowDown" });
      }
      fireEvent.keyDown(autoCompleteSearch, { key: "Enter" });
      fireEvent.change(input, { target: { value: "" } });
    }

    expect(input).toBeDisabled();
  });

  test("input text field is enabled when user removes a coin out of 10", async () => {
    const coins: Coin[] = [
      { id: "coin1", symbol: "coin1", name: "Coin1" },
      { id: "coin2", symbol: "coin2", name: "Coin2" },
      { id: "coin3", symbol: "coin3", name: "Coin3" },
      { id: "coin4", symbol: "coin4", name: "Coin4" },
      { id: "coin5", symbol: "coin5", name: "Coin5" },
      { id: "coin6", symbol: "coin6", name: "Coin6" },
      { id: "coin7", symbol: "coin7", name: "Coin7" },
      { id: "coin8", symbol: "coin8", name: "Coin8" },
      { id: "coin9", symbol: "coin9", name: "Coin9" },
      { id: "coin10", symbol: "coin10", name: "Coin10" },
      { id: "coin11", symbol: "coin11", name: "Coin11" },
    ];

    const { getByTestId, getByText } = render(
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <SearchBar coins={coins} />
          <SelectedCoins />
        </ThemeProvider>
      </RecoilRoot>
    );

    const autoCompleteSearch = getByTestId("autocomplete-search");
    const input = within(autoCompleteSearch).getByRole("combobox");

    for (let i = 0; i < coins.length; i++) {
      fireEvent.change(input, { target: { value: "coin" } });
      for (let j = 0; j <= i; j++) {
        fireEvent.keyDown(autoCompleteSearch, { key: "ArrowDown" });
      }
      fireEvent.keyDown(autoCompleteSearch, { key: "Enter" });
      fireEvent.change(input, { target: { value: "" } });
    }

    const gridContainer = getByTestId("coin-grid");
    const buttons = within(gridContainer).getAllByRole("button");

    for (let i = 0; i < buttons.length; i++) {
      const button = buttons[i];
      userEvent.click(button);
    }

    await waitFor(() => {
      expect(input).toBeEnabled();
    });
  });

  test("error message is removed when user unselects a coin", async () => {
    const coins: Coin[] = [
      { id: "coin1", symbol: "coin1", name: "Coin1" },
      { id: "coin2", symbol: "coin2", name: "Coin2" },
      { id: "coin3", symbol: "coin3", name: "Coin3" },
      { id: "coin4", symbol: "coin4", name: "Coin4" },
      { id: "coin5", symbol: "coin5", name: "Coin5" },
      { id: "coin6", symbol: "coin6", name: "Coin6" },
      { id: "coin7", symbol: "coin7", name: "Coin7" },
      { id: "coin8", symbol: "coin8", name: "Coin8" },
      { id: "coin9", symbol: "coin9", name: "Coin9" },
      { id: "coin10", symbol: "coin10", name: "Coin10" },
      { id: "coin11", symbol: "coin11", name: "Coin11" },
    ];

    const { getByTestId, getByText } = render(
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <SearchBar coins={coins} />
          <SelectedCoins />
        </ThemeProvider>
      </RecoilRoot>
    );

    const autoCompleteSearch = getByTestId("autocomplete-search");
    const input = within(autoCompleteSearch).getByRole("combobox");

    for (let i = 0; i < coins.length; i++) {
      fireEvent.change(input, { target: { value: "coin" } });
      for (let j = 0; j <= i; j++) {
        fireEvent.keyDown(autoCompleteSearch, { key: "ArrowDown" });
      }
      fireEvent.keyDown(autoCompleteSearch, { key: "Enter" });
      fireEvent.change(input, { target: { value: "" } });
    }

    const coin1 = getByText("Coin1");
    const errorMessage = getByText(
      "You can only select 10 coins. Please remove a coin to select another."
    );

    userEvent.click(coin1);

    await waitFor(() => {
      expect(errorMessage).not.toBeInTheDocument();
    });
  });
});
