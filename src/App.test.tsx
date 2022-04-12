import { render } from "@testing-library/react";
import App from "./App";

test('displays hello world',async () => {
    const { getByText } = render(<App />)
    expect(getByText("Hello World!")).toBeInTheDocument();
})
