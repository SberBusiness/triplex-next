import React from "react";
import clsx from "clsx";
import styles from "../styles/TreeView.module.less";

/** Свойства компонента TreeViewGroup. */
export interface ITreeViewGroupProps extends React.HTMLAttributes<HTMLUListElement> {}

/** Обертка для вложенных TreeViewNode. Задает семантику группы дочерних нод (role="group"). */
export const TreeViewGroup = React.forwardRef<HTMLUListElement, ITreeViewGroupProps>(
    ({ children, className, ...props }, ref) => (
        // role после {...props}: семантика группы - контракт компонента, потребитель ее не переопределяет.
        <ul className={clsx(styles.treeViewGroup, className)} {...props} role="group" ref={ref}>
            {children}
        </ul>
    ),
);

TreeViewGroup.displayName = "TreeViewGroup";
