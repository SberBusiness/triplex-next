import React from "react";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { PaymentWizard } from "../../../../stories/SkinProvider/examples/PaymentWizard";

afterEach(cleanup);

describe("WordArt payment example", () => {
    it("validates details, preserves edits on Back, requires duplicate acknowledgement and validates the code", async () => {
        const user = userEvent.setup();
        render(<PaymentWizard />);
        const amount = screen.getByRole("textbox", { name: "Сумма" });
        await user.clear(amount);
        await user.type(amount, "0");
        await user.click(screen.getByRole("button", { name: /^Проверить платёж/ }));
        expect(amount).toHaveAttribute("aria-invalid", "true");
        expect(amount).toHaveFocus();
        await user.clear(amount);
        await user.type(amount, "34500,50");
        const recipient = screen.getByRole("textbox", { name: "Наименование получателя" });
        await user.clear(recipient);
        await user.type(recipient, "ИП Орион");
        await user.click(screen.getByRole("button", { name: /^Проверить платёж/ }));
        expect(screen.getByRole("heading", { name: "Проверьте платёж" })).toHaveFocus();
        expect(within(screen.getByRole("table")).getByText("ИП Орион")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /^Перейти к подписанию/ })).toBeDisabled();
        await user.click(screen.getByRole("button", { name: /^Назад/ }));
        expect(screen.getByRole("textbox", { name: "Сумма" })).toHaveValue("34500,50");
        expect(screen.getByRole("textbox", { name: "Наименование получателя" })).toHaveValue("ИП Орион");
        await user.click(screen.getByRole("button", { name: /^Проверить платёж/ }));
        await user.click(screen.getByRole("checkbox", { name: /Я проверил историю/ }));
        await user.click(screen.getByRole("button", { name: /^Перейти к подписанию/ }));
        const code = screen.getByRole("textbox", { name: "Код подтверждения" });
        await user.type(code, "000000");
        await user.click(screen.getByRole("button", { name: /^Подтвердить демо-платёж/ }));
        expect(code).toHaveAttribute("aria-invalid", "true");
        await user.clear(code);
        await user.type(code, "123456");
        await user.click(screen.getByRole("button", { name: /^Подтвердить демо-платёж/ }));
        expect(screen.getByRole("heading", { name: "Всё получилось!" })).toHaveFocus();
        expect(screen.getByRole("alertdialog", { name: "Демо-платёж готов" })).toBeInTheDocument();
        await user.click(screen.getByRole("button", { name: /^Новый демо-платёж/ }));
        expect(screen.getByRole("textbox", { name: "Сумма" })).toHaveValue("24000");
        expect(screen.queryByRole("table")).not.toBeInTheDocument();
    });

    it("applies a template and dismisses a draft notification without advancing the form", async () => {
        const user = userEvent.setup();
        render(<PaymentWizard />);
        await user.click(screen.getByRole("button", { name: /^ООО Василёк/ }));
        expect(screen.getByRole("textbox", { name: "Наименование получателя" })).toHaveValue("ООО Василёк");
        expect(screen.getByRole("textbox", { name: "Сумма" })).toHaveValue("12500");
        await user.click(screen.getByRole("button", { name: /^Сохранить черновик/ }));
        expect(screen.getByRole("alertdialog", { name: "Черновик готов" })).toBeInTheDocument();
        await user.click(screen.getByRole("button", { name: "Закрыть уведомление" }));
        expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Получатель и реквизиты" })).toBeInTheDocument();
    });
});
