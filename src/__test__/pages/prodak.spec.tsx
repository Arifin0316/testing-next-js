import ProdakPages from "@/pages/prodak";
import { render } from "@testing-library/react";
import jest from "next/dist/build/jest/jest";
import { useRouter } from "next/router";

// Mocking next/router
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("ProdakPages", () => {
  beforeEach(() => {
    // Mengatur nilai mock untuk useRouter sebelum setiap pengujian
    (useRouter as jest.Mock).mockReturnValue({
      route: "/prodak",
      pathname: "/prodak",
      query: {},
      asPath: "/prodak",
    });
  });

  it("renders ProdakPages component correctly", () => {
    const page = render(<ProdakPages />);
    expect(page).toMatchSnapshot();
  });
});
