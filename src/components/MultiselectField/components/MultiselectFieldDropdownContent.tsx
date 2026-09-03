import React, { useContext } from "react";
import { MultiselectFieldContext } from "../MultiselectFieldContext";
import { createSizeToClassNameMap } from "../../../utils/classNameMaps";
import clsx from "clsx";
import styles from "../styles/MultiselectFieldDropdownContent.module.less";
import { LoaderScreen } from "../../../components/LoaderScreen";

/** Свойства компонента MultiselectFieldDropdownContent. */
export interface IMultiselectFieldDropdownContentProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Показать лоадер поверх содержимого. По умолчанию false. */
    loading?: boolean;
}

const sizeToClassNameMap = createSizeToClassNameMap(styles);

/**
 * Прокручиваемое содержимое выпадающего блока мульти-списка.
 * Максимальную высоту задаёт размер из MultiselectFieldContext.
 */
export const MultiselectFieldDropdownContent: React.FC<IMultiselectFieldDropdownContentProps> = ({
    children,
    className,
    loading,
    ...htmlDivAttributes
}) => {
    const { size } = useContext(MultiselectFieldContext);

    return (
        <div
            tabIndex={-1}
            className={clsx(styles.multiselectFieldContent, sizeToClassNameMap[size], className)}
            {...htmlDivAttributes}
        >
            {children}
            {loading && <LoaderScreen type="small" className={styles.loaderScreen} />}
        </div>
    );
};
