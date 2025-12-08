import React from "react";
import styles from "../styles/TreeView.module.less";

/** Свойства компонента TreeViewGroup. */
export interface ITreeViewGroupProps extends React.HTMLAttributes<HTMLUListElement> {}

/** Обертка для вложенных TreeNode. */
export const TreeViewGroup: React.FC<ITreeViewGroupProps> = ({ children, ...props }) => (
    <ul role="group" className={styles.treeViewGroup} {...props}>
        {children}
    </ul>
);
