import React from "react";
import isEqual from "lodash-es/isEqual";
import { TooltipContext } from "@sberbusiness/triplex-next/components/Tooltip/TootlipContext";
import clsx from "clsx";
import { Portal } from "@sberbusiness/triplex-next/components/Portal/Portal";
import {
    ETooltipAlign,
    ETooltipAxesType,
    ETooltipDirection,
    ETooltipEndCoordinates,
    ETooltipFlowTypes,
    ETooltipPreferPlace,
    ETooltipSize,
    ETooltipSizeParameter,
    ETooltipStartCoordinates,
    ETooltipTypeName,
} from "@sberbusiness/triplex-next/components/Tooltip/enums";
import { TooltipDesktopTip } from "@sberbusiness/triplex-next/components/Tooltip/components/desktop/components/TooltipDesktopTip";
import { ITooltipDesktopProps } from "@sberbusiness/triplex-next/components/Tooltip/components/desktop/TooltipDesktop";
import { ITooltipBounds, ITooltipDomainSize, ITooltipSize } from "@sberbusiness/triplex-next/components/Tooltip/types";
import {
    axes,
    calcBounds,
    calcRelPos,
    centerOfBoundsFromBounds,
    equalCoords,
    pickZone,
} from "@sberbusiness/triplex-next/components/Tooltip/utils/Positioning";
import styles from "@sberbusiness/triplex-next/components/Tooltip/styles/TooltipDesktop.module.less";

// Маппер flow в translate для Tip (стрелочка)
const flowToTipTranslations: { [key: string]: string } = {
    column: "translateX",
    row: "translateY",
};

// Маппер flow в translate для самого Tooltip
const flowToTooltipTranslations: { [key: string]: string } = {
    column: "translateY",
    row: "translateX",
};

// Маппер EPreferPlace в EDirection для Tip (стрелочка)
const DIRECTIONS = {
    [ETooltipPreferPlace.ABOVE]: ETooltipDirection.DOWN,
    [ETooltipPreferPlace.BELOW]: ETooltipDirection.UP,
    [ETooltipPreferPlace.LEFT]: ETooltipDirection.RIGHT,
    [ETooltipPreferPlace.RIGHT]: ETooltipDirection.LEFT,
};

// Интервал опроса в ms необходимости обновления layout
const REFRESH_INTERVAL_MS = 200;
// Время анимаций появления и исчезновения Tooltip'а
const ENTER_EXIT_TRANSITION_DURATION_MS = 500;
// Отступ Tooltip от элемента, px
const OFFSET = 2;
// Высота Tip (стрелочки), px
const TIP_HEIGHT = 8;
// Уголок бегает по периметру максимально на 16 px от края
const MAX_FROM_EDGE_FOR_TIP = 16;

/** Свойства компонента TooltipDesktopBase. */
export interface ITooltipDesktopBaseProps extends Omit<ITooltipDesktopProps, "forwardedRef"> {
    /** Получение ноды Tooltip. */
    setTooltipRef?: (node: HTMLDivElement | null) => void;
}

/** Состояния компонента TooltipDesktopBase. */
interface ITooltipDesktopBaseState {
    /** Для отслеживания того что анимация при закрытии тултипа в прогрессе. */
    exiting: boolean;
    /** Положение Tooltip'a. */
    standing: ETooltipPreferPlace;
    /** Открыт/закрыт ли tooltip. */
    isOpen: boolean;
    /** Нужно рендерить тултип или нет, признак анимационно зависимого рендериннга открыт/закрыт ли tooltip. */
    needRenderTooltip: boolean;
}

/** Базовый компонент "Тултипа". */
export class TooltipDesktopBase extends React.Component<ITooltipDesktopBaseProps, ITooltipDesktopBaseState> {
    public static displayName = "TooltipBase";
    public static contextType = TooltipContext;

    declare context: React.ContextType<typeof TooltipContext>;

