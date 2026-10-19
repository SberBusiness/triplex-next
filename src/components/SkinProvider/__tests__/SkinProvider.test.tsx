import React, { createRef } from "react";
import { createPortal } from "react-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SkinProvider, TSkin } from "../index";
import { Button, EButtonTheme } from "../../Button";
import { TextField } from "../../TextField";
import { EFormFieldStatus } from "../../FormField/enums";
import { Island, EIslandType } from "../../Island";
import { TextareaField } from "../../TextareaField";
import { FormField, FormFieldLabel, FormFieldTarget } from "../../FormField";
import { Checkbox } from "../../Checkbox";
import { Radio } from "../../Radio";
import { CardAction, CardStatic } from "../../Card";
import { Chip } from "../../Chip";
import { Tag } from "../../Tag";
import {
    SegmentedControl,
    ESegmentedControlSize,
    ESegmentedControlTheme,
    ESegmentedControlType,
} from "../../SegmentedControl";
import { EComponentSize } from "../../../enums";

describe("SkinProvider", () => {
    it("automatically skins supported components without adding a DOM wrapper or changing refs", () => {
        const buttonRef = createRef<HTMLButtonElement>();
        const fieldRef = createRef<HTMLDivElement>();
        const inputRef = createRef<HTMLInputElement>();
        const islandRef = createRef<HTMLDivElement>();
        const { container } = render(
            <SkinProvider skin="wordart">
                <Button ref={buttonRef} theme={EButtonTheme.GENERAL} className="custom">
                    Launch
                </Button>
                <TextField ref={fieldRef} label="Name" className="custom" inputProps={{ ref: inputRef }} />
                <Island ref={islandRef} className="custom">
                    Card
                </Island>
            </SkinProvider>,
        );
        expect(container.firstElementChild).toBe(buttonRef.current);
        expect(buttonRef.current).toHaveClass("wordArtButton", "custom");
        expect(fieldRef.current).toHaveClass("wordArtFieldSurface", "custom");
        expect(inputRef.current).toBe(screen.getByRole("textbox", { name: "Name" }));
        expect(islandRef.current).toHaveClass("wordArtIsland", "custom");
    });

    it("scopes the skin to the closest provider and supports nested opt-out and re-enabling", () => {
        render(
            <>
                <Button theme={EButtonTheme.GENERAL}>Outside</Button>
                <SkinProvider skin="wordart">
                    <Button theme={EButtonTheme.GENERAL}>Inside</Button>
                    <SkinProvider skin={null}>
                        <Button theme={EButtonTheme.GENERAL}>Native</Button>
                        <SkinProvider skin="wordart">
                            <Button theme={EButtonTheme.GENERAL}>Nested</Button>
                        </SkinProvider>
                    </SkinProvider>
                </SkinProvider>
            </>,
        );
        for (const name of ["Outside", "Native"])
            expect(screen.getByRole("button", { name: new RegExp(`^${name}\\b`) })).not.toHaveClass("wordArtButton");
        for (const name of ["Inside", "Nested"])
            expect(screen.getByRole("button", { name: new RegExp(`^${name}\\b`) })).toHaveClass("wordArtButton");
    });

    it("switches skin without remounting an input or losing focus, value and selection", async () => {
        const user = userEvent.setup();
        const view = (skin: TSkin) => (
            <SkinProvider skin={skin}>
                <TextField label="Name" inputProps={{}} />
            </SkinProvider>
        );
        const { rerender } = render(view("wordart"));
        const input = screen.getByRole<HTMLInputElement>("textbox", { name: "Name" });
        await user.type(input, "Triplex");
        input.setSelectionRange(1, 4);
        rerender(view(null));
        expect(screen.getByRole("textbox")).toBe(input);
        expect(input).toHaveFocus();
        expect(input).toHaveValue("Triplex");
        expect([input.selectionStart, input.selectionEnd]).toEqual([1, 4]);
        rerender(view("wordart"));
        expect(input).toHaveFocus();
        expect(input).toHaveValue("Triplex");
    });

    it("preserves keyboard activation and native disabled / loading behavior", async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();
        const onDisabledClick = vi.fn();
        render(
            <SkinProvider skin="wordart">
                <Button theme={EButtonTheme.GENERAL} onClick={onClick}>
                    Launch
                </Button>
                <Button theme={EButtonTheme.GENERAL} disabled onClick={onDisabledClick}>
                    Disabled
                </Button>
                <Button theme={EButtonTheme.GENERAL} loading>
                    Loading
                </Button>
                <TextField label="Disabled field" status={EFormFieldStatus.DISABLED} inputProps={{}} />
            </SkinProvider>,
        );
        await user.tab();
        expect(screen.getByRole("button", { name: /^Launch\b/ })).toHaveFocus();
        await user.keyboard("{Enter}");
        expect(onClick).toHaveBeenCalledTimes(1);
        await user.click(screen.getByRole("button", { name: /^Disabled\b/ }));
        expect(onDisabledClick).not.toHaveBeenCalled();
        expect(screen.getByRole("button", { name: /^Loading\b/ })).toHaveAttribute("tabindex", "-1");
        expect(screen.getByRole("textbox", { name: "Disabled field" })).toBeDisabled();
    });

    it("skins other button themes while keeping semantic field states and secondary islands native", () => {
        const errorRef = createRef<HTMLDivElement>();
        const warningRef = createRef<HTMLDivElement>();
        render(
            <SkinProvider skin="wordart">
                <Button theme={EButtonTheme.DANGER}>Delete</Button>
                <Button theme={EButtonTheme.SECONDARY}>Cancel</Button>
                <Island type={EIslandType.TYPE_2}>Secondary card</Island>
                <TextField ref={errorRef} status={EFormFieldStatus.ERROR} label="Error" inputProps={{}} />
                <TextField ref={warningRef} status={EFormFieldStatus.WARNING} label="Warning" inputProps={{}} />
            </SkinProvider>,
        );
        expect(screen.getByRole("button", { name: /^Delete\b/ })).toHaveClass("wordArtDangerButton");
        expect(screen.getByRole("button", { name: /^Cancel\b/ })).toHaveClass("wordArtSecondaryButton");
        expect(screen.getByText("Secondary card")).not.toHaveClass("wordArtIsland");
        expect(errorRef.current).toHaveClass("error");
        expect(warningRef.current).toHaveClass("warning");
        expect(errorRef.current).not.toHaveClass("wordArtFieldSurface");
        expect(warningRef.current).not.toHaveClass("wordArtFieldSurface");
    });

    it("skins composed fields at FormField level and preserves nested opt-out and target refs", async () => {
        const user = userEvent.setup();
        const textareaRef = createRef<HTMLDivElement>();
        const targetRef = createRef<HTMLDivElement>();
        const nativeRef = createRef<HTMLDivElement>();
        render(
            <SkinProvider skin="wordart">
                <TextareaField ref={textareaRef} label="Description" textareaProps={{ defaultValue: "Hello" }} />
                <FormField active>
                    <FormFieldLabel>Delivery</FormFieldLabel>
                    <FormFieldTarget ref={targetRef}>Tomorrow</FormFieldTarget>
                </FormField>
                <SkinProvider skin={null}>
                    <TextareaField ref={nativeRef} label="Native" textareaProps={{}} />
                </SkinProvider>
            </SkinProvider>,
        );
        expect(textareaRef.current).toHaveClass("wordArtFieldSurface");
        expect(nativeRef.current).not.toHaveClass("wordArtFieldSurface");
        expect(targetRef.current).toBe(screen.getByLabelText("Delivery"));
        expect(targetRef.current?.parentElement).toHaveClass("wordArtFieldSurface", "wordArtFieldActive");
        await user.type(screen.getByRole("textbox", { name: "Description" }), " Triplex");
        expect(screen.getByRole("textbox", { name: "Description" })).toHaveValue("Hello Triplex");
    });

    it("preserves uncontrolled choices, input refs and keyboard operation when the skin switches", async () => {
        const user = userEvent.setup();
        const checkboxRef = createRef<HTMLInputElement>();
        const view = (skin: TSkin) => (
            <SkinProvider skin={skin}>
                <Checkbox ref={checkboxRef} defaultChecked>
                    Notifications
                </Checkbox>
                <Checkbox disabled>Disabled choice</Checkbox>
                <Radio name="plan" value="a" defaultChecked>
                    Plan A
                </Radio>
                <Radio name="plan" value="b">
                    Plan B
                </Radio>
            </SkinProvider>
        );
        const { rerender } = render(view("wordart"));
        const checkbox = screen.getByRole("checkbox", { name: "Notifications" });
        expect(checkboxRef.current).toBe(checkbox);
        expect(checkbox.parentElement).toHaveClass("wordArtChoice");
        await user.tab();
        expect(checkbox).toHaveFocus();
        await user.keyboard(" ");
        expect(checkbox).not.toBeChecked();
        await user.tab();
        expect(screen.getByRole("radio", { name: "Plan A" })).toHaveFocus();
        await user.keyboard("{ArrowRight}");
        expect(screen.getByRole("radio", { name: "Plan B" })).toBeChecked();
        rerender(view(null));
        expect(checkboxRef.current).toBe(checkbox);
        expect(checkbox).not.toBeChecked();
        expect(checkbox.parentElement).not.toHaveClass("wordArtChoice");
        expect(screen.getByRole("radio", { name: "Plan B" })).toBeChecked();
        expect(screen.getByRole("radio", { name: "Plan B" })).toHaveFocus();
        expect(screen.getByRole("checkbox", { name: "Disabled choice" })).toBeDisabled();
    });

    it("keeps segment selection and group-level disabled behavior", async () => {
        const user = userEvent.setup();
        const onSelect = vi.fn();
        const view = (value: string, disabled = false) => (
            <SkinProvider skin="wordart">
                <SegmentedControl
                    type={ESegmentedControlType.SINGLE}
                    size={ESegmentedControlSize.MD}
                    theme={ESegmentedControlTheme.GENERAL_1}
                    value={value}
                    onSelect={onSelect}
                    disabled={disabled}
                >
                    <SegmentedControl.Segment value="month">Month</SegmentedControl.Segment>
                    <SegmentedControl.Segment value="year">Year</SegmentedControl.Segment>
                </SegmentedControl>
            </SkinProvider>
        );
        const { rerender } = render(view("month"));
        const year = screen.getByRole("button", { name: "Year" });
        expect(year).toHaveClass("wordArtSegment");
        await user.tab();
        await user.tab();
        await user.keyboard("{Enter}");
        expect(onSelect).toHaveBeenCalledWith("year");
        rerender(view("year"));
        expect(year).toHaveAttribute("aria-pressed", "true");
        rerender(view("year", true));
        await user.click(year);
        expect(year).toBeDisabled();
        expect(onSelect).toHaveBeenCalledTimes(1);
    });

    it("preserves CardAction's class ref, selection and DOM node across skin changes", () => {
        const cardRef = createRef<CardAction>();
        const staticRef = createRef<HTMLDivElement>();
        const onToggle = vi.fn();
        const view = (skin: TSkin) => (
            <SkinProvider skin={skin}>
                <CardAction ref={cardRef} onToggle={onToggle}>
                    Selectable card
                </CardAction>
                <CardStatic ref={staticRef}>Static card</CardStatic>
            </SkinProvider>
        );
        const { rerender } = render(view("wordart"));
        const card = screen.getByRole("button", { name: "Selectable card" });
        const instance = cardRef.current;
        expect(instance).toBeInstanceOf(CardAction);
        expect(card).toHaveClass("wordArtCard");
        expect(staticRef.current).toHaveClass("wordArtCard");
        fireEvent.click(card);
        expect(onToggle).toHaveBeenLastCalledWith(true);
        rerender(view(null));
        expect(cardRef.current).toBe(instance);
        expect(card).toHaveClass("selected");
        expect(card).not.toHaveClass("wordArtCard");
        fireEvent.keyDown(card, { key: "Enter", keyCode: 13 });
        expect(onToggle).toHaveBeenLastCalledWith(false);
        rerender(view("wordart"));
        expect(screen.getByRole("button", { name: "Selectable card" })).toBe(card);
        expect(card).toHaveClass("wordArtCard");
    });

    it("skins chips and tags without changing their refs, labels or action callbacks", async () => {
        const user = userEvent.setup();
        const onRemove = vi.fn();
        const onChipClick = vi.fn();
        const tagRef = createRef<HTMLSpanElement>();
        const chipRef = createRef<HTMLSpanElement>();
        render(
            <SkinProvider skin="wordart">
                <Chip ref={chipRef} selected aria-pressed onClick={onChipClick}>
                    Express
                </Chip>
                <Tag
                    ref={tagRef}
                    id="team"
                    size={EComponentSize.MD}
                    onRemove={onRemove}
                    removeButtonProps={{ "aria-label": "Remove team" }}
                >
                    Team
                </Tag>
            </SkinProvider>,
        );
        expect(chipRef.current).toHaveClass("wordArtChip", "wordArtChipSelected");
        expect(tagRef.current).toHaveClass("wordArtTag");
        await user.click(screen.getByRole("button", { name: "Express" }));
        expect(onChipClick).toHaveBeenCalledTimes(1);
        await user.tab();
        await user.keyboard("{Enter}");
        expect(onRemove).toHaveBeenCalledWith("team");
    });

    it("propagates skin through a React portal and removes it when disabled", () => {
        const view = (skin: TSkin) => (
            <SkinProvider skin={skin}>
                {createPortal(<Button theme={EButtonTheme.GENERAL}>Portal action</Button>, document.body)}
            </SkinProvider>
        );
        const { rerender, unmount } = render(view("wordart"));
        expect(screen.getByRole("button", { name: /^Portal action\b/ })).toHaveClass("wordArtButton");
        rerender(view(null));
        expect(screen.getByRole("button", { name: /^Portal action\b/ })).not.toHaveClass("wordArtButton");
        unmount();
        expect(screen.queryByRole("button", { name: /^Portal action\b/ })).not.toBeInTheDocument();
    });
});
