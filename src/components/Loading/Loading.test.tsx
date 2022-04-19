import { render } from "@testing-library/react";
import { Loading } from './Loading';

describe("Loading Component", () => {
    test("displays a loading gif", () => {
        const { getByRole } = render(<Loading />);
        
        const loading = getByRole("heading");
        expect(loading).toBeInTheDocument();
    });
});
