import React from "react";
import { Body, IBodyProps } from "@sberbusiness/triplex-next/components/Body/Body";
import clsx from "clsx";
import styles from "../styles/Page.module.less";

/** Свойства компонента BodyPage. */
export interface IBodyPageProps extends IBodyProps {}

/** Тело компонента Page. */
export const BodyPage = React.forwardRef<HTMLDivElement, IBodyPageProps>(({ className, ...rest }, ref) => (
    <Body className={clsx(styles.bodyPage, className)} {...rest} ref={ref} />
));

BodyPage.displayName = "BodyPage";