    private zone: ITooltipDomainSize = {
        [ETooltipTypeName.FLOW]: ETooltipFlowTypes.COLUMN,
        [ETooltipTypeName.STANDING]: ETooltipPreferPlace.ABOVE,
        [ETooltipTypeName.SIDE]: ETooltipAlign.CENTER,
        cutOff: 0,
        order: 0,
        [ETooltipSizeParameter.H]: 0,
        [ETooltipSizeParameter.W]: 0,
    };
    private tooltipBodySize: ITooltipSize = {
        [ETooltipSizeParameter.H]: 0,
        [ETooltipSizeParameter.W]: 0,
    };
    private targetBounds: ITooltipBounds = {
        [ETooltipStartCoordinates.X]: 0,
        [ETooltipEndCoordinates.X]: 0,
        [ETooltipStartCoordinates.Y]: 0,
        [ETooltipEndCoordinates.Y]: 0,
        [ETooltipSizeParameter.H]: 0,
        [ETooltipSizeParameter.W]: 0,
    };
    private windowBounds: ITooltipBounds = {
        [ETooltipStartCoordinates.X]: 0,
        [ETooltipEndCoordinates.X]: 0,
        [ETooltipStartCoordinates.Y]: 0,
        [ETooltipEndCoordinates.Y]: 0,
        [ETooltipSizeParameter.H]: 0,
        [ETooltipSizeParameter.W]: 0,
    };

    private bodyRef = React.createRef<HTMLDivElement>();
    private tipRef = React.createRef<HTMLDivElement>();

    private tipEl: HTMLElement | null = null;
    private bodyEl: HTMLElement | null = null;
    private tooltipNode: HTMLDivElement | null = null;
    private hasTracked = false;
    private exitingAnimationTimer1: number | null = null;
    private exitingAnimationTimer2: number | null = null;
    private checkLayoutInterval: number | null = null;

    public state: ITooltipDesktopBaseState = {
        exiting: false, // для отслеживания того что анимация при закрытии тултипа в прогрессе.
        isOpen: this.props.isOpen, // для отслеживания открыт/закрыт ли tooltip.
        needRenderTooltip: this.props.isOpen, // нужно рендерить тултип или нет, признак анимационно зависимого рендериннга открыт/закрыт ли tooltip
        standing: ETooltipPreferPlace.ABOVE,
    };

    public render() {
        const { renderContainer } = this.props;
        const { needRenderTooltip } = this.state;
        const { elements } = this.context;

        return (
            <>
                {elements.target}
                {needRenderTooltip && (
                    <Portal container={renderContainer ?? document.body}>{this.tooltipRender()}</Portal>
                )}
            </>
        );
    }

    public componentDidMount(): void {
        if (this.props.isOpen) {
            this.enter();
        }
    }

    public componentDidUpdate(prevProps: ITooltipDesktopBaseProps, prevState: ITooltipDesktopBaseState): void {
        const props = this.props;
        const state = this.state;

        const willOpen = !prevProps.isOpen && props.isOpen;
        const willClose = prevProps.isOpen && !props.isOpen;

        if (willOpen) {
            this.prepareOpen();
            return;
        } else if (willClose) {
            this.close();
            return;
        }

        const didOpen = !prevState.isOpen && state.isOpen;
        const didClose = prevState.isOpen && !state.isOpen;

        if (didOpen) {
            this.enter();
            return;
        } else if (didClose) {
            this.exit();
            return;
        }

        if (state.isOpen && !isEqual(prevProps.children, props.children)) {
            this.setTooltipBodySize();
            this.setAndCheckResizeTargetBounds();
            this.resolveTooltipLayout();
        }
    }

    public componentWillUnmount(): void {
        /* If the Tooltip is unmounted while animating,
            clear the animation so no setState occurred. */
        this.animateExitStop();

        if (this.hasTracked) {
            this.untrackTooltip();
        }
    }

    // Открыть поповер
    private prepareOpen = () => {
        if (this.state.exiting) {
            this.animateExitStop();
        }
        this.setState({ isOpen: true, needRenderTooltip: true });
    };

    // Закрыть поповер
    private close = () => {
        this.setState({ isOpen: false });
    };

    // Метод начала отслеживания поповера и анимация его появления
    private enter = () => {
        this.trackTooltip();
        this.animateEnter();
        if (this.props.onShow && this.tooltipNode) {
            this.props.onShow(this.tooltipNode);
        }
    };

    // Метод окончания отслеживания поповера и анимация его исчезновения
    private exit = () => {
        this.animateExit();
        this.untrackTooltip();
    };

    private setTooltipNode = (node: HTMLDivElement) => {
        const { setTooltipRef } = this.props;

        if (node) {
            // Получение ссылок на тело подсказки и стрелочку.
            this.bodyEl = this.bodyRef.current;
            this.tipEl = this.tipRef.current;
        }

        this.tooltipNode = node;

        setTooltipRef?.(this.tooltipNode);
    };

