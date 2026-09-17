import React from "react";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { ITabsLineItemProps } from "./components/TabsLineItem";

/** Общие свойства TabsLineDesktop и TabsLineMobile. */
export interface ITabsLineBaseProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    /** Коллекция табов. */
    tabs: ITabsLineItemProps[];
    /** Коллбек смены таба. Вызывается с идентификатором таба, по которому кликнули. */
    onChangeTab: (tabId: string) => void;
    /** Идентификатор выбранного таба. */
    selectedId: string;
    /** Размер компонента. По умолчанию EComponentSize.MD. */
    size?: EComponentSize;
}
