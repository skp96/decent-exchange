import { render, within, fireEvent, waitFor } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { SelectedCoins } from "./SelectedCoins";
import { SearchBar } from "../Search/SearchBar";
import { Coin } from "../interfaces";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../styles";
import userEvent from "@testing-library/user-event";

describe("SelectCoins Component", () => {
  test("displays title for selected coins", () => {
    const { getByText } = render(
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <SelectedCoins />
        </ThemeProvider>
      </RecoilRoot>
    );

    expect(getByText("Currently Selected Crypto Coins")).toBeInTheDocument();
  });

  test("display instructions on how to remove coins", async () => {
    const coins: Coin[] = [
      { id: "coin1", symbol: "coin1", name: "Coin1", colorChoice: 0 },
    ];

    const { getByText, getByTestId } = render(
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <SearchBar coins={coins} />
          <SelectedCoins />
        </ThemeProvider>
      </RecoilRoot>
    );

    const autocomplete = getByTestId("autocomplete-search");
    const input = within(autocomplete).getByRole("combobox");

    fireEvent.change(input, { target: { value: "coin" } });
    fireEvent.keyDown(autocomplete, { key: "ArrowDown" });
    fireEvent.keyDown(autocomplete, { key: "Enter" });
    fireEvent.change(input, { target: { value: "" } });

    await waitFor(() => {
      expect(getByText("Select a coin to remove it.")).toBeInTheDocument();
    });
  });

  test("when user selects coins, those coins are displayed", () => {
    const coins: Coin[] = [
      { id: "coin1", symbol: "coin1", name: "Coin1", colorChoice: 0 },
      { id: "coin2", symbol: "coin2", name: "Coin2", colorChoice: 1 },
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

    expect(getByText("Coin1")).toBeInTheDocument();
    expect(getByText("Coin2")).toBeInTheDocument();
  });

  test("when user selects a displayed coin, it is removed", async () => {
    const coins: Coin[] = [
      { id: "coin1", symbol: "coin1", name: "Coin1", colorChoice: 0 },
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

    fireEvent.change(input, { target: { value: "coin" } });
    fireEvent.keyDown(autoCompleteSearch, { key: "ArrowDown" });

    fireEvent.keyDown(autoCompleteSearch, { key: "Enter" });
    fireEvent.change(input, { target: { value: "" } });

    const coin1 = getByText("Coin1");

    userEvent.click(coin1);

    await waitFor(() => {
      expect(coin1).not.toBeInTheDocument();
    });
  });
});