    // Рендер поповера
    private resolveTooltipLayout = () => {
        if (!this.tooltipNode) {
            return;
        }

        const { alignTip } = this.props;

        // Поиск оптимальной зоны для позиционирования. Измеряет размер каждой зоны и использует наибольшую.
        // В качестве размера тултипа берется размер тела тултипа плюс высота стрелочки с обеих сторон.
        const zone = pickZone(
            this.props.preferPlace,
            this.windowBounds,
            this.targetBounds,
            TIP_HEIGHT,
            MAX_FROM_EDGE_FOR_TIP,
            {
                h: this.tooltipBodySize.h + TIP_HEIGHT,
                w: this.tooltipBodySize.w + TIP_HEIGHT,
            },
        );

        this.zone = zone;

        this.setState({
            standing: zone.standing,
        });

        const axis = axes[zone.flow];

        // Для расчета позиции тултипа, размер тултипа вычисляется в зависимости от зоны где он будет располагаться,
        // если тултип в сверху или снизу то высота стрелочки прибавляется к высоте тултипа
        const tooltipSize = { ...this.tooltipBodySize };
        tooltipSize[zone.flow === ETooltipFlowTypes.ROW ? ETooltipSizeParameter.W : ETooltipSizeParameter.H] +=
            TIP_HEIGHT;

        /* При позиционировании на вспомогательной оси нельзя превышать границы. Для достижения этого: Сначала
            позиционируется вспомогательной оси относительно центра вспомогательной оси обернутого элемента, затем
            смещение на необходимую величину, чтобы выйти за границы.
            */
        const pos = calcRelPos(zone, this.targetBounds, tooltipSize);

        // Смещение позволяет разработчику контролировать дистанцию между Tip (стрелочкой) и обернутым элементом.
        pos[axis.main.start] += OFFSET * zone.order;

        let dockingEdgeBufferLength = 0;
        if (this.bodyEl) {
            dockingEdgeBufferLength = Math.round(+getComputedStyle(this.bodyEl).borderRadius.slice(0, -2)) || 0;
        }
        /*
         * Ограничение позиционирование обертки внутри элемента рамки. Попытка не попасть в визуально допустимый
         * буфер элемента рамки. Буфер рассчитывается в зависимости от размера Tip (стрелочка) и его OFFSET (отступ).
         */
        const frameBuffer = TIP_HEIGHT + OFFSET;
        const hangingBufferLength = dockingEdgeBufferLength * 2 + TIP_HEIGHT * 2 + frameBuffer;
        const frameCrossStart = this.windowBounds[axis.cross.start];
        const frameCrossEnd = this.windowBounds[axis.cross.end];
        const frameCrossLength = this.windowBounds[axis.cross.size];
        const frameCrossInnerLength = frameCrossLength - frameBuffer * 2;
        const frameCrossInnerStart = frameCrossStart + frameBuffer;
        const frameCrossInnerEnd = frameCrossEnd - frameBuffer;
        const tooltipCrossStart = pos[axis.cross.start];
        const tooltipCrossEnd = pos[axis.cross.end];

        if (alignTip === ETooltipAlign.START) {
            pos[axis.cross.start] =
                this.targetBounds[axis.cross.end] -
                MAX_FROM_EDGE_FOR_TIP -
                TIP_HEIGHT -
                this.targetBounds[axis.cross.size] / 2;
        } else if (alignTip === ETooltipAlign.END) {
            pos[axis.cross.start] =
                this.targetBounds[axis.cross.start] -
                tooltipSize[axis.cross.size] +
                MAX_FROM_EDGE_FOR_TIP +
                TIP_HEIGHT +
                this.targetBounds[axis.cross.size] / 2;
        } else if (pos.crossLength > frameCrossLength) {
            /*
             * Если Tooltip не влезает в frameCrossLength тогда просто позиционируем его в `frameCrossStart`.
             * CrossLength тултипа будет принудительно forced to overflow into the `Frame` .
             */
            pos[axis.cross.start] = 0;

            // Если tooltipCrossStart выходит за некое пороговое значение targetCrossLength, тогда ограничить его tooltipCrossStart
        } else if (this.targetBounds[axis.cross.end] < hangingBufferLength) {
            pos[axis.cross.start] = this.targetBounds[axis.cross.end] - hangingBufferLength;

            /*
             * Проверка, что начало вспомогательной оси в пределах обернутого элемента и его рамок, имеет ли смысл
             * пытаться вместить Tooltip туда
             */
        } else if (this.targetBounds[axis.cross.start] > frameCrossInnerEnd) {
            pos[axis.cross.start] = this.targetBounds[axis.cross.start] - tooltipSize[axis.cross.size];

            /* Если tooltipCrossStart не влазит внутрь рамок (honouring buffers) тогда просто центруем поповер в
                 оставшейся frameCrossLength.
                */
        } else if (pos.crossLength > frameCrossInnerLength) {
            pos[axis.cross.start] = (frameCrossLength - pos.crossLength) / 2;
        } else if (tooltipCrossStart < frameCrossInnerStart) {
            pos[axis.cross.start] = frameCrossInnerStart;
        } else if (tooltipCrossEnd > frameCrossInnerEnd) {
            pos[axis.cross.start] = pos[axis.cross.start] - (pos[axis.cross.end] - frameCrossInnerEnd);
        }
        /**
         * Применение стилей flow и order. Это может повлиять на последующие измерения высоты и ширины контейнера.
         * Когда Tip (стрелочка) меняет ориентацию из-за изменений `row`/`column`, будет затронуты ширина и высота.
         * Мониторинг лейаута перехватит эти изменения и сам пересчитает лейаут.
         */
        this.tooltipNode.style.flexFlow = zone.flow;
        if (this.bodyEl) {
            this.bodyEl.style.order = zone.order.toString();
        }

        // Применение абсолютного позиционирования
        this.tooltipNode.style.top = `${pos.y}px`;
        this.tooltipNode.style.left = `${pos.x}px`;

        // Расчёт позиционирования Tip (стрелочки)
        let tipCrossPos =
            centerOfBoundsFromBounds(zone.flow, ETooltipAxesType.CROSS, this.targetBounds, pos) - TIP_HEIGHT;

        if (tipCrossPos < MAX_FROM_EDGE_FOR_TIP) {
            tipCrossPos = MAX_FROM_EDGE_FOR_TIP;
        } else if (tipCrossPos > pos.crossLength - MAX_FROM_EDGE_FOR_TIP - TIP_HEIGHT * 2) {
            tipCrossPos = pos.crossLength - MAX_FROM_EDGE_FOR_TIP - TIP_HEIGHT * 2;
        }

        if (this.tipEl) {
            this.tipEl.style.transform = `${flowToTipTranslations[zone.flow]}(${tipCrossPos}px)`;
            this.tipEl.style.borderWidth = `${TIP_HEIGHT}px`;
        }
    };

