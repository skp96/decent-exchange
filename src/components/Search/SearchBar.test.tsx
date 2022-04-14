import { render, screen } from "@testing-library/react";
import { Coin } from "../interfaces";
import { SearchBar } from './SearchBar';
import userEvent from '@testing-library/user-event';

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
});
