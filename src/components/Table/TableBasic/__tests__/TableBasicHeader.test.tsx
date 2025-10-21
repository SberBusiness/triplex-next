import React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { TableBasicHeader } from "../components/TableBasicHeader";
import { ITableBasicColumn } from "../types";
import { EOrderDirection } from "../enums";

describe("TableBasicHeader", () => {
    it("Should render headers and handle order click", () => {
        const columns: ITableBasicColumn[] = [
            { fieldKey: "id", label: "ID", orderDirection: EOrderDirection.NONE },
            { fieldKey: "name", label: "Название", orderDirection: EOrderDirection.ASC },
        ];
        const onOrderBy = vi.fn();
        const { container } = render(
            <table>
                <TableBasicHeader columns={columns} onOrderBy={onOrderBy} />
            </table>,
        );

        const ths = container.querySelectorAll("th");
        expect(ths.length).toBe(2);

        // Нажимаем на первый столбец (NONE -> ASC)
        (ths[0].querySelector("span") as HTMLElement).click();
        expect(onOrderBy).toHaveBeenCalledWith({ fieldKey: "id", direction: EOrderDirection.ASC });
    });
});
