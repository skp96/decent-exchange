import { fireEvent, render, within } from "@testing-library/react";
import { Coin } from "../interfaces";
import { SearchBar } from './SearchBar';

const default_props = {
    coins: []
}

describe("SearchBar Component", () => {
    test("displays a search bar", () => {
        const { getByPlaceholderText } = render(<SearchBar {...default_props} />);
        
        const searchBar = getByPlaceholderText("Search");

        expect(searchBar).toBeInTheDocument();
    });

    test("displays a magnifying icon in the search bar", () => {
        const { getByTestId } = render(<SearchBar {...default_props} />);
        
        const searchIcon = getByTestId("SearchIcon");

        expect(searchIcon).toBeInTheDocument();
    });

    test("as a user searches for coins, the search bar filters for results by name", () => {
        const coins: Coin[] = [
            { id: "bitcoin", symbol: "btc", name: "Bitcoin" },
            { id: "ethereum", symbol: "ethereum", name: "Ethereum" },
            { id: "solana", symbol: "sol", name: "Solana" }
        ];

        const { getByTestId } = render(<SearchBar coins={coins} />);

        const autoCompleteSearch = getByTestId('autocomplete-search');
        const input = within(autoCompleteSearch).getByRole("combobox");

        autoCompleteSearch.focus();

        fireEvent.change(input, { target: { value: "bitcoi" } });
        fireEvent.keyDown(autoCompleteSearch, { key: "ArrowDown" });
        fireEvent.keyDown(autoCompleteSearch, { key: "Enter" });

        
        expect(input).toHaveValue("Bitcoin")
    });
});
