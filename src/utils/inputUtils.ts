/**
 * Находит позицию курсора в поле ввода.
 *
 * @param {HTMLInputElement} field Объект поля ввода.
 * @return {number} Искомая позиция курсора. (Возвращает -1, если не задано поле ввода или не удалось вычислить позицию).
 */
export function getCaretPosition(field: HTMLInputElement): number {
    if (!field) return -1;

    return (field.selectionDirection === "backward" ? field.selectionStart : field.selectionEnd) ?? -1;
}

/**
 * Устанавливает курсор в указанное место поля ввода.
 *
 * @param {HTMLInputElement | undefined} field Объект поля ввода.
 * @param {number} position Устанавливаемая позиция курсора.
 */
export function setCaretPosition(field: HTMLInputElement | null, position: number): void {
    if (!field || field != document.activeElement) return;

    field.setSelectionRange(position, position);
}
