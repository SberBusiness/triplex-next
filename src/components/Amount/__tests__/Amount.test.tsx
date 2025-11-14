import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Amount } from "@sberbusiness/triplex-next/components/";

const getAmount = () => screen.getByTestId("amount");

describe("Amount", () => {
    it("Should render formatted amount with default fraction length", () => {
        render(<Amount value="1200000" data-testid="amount" />);

        const amount = getAmount();
        expect(amount).toBeInTheDocument();
        expect(amount).toHaveTextContent(/1\s200\s000,00/);
    });

    it("Should apply given currency", () => {
        render(<Amount value="1200000" currency="USD" data-testid="amount" />);

        const amount = getAmount();
        expect(amount).toHaveTextContent(/1\s200\s000,00/);
        expect(amount).toHaveTextContent(/USD/);
    });

    it("Should apply given fractionLength", () => {
        render(<Amount value="1234.567" fractionLength={3} data-testid="amount" />);
        expect(getAmount()).toHaveTextContent(/1\s234,567/);
    });

    it("Should add adaptive class when adaptive is set", () => {
        render(<Amount value="12345678901234" adaptive data-testid="amount" />);

        const amount = getAmount();
        expect(amount).toHaveClass("adaptive");
    });
});