    // Метод проверки изменения границ обернутого элемента.
    private setAndCheckResizeTargetBounds = () => {
        const { targetRef } = this.props;

        if (!targetRef.current) {
            return false;
        }

        const newTargetBounds = calcBounds(targetRef.current);
        if (this.targetBounds && equalCoords(this.targetBounds, newTargetBounds)) {
            return false;
        }

        this.targetBounds = newTargetBounds;
        return true;
    };

    // Метод проверки необходимости перерисовки лейаута
    private checkTargetReposition = () => {
        if (this.setAndCheckResizeTargetBounds()) {
            this.resolveTooltipLayout();
        }
    };

    // Метод измерения размеров тела тултипа (без стрелочки)
    private setTooltipBodySize = () => {
        if (!this.bodyEl) {
            return;
        }

        this.tooltipBodySize = { w: this.bodyEl.offsetWidth, h: this.bodyEl.offsetHeight };
    };

    // Очистка таймеров анимации исчезновения
    private animateExitStop = () => {
        if (this.exitingAnimationTimer1) {
            window.clearTimeout(this.exitingAnimationTimer1);
        }
        if (this.exitingAnimationTimer2) {
            window.clearTimeout(this.exitingAnimationTimer2);
        }
        this.setState({ exiting: false });
    };

    // Анимация исчезновения
    private animateExit = () => {
        this.setState({ exiting: true });
        this.exitingAnimationTimer2 = window.setTimeout(() => {
            window.setTimeout(() => {
                if (!this.tooltipNode) {
                    return;
                }
                this.tooltipNode.style.transform = `${flowToTooltipTranslations[this.zone.flow]}(${
                    this.zone.order * 50
                }px)`;
                this.tooltipNode.style.opacity = "0";
            }, 0);
        }, 0);

        this.exitingAnimationTimer1 = window.setTimeout(() => {
            this.setState({ exiting: false, needRenderTooltip: false });
        }, ENTER_EXIT_TRANSITION_DURATION_MS);
    };

