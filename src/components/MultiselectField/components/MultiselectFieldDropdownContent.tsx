import React, { useContext } from "react";
import { MultiselectFieldContext } from "../MultiselectFieldContext";
import { createSizeToClassNameMap } from "../../../utils/classNameMaps";
import clsx from "clsx";
import styles from "../styles/MultiselectFieldDropdownContent.module.less";
import { LoaderScreen } from "../../../components/LoaderScreen";

/** Свойства компонента MultiselectFieldDropdownContent. */
export interface IMultiselectFieldDropdownContentProps extends React.HTMLAttributes<HTMLDivElement> {
    loading?: boolean;
}

const sizeToClassNameMap = createSizeToClassNameMap(styles);

export const MultiselectFieldDropdownContent: React.FC<IMultiselectFieldDropdownContentProps> = ({
    children,
    className,
    loading = false,
    ...htmlDivAttributes
}) => {
    const { size } = useContext(MultiselectFieldContext);

    return (
        <div className={clsx(styles.multiselectFieldContentWrapper, className)} {...htmlDivAttributes}>
            <div tabIndex={-1} className={clsx(styles.multiselectFieldContent, sizeToClassNameMap[size])}>
                {children}
                {loading && <LoaderScreen type="small" />}
            </div>
        </div>
    );
};
