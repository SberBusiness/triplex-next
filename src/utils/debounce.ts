/**
 * Функция, откладывающая свой последний вызов на размер таймаута.
 *
 * @param {Function} callback Функция обратного вызова по интервалу.
 * @param {number} timeout Таймаут, через который будет вызвана функция.
 */
export function debounce(callback: (...args: any[]) => any, timeout: number): (...args: any[]) => void {
    let timeoutId = 0;
    let lastArgs: [];
    function onTimeout() {
        timeoutId = 0;
        callback(...lastArgs);
    }
    return (...args: []): void => {
        if (timeoutId) {
            window.clearTimeout(timeoutId);
        }
        lastArgs = args;
        timeoutId = window.setTimeout(onTimeout, timeout);
    };
}