    // Анимация появления
    private animateEnter = () => {
        if (!this.tooltipNode) {
            return;
        }

        // Подготовка стилей появления, чтобы можно было анимировать.
        this.tooltipNode.style.transform = `${flowToTooltipTranslations[this.zone.flow]}(${this.zone.order * 50}px)`;
        this.tooltipNode.style.opacity = "0";

        /* Hack: http://stackoverflow.com/questions/3485365/how-can-i-force-webkit-to-redraw-repaint-to-propagate-style-changes */
        // После инициализации лейаута применяем анимации transition.
        // Без этой строчки не всегда применяются стили добавленные в style, из-за чего иногда тултип появляется резко подергиваясь
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        this.tooltipNode.offsetHeight;

        if (this.tipEl) {
            this.tipEl.style.transition = "transform 150ms ease-in";
        }
        this.tooltipNode.style.transitionProperty = "opacity, transform";
        this.tooltipNode.style.transitionDuration = "500ms";
        this.tooltipNode.style.transitionTimingFunction = "cubic-bezier(0.230, 1.000, 0.320, 1.000)";
        this.tooltipNode.style.opacity = "1";
        this.tooltipNode.style.transform = "translateY(0)";
    };

    //  Отслеживание поповера
    private trackTooltip = () => {
        if (!this.tooltipNode) {
            return;
        }
        this.hasTracked = true;

        // Установка опроса для проверки изменилось ли положение. Другого способа узнать этого без опроса
        this.checkLayoutInterval = window.setInterval(this.checkTargetReposition, REFRESH_INTERVAL_MS);

        /*
        Наблюдение за изменением границ на всех уровнях, при необходимости - перерасчет. Привязка лэйаут монитора
        должна быть сделана сразу, т.к. перерасчет может вызывать рекурсивно изменение в границах. Поэтому если мы
        сделали одноразовый force-layout перед наблюдением, наши расчеты окончательной позиции могут быть неверными.
        */

        window.addEventListener("scroll", this.onWindowScroll);
        window.addEventListener("resize", this.onWindowResize);

        // Запуск лейаута при первой прогрузке
        this.windowBounds = calcBounds(window); // заполнили размер окна
        this.setTooltipBodySize(); // заполнили размер тултипа
        this.setAndCheckResizeTargetBounds();
        this.resolveTooltipLayout();
    };

    // Отписка от отслеживания поповера
    private untrackTooltip = () => {
        if (!this.tooltipNode) {
            return;
        }
        if (this.checkLayoutInterval) {
            window.clearInterval(this.checkLayoutInterval);
        }
        window.removeEventListener("scroll", this.onWindowScroll);
        window.removeEventListener("resize", this.onWindowResize);
        this.hasTracked = false;
    };

    // Перерисовка при скролле "рамки"
    private onWindowScroll = () => {
        this.setAndCheckResizeTargetBounds();
        this.resolveTooltipLayout();
    };

    // Перерисовка при изменении размеров "рамки"
    private onWindowResize = () => {
        this.windowBounds = calcBounds(window);
        this.resolveTooltipLayout();
    };

    // Отрисовка самого Tooltip
    private tooltipRender: () => React.ReactElement = () => {
        const {
            className,
            size,
            preferPlace,
            alignTip,
            isOpen,
            renderContainer,
            onShow,
            setTooltipRef,
            onKeyDown,
            targetRef,
            ...rest
        } = this.props;
        const { elements } = this.context;

        const sizeClass = size === ETooltipSize.SM ? styles.tooltipSM : styles.tooltipLG;
        const classNames = clsx(
            styles.tooltipDesktop,
            sizeClass,
            { [styles.closable]: !!elements.closeButton },
            className,
        );

        return (
            <div className={styles.tooltipOverlay}>
                <div className={classNames} {...rest} ref={this.setTooltipNode}>
                    <div className={styles.tooltipDesktopContent} ref={this.bodyRef}>
                        {elements.body}
                        {elements.link}
                        {elements.closeButton}
                    </div>
                    <TooltipDesktopTip direction={DIRECTIONS[this.state.standing]} ref={this.tipRef} />
                </div>
            </div>
        );
    };
}
