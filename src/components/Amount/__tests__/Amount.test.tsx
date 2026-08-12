import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Amount } from "@sberbusiness/triplex-next/components/";

const NBSP = "\u00A0";
const MINUS_SIGN = "\u2212";
const HYPHEN_MINUS = "\u002D";

const getAmount = () => screen.getByTestId("amount");
/** Внутренний span с самой суммой (без обозначения валюты). */
const getAmountValue = () => getAmount().firstElementChild as HTMLElement;

describe("Amount", () => {
    it("Should render formatted amount with default fraction length", () => {
        render(<Amount value="1200000" data-testid="amount" />);

        const amount = getAmount();
        expect(amount).toBeInTheDocument();
        expect(amount).toHaveTextContent(/1\s200\s000,00/);
    });

    it("Should render root as span element", () => {
        render(<Amount value="1200000" data-testid="amount" />);

        expect(getAmount().tagName).toBe("SPAN");
    });

    it("Should apply given currency", () => {
        render(<Amount value="1200000" currency="USD" data-testid="amount" />);

        const amount = getAmount();
        expect(amount).toHaveTextContent(/1\s200\s000,00/);
        expect(amount).toHaveTextContent(/USD/);
    });

    it("Should separate currency from amount with non-breaking space", () => {
        render(<Amount value="1" currency="USD" fractionLength={0} data-testid="amount" />);

        expect(getAmount().textContent).toBe(`1${NBSP}USD`);
    });

    it("Should not render currency element when currency is not given", () => {
        render(<Amount value="1200000" data-testid="amount" />);

        expect(getAmount().children).toHaveLength(1);
    });

    it("Should apply currencyTitle to currency element", () => {
        render(<Amount value="1200000" currency="RUB" currencyTitle="Российские рубли" data-testid="amount" />);

        expect(screen.getByTitle("Российские рубли")).toHaveTextContent("RUB");
    });

    it("Should apply given fractionLength", () => {
        render(<Amount value="1234.567" fractionLength={3} data-testid="amount" />);
        expect(getAmount()).toHaveTextContent(/1\s234,567/);
    });

    it("Should render without fraction part when fractionLength is 0", () => {
        render(<Amount value="1234.56" fractionLength={0} data-testid="amount" />);

        expect(getAmount().textContent).toBe(`1${NBSP}234`);
    });

    it("Should truncate instead of rounding the fraction part", () => {
        render(<Amount value="1234.567" fractionLength={2} data-testid="amount" />);

        expect(getAmount().textContent).toBe(`1${NBSP}234,56`);
    });

    it("Should render empty string for empty value", () => {
        render(<Amount value="" data-testid="amount" />);

        expect(getAmount().textContent).toBe("");
    });

    it("Should render zero for non-numeric value", () => {
        render(<Amount value="abc" data-testid="amount" />);

        expect(getAmount().textContent).toBe("0,00");
    });

    it("Should replace hyphen-minus with minus sign for negative value", () => {
        render(<Amount value="-8967452.31" data-testid="amount" />);

        const text = getAmountValue().textContent ?? "";
        // (Accessibility) Скрин-ридеры озвучивают знак минуса U+2212, но не дефис-минус U+002D.
        expect(text.startsWith(MINUS_SIGN)).toBe(true);
        expect(text).not.toContain(HYPHEN_MINUS);
    });

    it("Should keep leading plus sign for positive value", () => {
        render(<Amount value="+8967452.31" data-testid="amount" />);

        expect(getAmountValue().textContent?.startsWith("+")).toBe(true);
    });

    it("Should add adaptive class when adaptive is set", () => {
        render(<Amount value="12345678901234" adaptive data-testid="amount" />);

        const amount = getAmount();
        expect(amount).toHaveClass("adaptive");
    });

    it("Should add adaptive class starting from the threshold length", () => {
        // "123 456 789,00" — ровно 14 символов вместе с разделителями групп.
        render(<Amount value="123456789" adaptive data-testid="amount" />);

        expect(getAmountValue().textContent).toHaveLength(14);
        expect(getAmount()).toHaveClass("adaptive");
    });

    it("Should not add adaptive class below the threshold length", () => {
        // "12 345 678,00" — 13 символов.
        render(<Amount value="12345678" adaptive data-testid="amount" />);

        expect(getAmountValue().textContent).toHaveLength(13);
        expect(getAmount()).not.toHaveClass("adaptive");
    });

    it("Should not add adaptive class when adaptive is not set", () => {
        render(<Amount value="12345678901234" data-testid="amount" />);

        expect(getAmount()).not.toHaveClass("adaptive");
    });

    it("Should not count currency in the adaptive threshold", () => {
        render(<Amount value="12345678" currency="RUB" adaptive data-testid="amount" />);

        expect(getAmount()).not.toHaveClass("adaptive");
    });

    it("Should merge custom className with adaptive class", () => {
        render(<Amount value="12345678901234" adaptive className="customClassName" data-testid="amount" />);

        const amount = getAmount();
        expect(amount).toHaveClass("adaptive");
        expect(amount).toHaveClass("customClassName");
    });

    it("Should pass rest props to root element", () => {
        render(<Amount value="1200000" id="amountId" lang="ru" data-testid="amount" />);

        const amount = getAmount();
        expect(amount).toHaveAttribute("id", "amountId");
        expect(amount).toHaveAttribute("lang", "ru");
    });

    it("Should forward ref to root span element", () => {
        const ref = React.createRef<HTMLSpanElement>();

        render(<Amount value="1200000" ref={ref} data-testid="amount" />);

        expect(ref.current).toBeInstanceOf(HTMLSpanElement);
        expect(ref.current).toBe(getAmount());
    });

    // Здесь container.querySelector оправдан: Testing Library настроена на data-testid,
    // а компонент выставляет собственный атрибут data-test-id — его queries не находят.
    it("Should build test attributes from dataTestId", () => {
        const { container } = render(<Amount value="1200000" currency="RUB" dataTestId="amount" />);

        expect(container.querySelector('[data-test-id="amount__amount"]')).toBeInTheDocument();
        expect(container.querySelector('[data-test-id="amount__currencyName"]')).toBeInTheDocument();
    });

    it("Should not render test attributes without dataTestId", () => {
        const { container } = render(<Amount value="1200000" currency="RUB" />);

        expect(container.querySelector("[data-test-id]")).toBeNull();
    });
});
