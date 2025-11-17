import React, { useState, useEffect, useRef } from "react";
import { CaretdownStrokeSrvIcon24, CrossStrokeSrvIcon24 } from "@sberbusiness/icons-next";
import clsx from "clsx";
import { Island } from "../../Island/Island";
import { uniqueId } from "lodash-es";
import { ExpandAnimation, IExpandAnimationProps } from "../../ExpandAnimation/ExpandAnimation";
import styles from "../styles/IslandAccordion.module.less";
import { EComponentSize } from "../../../enums/EComponentSize";
import { TIslandBorderRadiusSize } from "../../Island/types";
import { IslandAccordionTitle } from "./IslandAccordionTitle";
import { IslandAccordionContent } from "./IslandAccordionContent";
import { IslandAccordionFooter } from "./IslandAccordionFooter";
import { createSizeToClassNameMap } from "../../../utils/classNameMaps";
import { ButtonIcon } from "../../Button";
import { IIslandProps, EIslandType } from "../../Island";
import { ETitleSize } from "../../Typography/enums";
import { Step, EStepStatus, EStepPosition } from "../../Step";

/** Свойства компонента элемента аккордеона. */
export interface IIslandAccordionItemProps
    extends Omit<React.HTMLAttributes<HTMLLIElement>, "title">,
        Pick<IIslandProps, "type"> {
    /** Нода с названием заголовка. */
    title: React.ReactNode;
    /** Идентификатор вкладки (если не передать извне, то используется индекс. Также используется как ключ при рендере списка вкладок). */
    id?: string;
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
    /** Размер компонента. */
    size?: EComponentSize;
}

const sizeToBorderRadiusMap: Record<EComponentSize, TIslandBorderRadiusSize> = {
    [EComponentSize.SM]: 16,
    [EComponentSize.MD]: 24,
    [EComponentSize.LG]: 32,
};

const sizeToTitleSizeMap: Record<EComponentSize, ETitleSize> = {
    [EComponentSize.SM]: ETitleSize.H3,
    [EComponentSize.MD]: ETitleSize.H2,
    [EComponentSize.LG]: ETitleSize.H1,
};

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
                size = EComponentSize.MD,
                type = EIslandType.TYPE_1,
                ...rest
            },
            ref,
        ) => {
            const [isOpen, setIsOpen] = useState(opened || false);

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
                onToggle?.(newOpened, id!);

                if (opened === undefined) {
                    setIsOpen(newOpened);
                }
            };

            const handleRemoveClick = (): void => {
                if (disabled) {
                    return;
                }
                onRemove?.(id!);
            };

            const classNames = clsx(className, styles.item, sizeToClassNameMap[size], typeToClassNameMap[type], {
                [styles.disabled]: !!disabled,
                [styles.opened]: isOpen,
            });

            const renderTitle = () => {
                if (React.isValidElement(title) && title.type === IslandAccordionTitle) {
                    return React.cloneElement(title, {
                        size: sizeToTitleSizeMap[size],
                    });
                }
                return title;
            };

            return (
                <li {...rest} className={classNames} id={id} ref={ref}>
                    <Island
                        // paddingSize={sizeToPaddingSizeMap[size]}
                        className={styles.island}
                        borderRadius={sizeToBorderRadiusMap[size]}
                        type={type}
                    >
                        <Island.Header>
                            <button
                                id={headerInstanceId}
                                aria-controls={bodyInstanceId}
                                aria-expanded={isOpen}
                                type="button"
                                className={clsx(styles.header, styles.hoverable)}
                                onClick={handleHeaderClick}
                                disabled={disabled}
                                data-tx={process.env.npm_package_version}
                            >
                                {status && (
                                    <div className={styles.step}>
                                        <Step step={num!} status={status!} position={EStepPosition.XFirst}>
                                            {disabled ? undefined : stepHint}
                                        </Step>
                                    </div>
                                )}
                                {renderTitle()}
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
