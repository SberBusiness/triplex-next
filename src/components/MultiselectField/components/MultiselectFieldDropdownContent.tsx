import React, { useContext } from "react";
import { MultiselectFieldContext } from "../MultiselectFieldContext";
import { createSizeToClassNameMap } from "../../../utils/classNameMaps";
import clsx from "clsx";
import styles from "../styles/MultiselectFieldDropdownContent.module.less";

/** Свойства компонента MultiselectFieldDropdownContent. */
interface IMultiselectFieldDropdownContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const sizeToClassNameMap = createSizeToClassNameMap(styles);

export const MultiselectFieldDropdownContent: React.FC<IMultiselectFieldDropdownContentProps> = ({
    children,
    className,
    ...htmlDivAttributes
}) => {
    const { size } = useContext(MultiselectFieldContext);

    return (
        <div className={clsx(styles.multiselectFieldContentWrapper, className)} {...htmlDivAttributes}>
            <div tabIndex={-1} className={clsx(styles.multiselectFieldContent, sizeToClassNameMap[size])}>
                {children}
            </div>
        </div>
    );
};
