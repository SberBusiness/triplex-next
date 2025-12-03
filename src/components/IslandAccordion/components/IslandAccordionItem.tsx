import React, { useState, useEffect, useRef, useContext, useCallback } from "react";
import { CaretdownStrokeSrvIcon24, CrossStrokeSrvIcon24 } from "@sberbusiness/icons-next";
import clsx from "clsx";
import { Island } from "../../Island/Island";
import { uniqueId } from "lodash-es";
import { ExpandAnimation, IExpandAnimationProps } from "../../ExpandAnimation/ExpandAnimation";
import styles from "../styles/IslandAccordion.module.less";
import { IslandAccordionTitle } from "./IslandAccordionTitle";
import { IslandAccordionContent } from "./IslandAccordionContent";
import { IslandAccordionFooter } from "./IslandAccordionFooter";
import { createSizeToClassNameMap } from "../../../utils/classNameMaps";
import { ButtonIcon } from "../../Button";
import { EIslandType } from "../../Island";
import { Step, EStepStatus, EStepPosition } from "../../Step";
import { IslandAccordionContext } from "../IslandAccordionContext";

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

const typeToClassNameMap: Record<EIslandType, string> = {
    [EIslandType.TYPE_1]: styles.type1,
    [EIslandType.TYPE_2]: styles.type2,
    [EIslandType.TYPE_3]: styles.type3,
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
            const [headerFocused, setHeaderFocused] = useState(false);
            const { size, type } = useContext(IslandAccordionContext);

            // eslint-disable-next-line react-hooks/refs
            const instanceId = useRef(uniqueId()).current;
            const headerInstanceId = `${instanceId}header`;
            const bodyInstanceId = `${instanceId}body`;

            const handleHeaderFocus = useCallback(() => {
                setHeaderFocused(true);
            }, []);

            const handleHeaderBlur = useCallback(() => {
                setHeaderFocused(false);
            }, []);

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

            const islandClassNames = clsx(styles.island, {
                [styles.focused]: headerFocused,
            });

            return (
                <li {...rest} className={classNames} id={id} ref={ref}>
                    <Island className={islandClassNames} size={size} type={type}>
                        <Island.Header>
                            <button
                                id={headerInstanceId}
                                aria-controls={bodyInstanceId}
                                aria-expanded={isOpen}
                                type="button"
                                className={styles.header}
                                onClick={handleHeaderClick}
                                onFocus={handleHeaderFocus}
                                onBlur={handleHeaderBlur}
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

                                <div className={styles.titleWrapper}> {title}</div>

                                <span
                                    className={clsx(styles.caretWrapper, "hoverable", {
                                        active: isOpen,
                                    })}
                                >
                                    <CaretdownStrokeSrvIcon24
                                        className={styles.caretIcon}
                                        aria-hidden="true"
                                        paletteIndex={5}
                                    />
                                </span>
                            </button>
                        </Island.Header>

                        {onRemove && (
                            <div className={styles.remove}>
                                <ButtonIcon onClick={handleRemoveClick} title="Удалить">
                                    <CrossStrokeSrvIcon24 paletteIndex={5} />
                                </ButtonIcon>
                            </div>
                        )}

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
                </li>
            );
        },
    ),
    {
        Title: IslandAccordionTitle,
        Content: IslandAccordionContent,
        Footer: IslandAccordionFooter,
    },
);

IslandAccordionItem.displayName = "IslandAccordionItem";
