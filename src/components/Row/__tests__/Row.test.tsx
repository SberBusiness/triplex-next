import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Row } from "../Row";
import { Col } from "../../Col";

const getRowDiv = () => screen.getByTestId("row-div");

describe("Row Component", () => {
    describe("Rendering", () => {
        it("should render with default props", () => {
            render(
                <Row data-testid="row-div">
                    <Col>Test content</Col>
                </Row>,
            );

            const row = getRowDiv();
            expect(row).toBeInTheDocument();
        });

        it("should render children correctly", () => {
            render(
                <Row>
                    <Col>First column</Col>
                    <Col>Second column</Col>
                </Row>,
            );

            expect(screen.getByText("First column")).toBeInTheDocument();
            expect(screen.getByText("Second column")).toBeInTheDocument();
        });

        it("should apply custom className", () => {
            render(
                <Row data-testid="row-div" className="custom-class">
                    <Col>Test content</Col>
                </Row>,
            );

            const row = getRowDiv();
            expect(row).toHaveClass("custom-class");
        });

        it("should pass through HTML attributes", () => {
            render(
                <Row data-testid="row-div" id="test-row" aria-label="Test row">
                    <Col>Test content</Col>
                </Row>,
            );

            const row = getRowDiv();
            expect(row).toHaveAttribute("id", "test-row");
            expect(row).toHaveAttribute("aria-label", "Test row");
        });
    });

    describe("Props", () => {
        it("should remove padding bottom when paddingBottom is false", () => {
            render(
                <Row data-testid="row-div" paddingBottom={false}>
                    <Col>Test content</Col>
                </Row>,
            );

            const row = getRowDiv();
            expect(row).toHaveClass("noPaddingBottom");
        });
    });

    describe("Accessibility", () => {
        it("should render as a div element", () => {
            render(
                <Row data-testid="row-div">
                    <Col>Test content</Col>
                </Row>,
            );

            const row = getRowDiv();
            expect(row.tagName).toBe("DIV");
        });

        it("should preserve accessibility attributes", () => {
            render(
                <Row data-testid="row-div" role="group" aria-label="Row container">
                    <Col>Test content</Col>
                </Row>,
            );

            const row = getRowDiv();
            expect(row).toHaveAttribute("role", "group");
            expect(row).toHaveAttribute("aria-label", "Row container");
        });
    });

    describe("Edge cases", () => {
        it("should handle fragment as child", () => {
            render(
                <Row data-testid="row-div">
                    <React.Fragment>
                        <Col>Valid child</Col>
                    </React.Fragment>
                </Row>,
            );
            const row = getRowDiv();
            expect(row).toBeInTheDocument();
            expect(screen.getByText("Valid child")).toBeInTheDocument();
        });
    });

    describe("Static properties", () => {
        it("should have correct displayName", () => {
            expect(Row.displayName).toBe("Row");
        });
    });
});
