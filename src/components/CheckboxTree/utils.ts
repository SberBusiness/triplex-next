import { ICheckboxTreeCheckboxData } from "./types";

/**
 * Обход дерева чекбоксов в глубину, снизу вверх: callback вызывается сначала для потомков, затем для их родителя.
 * Такой порядок обязателен для checkParentCheckboxes — состояние родителя считается по уже пересчитанным потомкам.
 */
export const traverseCheckboxes = (
    checkboxes: ICheckboxTreeCheckboxData[],
    callback: (checkbox: ICheckboxTreeCheckboxData) => void,
): void => {
    checkboxes.forEach((checkbox) => {
        if (checkbox.children) {
            traverseCheckboxes(checkbox.children, callback);
        }

        callback(checkbox);
    });
};

/**
 * Пересчёт флагов checked и bulk узла по состоянию его прямых потомков.
 * Узел без потомков не трогается: bulk у листа не имеет смысла и остаётся таким, каким его задал потребитель.
 */
export const checkParentCheckboxes = (checkbox: ICheckboxTreeCheckboxData): void => {
    if (!checkbox.children) {
        return;
    }

    let checkedChildrenCount = 0;
    let bulkChildrenCount = 0;

    checkbox.children.forEach((child) => {
        if (child.checked) {
            checkedChildrenCount++;
        }

        if (child.bulk) {
            bulkChildrenCount++;
        }
    });

    if (checkedChildrenCount === checkbox.children.length) {
        // Все дочерние чекбоксы выбраны. Узел остаётся частично выбранным, если частично выбран кто-то из потомков.
        checkbox.checked = true;
        checkbox.bulk = bulkChildrenCount !== 0;
    } else if (checkedChildrenCount > 0) {
        // Выбрана только часть дочерних чекбоксов.
        checkbox.checked = true;
        checkbox.bulk = true;
    } else {
        // Не выбран ни один дочерний чекбокс.
        checkbox.checked = false;
    }
};

/** Проставление флага checked родителя всем его потомкам вниз по дереву, при изменении родителя. */
export const checkChildrenCheckboxes = (checkbox: ICheckboxTreeCheckboxData): void => {
    if (!checkbox.children) {
        return;
    }

    checkbox.children.forEach((child) => {
        child.checked = checkbox.checked;
        checkChildrenCheckboxes(child);
    });
};
