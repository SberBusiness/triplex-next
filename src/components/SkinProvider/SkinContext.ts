import { createContext } from "react";

/** Доступный скин. null возвращает стандартное оформление Triplex. */
export type TSkin = "wordart" | null;

/** Внутренний контекст оформления, независимый от ThemeProvider. */
export const SkinContext = createContext<TSkin>(null);
