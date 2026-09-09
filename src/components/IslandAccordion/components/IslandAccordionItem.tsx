import React, { useState, useContext } from "react";
import { CaretdownStrokeSrvIcon24, CrossStrokeSrvIcon24 } from "@sberbusiness/icons-next";
import clsx from "clsx";
import { Island } from "../../Island/Island";
import { uniqueId } from "lodash-es";
import { ExpandAnimation, IExpandAnimationProps } from "../../ExpandAnimation";
import { IslandAccordionContent } from "./IslandAccordionContent";
import { IslandAccordionFooter } from "./IslandAccordionFooter";
import { createSizeToClassNameMap } from "../../../utils/classNameMaps";
import { ButtonIcon } from "../../Button";
import { EIslandType } from "../../Island";
import { Step, EStepStatus, EStepPosition } from "../../Step";
import { IslandAccordionContext } from "../IslandAccordionContext";
import { EComponentSize } from "../../../enums/EComponentSize";
import { ETitleSize, Title, EFontType, EFontWeightTitle } from "../../Typography";
import { useMobileView } from "../../MobileView";
import styles from "../styles/IslandAccordion.module.less";

/** Свойства компонента IslandAccordionItem. */
export interface IIslandAccordionItemProps extends Omit<React.HTMLAttributes<HTMLLIElement>, "title"> {
    /** Нода с названием заголовка. */
    title: React.ReactNode;
    /** Идентификатор элемента. Проставляется на корневой `<li>` и передаётся в onToggle и onRemove. */
    id: string;
    /** Номер шага в кружке слева от заголовка. Кружок рендерится, только если задан вместе со status и не равен 0. */
    num?: number;
    /** Раскрыт ли элемент. Передан — элемент управляемый и состояние задаёт потребитель, не передан — элемент раскрывается сам. */
    opened?: boolean;
    /** Статус шага. Без него кружок с номером не рендерится. */
    status?: EStepStatus;
    /** Подсказка к шагу, показывается по наведению на кружок. Игнорируется при disabled. */
    stepHint?: string;
    /** Заблокирован ли элемент. Блокирует раскрытие, удаление и скрывает подсказку шага. */
    disabled?: boolean;
    /** Вызывается при клике по заголовку с новым состоянием раскрытия и id элемента. */
    onToggle?: (newOpened: boolean, id: string) => void;
    /** Вызывается при клике по кнопке удаления с id элемента. Кнопка рендерится, только если колбэк передан. */
    onRemove?: (id: string) => void;
    /** Свойства компонента Transition (react-transition-group), управляющего раскрытием содержимого. */
    transitionProps?: IExpandAnimationProps["transitionProps"];
}

/** Префикс автогенерируемых id заголовка и содержимого элемента. */
const INSTANCE_ID_PREFIX = "IslandAccordionItem-";

const TYPE_TO_CLASS_NAME_MAP: Record<EIslandType, string> = {
    [EIslandType.TYPE_1]: styles.type1,
    [EIslandType.TYPE_2]: styles.type2,
    [EIslandType.TYPE_3]: styles.type3,
};

const SIZE_TO_TITLE_SIZE_MAP: Record<EComponentSize, ETitleSize> = {
    [EComponentSize.SM]: ETitleSize.H3,
    [EComponentSize.MD]: ETitleSize.H3,
    [EComponentSize.LG]: ETitleSize.H2,
};

const SIZE_TO_CLASS_NAME_MAP = createSizeToClassNameMap(styles);

