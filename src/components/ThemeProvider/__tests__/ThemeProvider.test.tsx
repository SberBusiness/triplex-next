import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { ThemeProvider } from "../ThemeProvider";
import { ETriplexNextTheme } from "../ETriplexNextTheme";
import { ThemeProviderContext } from "../ThemeProviderContext";

vi.mock("rc-util/es/Dom/canUseDom", () => ({
	default: vi.fn(() => true),
}));

vi.mock("rc-util/es/Dom/dynamicCSS", () => ({
	updateCSS: vi.fn(),
	removeCSS: vi.fn(),
}));

vi.mock("../../../../scripts/uniqueId", () => ({
	uniqueId: vi.fn((prefix: string) => `${prefix}test-id`),
}));

vi.mock("../../DesignTokens/DesignTokenUtils", () => ({
	DesignTokenUtils: {
		getStyle: vi.fn(() => "--test-token: #ffffff;"),
	},
}));

// Import mocked functions
import canUseDom from "rc-util/es/Dom/canUseDom";
import { updateCSS, removeCSS } from "rc-util/es/Dom/dynamicCSS";
import { uniqueId } from "../../../../scripts/uniqueId";
import { DesignTokenUtils } from "../../DesignTokens/DesignTokenUtils";

// Test component to consume context
const TestConsumer: React.FC = () => {
	const context = React.useContext(ThemeProviderContext);
	return (
		<div data-testid="context-consumer">
			<span data-testid="scope-classname">{context.scopeClassName}</span>
			<span data-testid="theme">{context.theme}</span>
			<span data-testid="tokens-keys">{Object.keys(context.tokens).length}</span>
		</div>
	);
};

describe("ThemeProvider", () => {
	let mockScopeRef: React.RefObject<HTMLDivElement>;

	beforeEach(() => {
		mockScopeRef = { current: document.createElement("div") };
		vi.clearAllMocks();
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("Basic Rendering", () => {
		it("should render children correctly", () => {
			render(
				<ThemeProvider scopeRef={mockScopeRef}>
					<div data-testid="test-child">Test Content</div>
				</ThemeProvider>
			);

			expect(screen.getByTestId("test-child")).toBeDefined();
			expect(screen.getByText("Test Content")).toBeDefined();
		});

		it("should use light theme by default", () => {
			render(
				<ThemeProvider scopeRef={mockScopeRef}>
					<TestConsumer />
				</ThemeProvider>
			);

			expect(screen.getByTestId("theme").textContent).toBe(ETriplexNextTheme.LIGHT);
		});

		it("should apply dark theme when specified", () => {
			render(
				<ThemeProvider scopeRef={mockScopeRef} theme={ETriplexNextTheme.DARK}>
					<TestConsumer />
				</ThemeProvider>
			);

			expect(screen.getByTestId("theme").textContent).toBe(ETriplexNextTheme.DARK);
		});
	});

	describe("Scope ClassName Management", () => {
		it("should generate unique scope classname when not provided", () => {
			render(
				<ThemeProvider scopeRef={mockScopeRef}>
					<TestConsumer />
				</ThemeProvider>
			);

			expect(uniqueId).toHaveBeenCalledWith("triplex-next-theme-");
			expect(screen.getByTestId("scope-classname").textContent).toBe("triplex-next-theme-test-id");
		});

		it("should use provided scope classname", () => {
			const customClassName = "custom-theme-scope";

			render(
				<ThemeProvider scopeRef={mockScopeRef} scopeClassName={customClassName}>
					<TestConsumer />
				</ThemeProvider>
			);

			expect(screen.getByTestId("scope-classname").textContent).toBe(customClassName);
		});

		it("should update scope classname when prop changes", async () => {
			const { rerender } = render(
				<ThemeProvider scopeRef={mockScopeRef} scopeClassName="initial-class">
					<TestConsumer />
				</ThemeProvider>
			);

			expect(screen.getByTestId("scope-classname").textContent).toBe("initial-class");

			rerender(
				<ThemeProvider scopeRef={mockScopeRef} scopeClassName="updated-class">
					<TestConsumer />
				</ThemeProvider>
			);

			await waitFor(() => {
				expect(screen.getByTestId("scope-classname").textContent).toBe("updated-class");
			});
		});
	});

	describe("CSS Injection", () => {
		it("should inject CSS styles when DOM is available", () => {
			(canUseDom as any).mockReturnValue(true);

			render(
				<ThemeProvider scopeRef={mockScopeRef} theme={ETriplexNextTheme.LIGHT}>
					<div>Test</div>
				</ThemeProvider>
			);

			expect(DesignTokenUtils.getStyle).toHaveBeenCalledWith(ETriplexNextTheme.LIGHT, {});
			expect(updateCSS).toHaveBeenCalledWith(
				".triplex-next-theme-test-id {--test-token: #ffffff;}",
				"triplex-next-dynamic-tokens-triplex-next-theme-test-id"
			);
		});
	});

	describe("CSS Cleanup", () => {
		it("should remove CSS on unmount", () => {
			const { unmount } = render(
				<ThemeProvider scopeRef={mockScopeRef}>
					<div>Test</div>
				</ThemeProvider>
			);

			unmount();

			expect(removeCSS).toHaveBeenCalledWith("triplex-next-dynamic-tokens-triplex-next-theme-test-id");
		});

		it("should remove correct CSS when scope classname changes", async () => {
			const { rerender } = render(
				<ThemeProvider scopeRef={mockScopeRef} scopeClassName="initial-class">
					<div>Test</div>
				</ThemeProvider>
			);

			rerender(
				<ThemeProvider scopeRef={mockScopeRef} scopeClassName="updated-class">
					<div>Test</div>
				</ThemeProvider>
			);

			await waitFor(() => {
				expect(removeCSS).toHaveBeenCalledWith("triplex-next-dynamic-tokens-initial-class");
			});
		});
	});

	describe("Theme Switching", () => {
		it("should update context when theme changes", async () => {
			const { rerender } = render(
				<ThemeProvider scopeRef={mockScopeRef} theme={ETriplexNextTheme.LIGHT}>
					<TestConsumer />
				</ThemeProvider>
			);

			expect(screen.getByTestId("theme").textContent).toBe(ETriplexNextTheme.LIGHT);

			rerender(
				<ThemeProvider scopeRef={mockScopeRef} theme={ETriplexNextTheme.DARK}>
					<TestConsumer />
				</ThemeProvider>
			);

			await waitFor(() => {
				expect(screen.getByTestId("theme").textContent).toBe(ETriplexNextTheme.DARK);
			});
		});
	});
}); 