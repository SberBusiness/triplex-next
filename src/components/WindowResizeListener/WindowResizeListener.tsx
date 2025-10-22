import React from "react";
import throttle from "lodash-es/throttle";

/** Свойства компонента WindowResizeListener. */
interface IWindowResizeListenerProps {
    children?: React.ReactNode;
    /** Обработчик изменения размер окна. */
    onResize: (event: UIEvent) => any;
    /** Задержка для функции throttle, в миллисекундах. */
    throttleDelay?: number;
}

/** Слушатель изменения размеров окна браузера. */
export class WindowResizeListener extends React.Component<IWindowResizeListenerProps> {
    public static displayName = "WindowResizeListener";

    public static defaultProps: Partial<IWindowResizeListenerProps> = {
        throttleDelay: 100,
    };

    private throttleHandleResize: (event: UIEvent) => void;

    constructor(props: IWindowResizeListenerProps) {
        super(props);

        this.throttleHandleResize = throttle(props.onResize, props.throttleDelay);
    }

    public componentDidMount(): void {
        window.addEventListener("resize", this.throttleHandleResize);
    }

    public componentDidUpdate(prevProps: Readonly<IWindowResizeListenerProps>): void {
        if (prevProps.onResize !== this.props.onResize) {
            window.removeEventListener("resize", this.throttleHandleResize);
            this.throttleHandleResize = throttle(this.props.onResize, this.props.throttleDelay);
            window.addEventListener("resize", this.throttleHandleResize);
        }
    }

    public componentWillUnmount(): void {
        window.removeEventListener("resize", this.throttleHandleResize);
    }

    public render(): React.ReactNode {
        const { children } = this.props;

        return children || null;
    }
}
