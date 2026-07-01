import React from "react";

/**
 * Возвращает безопасное значение атрибута rel для гиперссылки.
 *
 * При открытии ссылки в новой вкладке (target="_blank") новая страница получает доступ
 * к window.opener исходной вкладки и может перенаправить её на фишинговый ресурс
 * (атака reverse tabnabbing). Чтобы это предотвратить, для target="_blank" по умолчанию
 * подставляется rel="noopener".
 *
 * Используется только noopener (без noreferrer): noopener разрывает доступ к window.opener
 * и закрывает уязвимость, тогда как noreferrer дополнительно скрывает заголовок Referer,
 * что ломает реферальную аналитику на целевом сайте — нежелательный побочный эффект.
 *
 * Если потребитель явно задал rel, его значение сохраняется без изменений.
 *
 * @param target Значение атрибута target гиперссылки.
 * @param rel Значение атрибута rel, переданное потребителем (если есть).
 */
export const getSafeRel = (
    target: React.AnchorHTMLAttributes<HTMLAnchorElement>["target"],
    rel: React.AnchorHTMLAttributes<HTMLAnchorElement>["rel"],
): React.AnchorHTMLAttributes<HTMLAnchorElement>["rel"] => {
    if (target === "_blank" && rel === undefined) {
        return "noopener";
    }

    return rel;
};
