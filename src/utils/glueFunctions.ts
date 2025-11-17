/**
 * Собираем 2 функции в одну, важно чтобы они были однотипные.
 * Если есть только одна функция, то возвратится именно она, если есть обе, то возвратится функция, вызывающая их последовательно.
 * Если обе функции есть, то результирующая будет возвращать результат второй функции.
 *
 * @param {Function} [h1] Первая функция.
 * @param {Function} [h2] Вторая функция.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const glueFunctions = <T extends (...args: any[]) => unknown>(h1?: T, h2?: T): T | undefined =>
    h1 && h2
        ? (((...args) => {
              h1(...args);
              return h2(...args);
          }) as T)
        : h1 || h2;
