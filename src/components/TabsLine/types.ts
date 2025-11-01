import { ETabsSize } from "./enum";
import { ITabsLineItemProps } from "./components/TabsLineItem";

/** Общие свойства TabsLineDesktop и TabsLine Mobile. */
export interface ITabsLineBase {
    children?: never;
    /** Коллекция табов. */
    tabs: ITabsLineItemProps[];
    /** Коллбек смены таба. */
    onChangeTab: (tabId: string) => void;
    /** Идентификатор выбранного таба. */
    selectedTabId: string;
    /** Размер компонента. */
    size?: ETabsSize;
}
