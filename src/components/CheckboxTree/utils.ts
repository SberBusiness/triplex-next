import { ICheckboxTreeCheckboxData } from "./types";

/** Обход ICheckboxData[]. */
export const traverseCheckboxes = (
    checkboxes: ICheckboxTreeCheckboxData[],
    cb: (checkbox: ICheckboxTreeCheckboxData) => void,
) => {
    checkboxes.forEach((c) => {
        if (c.children) traverseCheckboxes(c.children, cb);
        cb(c);
    });
};

/** Обновление флага checked и bulk родителя, при изменении дочернего чекбокса. */
export const checkParentCheckboxes = (checkbox: ICheckboxTreeCheckboxData): void => {
    if (!checkbox.children) {
        return;
    }

    let checkedChildrenCount = 0;
    let bulkChildrenCount = 0;

    checkbox.children.forEach((c) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        c.checked ? checkedChildrenCount++ : "";
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        c.bulk ? bulkChildrenCount++ : "";
    });

    // Все дочерние чекбоксы выбраны.
    if (checkedChildrenCount === checkbox.children.length) {
        checkbox.checked = true;
        checkbox.bulk = bulkChildrenCount !== 0;
    } else if (checkedChildrenCount > 0) {
        // Некоторые дочерние чекбоксы выбраны.
        checkbox.checked = true;
        checkbox.bulk = true;
    } else {
        // Все дочерние чекбоксы не выбраны.
        checkbox.checked = false;
    }
};

/** Обновление флага checked дочерних чекбоксов, при изменении родителя. */
export const checkChildrenCheckboxes = (checkbox: ICheckboxTreeCheckboxData): void => {
    if (!checkbox.children) {
        return;
    }

    checkbox.children.forEach((c) => {
        c.checked = checkbox.checked;
        checkChildrenCheckboxes(c);
    });
};
