/* eslint-disable @typescript-eslint/no-unused-vars */
import About from "@/pages/About";
import { render, RenderResult } from "@testing-library/react";


describe("About", () => {
    it("renders About component correctly", () => {
        const page = render(<About />);
        expect(page).toMatchSnapshot();
    });
});
function expect(_page: RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>) {
    throw new Error("Function not implemented.");
}

