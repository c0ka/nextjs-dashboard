import { render, screen } from "@testing-library/react";
import { Pricing } from "./pricing";

describe("Pricing Component", () => {
  it("renders the pricing header", () => {
    render(<Pricing />);
    expect(screen.getByText("Simple, transparent pricing")).toBeInTheDocument();
    expect(
      screen.getByText("Choose the plan that's right for your business."),
    ).toBeInTheDocument();
  });

  it("renders all three pricing plans", () => {
    render(<Pricing />);

    // Check titles
    expect(
      screen.getByRole("heading", { name: /starter/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /pro/i })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /enterprise/i }),
    ).toBeInTheDocument();
  });

  it("displays correct pricing details", () => {
    render(<Pricing />);

    // Starter
    expect(screen.getByText("$0")).toBeInTheDocument();

    // Pro
    expect(screen.getByText("$29")).toBeInTheDocument();
    expect(screen.getByText("Most Popular")).toBeInTheDocument();

    // Enterprise
    expect(screen.getByText("Custom")).toBeInTheDocument();
  });

  it("renders feature lists", () => {
    render(<Pricing />);

    expect(screen.getByText("Basic invoicing")).toBeInTheDocument();
    expect(screen.getByText("Unlimited customers")).toBeInTheDocument();
    expect(screen.getByText("SSO & Advanced Security")).toBeInTheDocument();
  });
});