/** Раскрывающийся элемент аккордеона: кнопка-заголовок и анимированно раскрываемое содержимое. */
export const IslandAccordionItem = Object.assign(
    React.forwardRef<HTMLLIElement, IIslandAccordionItemProps>(
        (
            {
                children,
                title,
                className,
                opened,
                disabled,
                onRemove,
                onToggle,
                id,
                num,
                status,
                stepHint,
                transitionProps,
                ...rest
            },
            ref,
        ) => {
            const { size, type } = useContext(IslandAccordionContext);

            const [instanceId] = useState(() => uniqueId(INSTANCE_ID_PREFIX));
            const headerInstanceId = `${instanceId}-header`;
            const bodyInstanceId = `${instanceId}-body`;

            const adaptive = useMobileView();

            // Гибрид controlled/uncontrolled: если opened передан, раскрытие задаёт потребитель,
            // иначе элемент хранит его сам. Синхронизация идёт в рендере (паттерн React
            // «adjusting state when a prop changes»), а не в useEffect: иначе между сменой opened
            // и её применением успевает отрисоваться кадр со старым состоянием.
            const [isOpen, setIsOpen] = useState(opened ?? false);
            const [prevOpened, setPrevOpened] = useState(opened);

            if (opened !== prevOpened) {
                setPrevOpened(opened);

                if (opened !== undefined) {
                    setIsOpen(opened);
                }
            }

            const handleHeaderClick = (): void => {
                const newOpened = !isOpen;
                onToggle?.(newOpened, id);

                if (opened === undefined) {
                    setIsOpen(newOpened);
                }
            };

            const handleRemoveClick = (): void => {
                onRemove?.(id);
            };

            const titleSize = adaptive ? ETitleSize.H3 : SIZE_TO_TITLE_SIZE_MAP[size];

            const classNames = clsx(
                className,
                styles.item,
                SIZE_TO_CLASS_NAME_MAP[size],
                TYPE_TO_CLASS_NAME_MAP[type],
                {
                    [styles.disabled]: disabled,
                    [styles.opened]: isOpen,
                },
            );

            return (
                <li {...rest} className={classNames} id={id} ref={ref}>
                    <Island className={styles.island} size={size} type={type}>
                        <Island.Header>
                            <button
                                id={headerInstanceId}
                                aria-controls={bodyInstanceId}
                                aria-expanded={isOpen}
                                type="button"
                                // Глобальный класс @sberbusiness/icons-next "hoverable" — задаёт цвет
                                // каретки при наведении. В раскрытом состоянии hover не подсвечивается.
                                className={clsx(styles.header, {
                                    hoverable: !isOpen,
                                })}
                                onClick={handleHeaderClick}
                                disabled={disabled}
                                data-tx={process.env.npm_package_version}
                            >
                                {/* Тернарник, а не `&&`: при num === 0 выражение `status && num` вернуло бы 0, и React отрисовал бы «0». */}
                                {status && num ? (
                                    <div className={styles.step}>
                                        <Step step={num} status={status} position={EStepPosition.XFirst} size={size}>
                                            {disabled ? undefined : stepHint}
                                        </Step>
                                    </div>
                                ) : null}

                                <Title
                                    className={styles.title}
                                    size={titleSize}
                                    type={disabled ? EFontType.DISABLED : EFontType.PRIMARY}
                                    tag="div"
                                    weight={EFontWeightTitle.MEDIUM}
                                >
                                    {title}
                                </Title>

                                <span className={styles.caretWrapper}>
                                    <CaretdownStrokeSrvIcon24
                                        className={styles.caretIcon}
                                        aria-hidden="true"
                                        paletteIndex={5}
                                    />
                                </span>
                            </button>
                        </Island.Header>

                        <ExpandAnimation
                            expanded={isOpen && !disabled}
                            id={bodyInstanceId}
                            role="region"
                            aria-labelledby={headerInstanceId}
                            transitionProps={transitionProps}
                        >
                            {children}
                        </ExpandAnimation>
                    </Island>

                    {onRemove && (
                        <span className={styles.remove}>
                            <ButtonIcon onClick={handleRemoveClick} disabled={disabled} title="Удалить">
                                <CrossStrokeSrvIcon24 paletteIndex={5} />
                            </ButtonIcon>
                        </span>
                    )}
                </li>
            );
        },
    ),
    {
        Content: IslandAccordionContent,
        Footer: IslandAccordionFooter,
    },
);

IslandAccordionItem.displayName = "IslandAccordionItem";
