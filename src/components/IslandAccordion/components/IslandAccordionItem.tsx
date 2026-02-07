import React, { useState, useEffect, useRef, useContext } from "react";
import { CaretdownStrokeSrvIcon24, CrossStrokeSrvIcon24 } from "@sberbusiness/icons-next";
import clsx from "clsx";
import { Island } from "../../Island/Island";
import { uniqueId } from "lodash-es";
import { ExpandAnimation, IExpandAnimationProps } from "../../ExpandAnimation/ExpandAnimation";
import { IslandAccordionContent } from "./IslandAccordionContent";
import { IslandAccordionFooter } from "./IslandAccordionFooter";
import { createSizeToClassNameMap } from "../../../utils/classNameMaps";
import { ButtonIcon } from "../../Button";
import { EIslandType } from "../../Island";
import { Step, EStepStatus, EStepPosition } from "../../Step";
import { IslandAccordionContext } from "../IslandAccordionContext";
import { EComponentSize } from "../../../enums/EComponentSize";
import { ETitleSize, Title, EFontType } from "../../Typography";
import styles from "../styles/IslandAccordion.module.less";

export interface IIslandAccordionItemProps extends Omit<React.HTMLAttributes<HTMLLIElement>, "title"> {
    /** Нода с названием заголовка. */
    title: React.ReactNode;
    /** Идентификатор вкладки (если не передать извне, то используется индекс. Также используется как ключ при рендере списка вкладок). */
    id: string;
    /** Цифра в кружке. */
    num?: number;
    /** Раскрыт ли элемент. */
    opened?: boolean;
    /** Статус шага. */
    status?: EStepStatus;
    /** Подсказка к шагу. */
    stepHint?: string;
    /** Заблокирован ли элемент. */
    disabled?: boolean;
    /** Вызывается при клике по вкладке. */
    onToggle?: (newOpened: boolean, id: string) => void;
    /** Вызывается при удалении вкладки. */
    onRemove?: (id: string) => void;
    /** Свойства компонента Transition (react-transition-group). */
    transitionProps?: IExpandAnimationProps["transitionProps"];
}

const typeToClassNameMap = {
    [EIslandType.TYPE_1]: styles.type1,
    [EIslandType.TYPE_2]: styles.type2,
    [EIslandType.TYPE_3]: styles.type3,
};

const sizeToTitleSizeMap = {
    [EComponentSize.SM]: ETitleSize.H3,
    [EComponentSize.MD]: ETitleSize.H2,
    [EComponentSize.LG]: ETitleSize.H2,
};

const sizeToClassNameMap = createSizeToClassNameMap(styles);

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
            const [isOpen, setIsOpen] = useState(opened || false);
            const { size, type } = useContext(IslandAccordionContext);

            // eslint-disable-next-line react-hooks/refs
            const instanceId = useRef(uniqueId()).current;
            const headerInstanceId = `${instanceId}header`;
            const bodyInstanceId = `${instanceId}body`;

            useEffect(() => {
                if (opened !== undefined && isOpen !== opened) {
                    setIsOpen(opened);
                }
            }, [opened, isOpen]);

            const handleHeaderClick = (): void => {
                if (disabled) {
                    return;
                }
                const newOpened = !isOpen;
                onToggle?.(newOpened, id);

                if (opened === undefined) {
                    setIsOpen(newOpened);
                }
            };

            const handleRemoveClick = (): void => {
                if (disabled) {
                    return;
                }
                onRemove?.(id);
            };

            const classNames = clsx(className, styles.item, sizeToClassNameMap[size], typeToClassNameMap[type], {
                [styles.disabled]: !!disabled,
                [styles.opened]: isOpen,
            });

            return (
                <li {...rest} className={classNames} id={id} ref={ref}>
                    <Island className={styles.island} size={size} type={type}>
                        <Island.Header>
                            <button
                                id={headerInstanceId}
                                aria-controls={bodyInstanceId}
                                aria-expanded={isOpen}
                                type="button"
                                className={clsx(styles.header, {
                                    hoverable: !isOpen,
                                })}
                                onClick={handleHeaderClick}
                                disabled={disabled}
                                data-tx={process.env.npm_package_version}
                            >
                                {status && num && (
                                    <div className={styles.step}>
                                        <Step step={num} status={status} position={EStepPosition.XFirst}>
                                            {disabled ? undefined : stepHint}
                                        </Step>
                                    </div>
                                )}

                                <Title
                                    className={styles.title}
                                    size={sizeToTitleSizeMap[size]}
                                    type={disabled ? EFontType.DISABLED : EFontType.PRIMARY}
                                    tag="div"
                                >
                                    {title}
                                </Title>

                                <span className={clsx(styles.caretWrapper)}>
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
                        <div className={clsx(styles.remove, "hoverable", { disabled: disabled })}>
                            <ButtonIcon onClick={handleRemoveClick} title="Удалить">
                                <CrossStrokeSrvIcon24 paletteIndex={5} />
                            </ButtonIcon>
                        </div>
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
