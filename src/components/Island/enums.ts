/** Типы компонента Island. Отличаются цвет и тень. */
export enum EIslandType {
    /** Основной тип: непрозрачный фон (`--triplex-next-Island-Type1_Background`), без тени. */
    TYPE_1 = "type_1",
    /** Полупрозрачный фон (`--triplex-next-Island-Type2_Background`) с внутренней рамкой (`--triplex-next-Island-Type2_Shadow`). */
    TYPE_2 = "type_2",
    /** Приглушённый фон (`--triplex-next-Island-Type3_Background`), без тени. */
    TYPE_3 = "type_3",
}
