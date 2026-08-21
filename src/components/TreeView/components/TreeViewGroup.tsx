import React from "react";
import clsx from "clsx";
import styles from "../styles/TreeView.module.less";

/** Свойства компонента TreeViewGroup. */
export interface ITreeViewGroupProps extends React.HTMLAttributes<HTMLUListElement> {}

/** Обертка для вложенных TreeViewNode. Задает семантику группы дочерних нод (role="group"). */
export const TreeViewGroup = React.forwardRef<HTMLUListElement, ITreeViewGroupProps>(
    ({ children, className, ...props }, ref) => (
        <ul role="group" className={clsx(styles.treeViewGroup, className)} {...props} ref={ref}>
            {children}
        </ul>
    ),
);

TreeViewGroup.displayName = "TreeViewGroup";
