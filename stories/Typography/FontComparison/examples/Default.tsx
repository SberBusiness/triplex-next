import React, { useState } from "react";
import clsx from "clsx";
import { Button, EButtonTheme, EComponentSize, EFormFieldStatus, TextField } from "@sberbusiness/triplex-next";
import { DefaulticonStrokePrdIcon24 } from "@sberbusiness/icons-next";
import styles from "../FontComparison.module.less";

const FONT_SIZES = [10, 11, 12, 13, 14, 15, 16];
const COMPONENT_SIZES = [
    { size: EComponentSize.SM, fontSize: 12 },
    { size: EComponentSize.MD, fontSize: 14 },
    { size: EComponentSize.LG, fontSize: 16 },
];
const VERSIONS = [
    { key: "previous", label: "До обновления" },
    { key: "current", label: "Новый шрифт" },
] as const;

const renderPair = (key: string, render: (label: string) => React.ReactNode) => (
    <div className={styles.pair} key={key}>
        {VERSIONS.map(({ key: version, label }) => (
            <div className={clsx(styles.panel, styles[version])} data-font-version={version} key={version}>
                {render(label)}
            </div>
        ))}
    </div>
);

export const Default = () => {
    const [sampleText, setSampleText] = useState("Съешь ещё булок. 0123456789 ₽");
    const [recipient, setRecipient] = useState("Иван Петров");
    const [search, setSearch] = useState("");

    const handleRecipientChange = (event: React.ChangeEvent<HTMLInputElement>) => setRecipient(event.target.value);

    return (
        <div className={styles.fontComparison}>
            <TextField
                className={styles.editor}
                label="Текст для сравнения"
                inputProps={{ value: sampleText, onChange: (event) => setSampleText(event.target.value) }}
            />

            <div className={clsx(styles.pair, styles.headings)}>
                {VERSIONS.map(({ key, label }) => (
                    <div className={styles.columnHeading} key={key}>
                        <strong>{label}</strong>
                        <span>SB Sans Text · Regular / Semibold</span>
                    </div>
                ))}
            </div>

            <section className={styles.section} aria-labelledby="font-comparison-text">
                <h2 id="font-comparison-text">Текст 10–16 px</h2>
                <p className={styles.hint}>
                    Первая строка — Regular, вторая — Semibold. Третья — похожие символы в Regular. Высота строки
                    одинакова.
                </p>
                {FONT_SIZES.map((fontSize) => (
                    <div className={styles.example} key={fontSize}>
                        <h3>{fontSize} px</h3>
                        {renderPair(`text-${fontSize}`, () => (
                            <div className={styles.textSamples} style={{ fontSize }}>
                                <p className={styles.regular}>{sampleText}</p>
                                <p className={styles.semibold}>{sampleText}</p>
                                <p className={styles.regular}>Aa Bb 0O 1lI Ёё — № 123</p>
                            </div>
                        ))}
                    </div>
                ))}
            </section>

            <section className={styles.section} aria-labelledby="font-comparison-normal">
                <h2 id="font-comparison-normal">Автоматическая высота строки</h2>
                <p className={styles.hint}>Здесь высоту строки определяет сам шрифт. Размер текста — 14 px.</p>
                {renderPair("normal", () => (
                    <div className={clsx(styles.regular, styles.normalSample)}>
                        <div>Получатель: Иван Петров</div>
                        <div>Сумма перевода: 12 345,67 ₽</div>
                        <div>Назначение: оплата по договору № 123</div>
                    </div>
                ))}
            </section>

            <section className={styles.section} aria-labelledby="font-comparison-buttons">
                <h2 id="font-comparison-buttons">Кнопки</h2>
                {COMPONENT_SIZES.map(({ size, fontSize }) => (
                    <div className={styles.example} key={size}>
                        <h3>
                            {size.toUpperCase()} · {fontSize} px
                        </h3>
                        {renderPair(`buttons-${size}`, () => (
                            <div className={styles.buttons}>
                                <Button className={styles.button} size={size} theme={EButtonTheme.GENERAL}>
                                    Продолжить
                                </Button>
                                <Button className={styles.button} size={size} theme={EButtonTheme.SECONDARY}>
                                    Сохранить
                                </Button>
                                <Button className={styles.button} size={size} theme={EButtonTheme.GENERAL} disabled>
                                    Недоступно
                                </Button>
                            </div>
                        ))}
                    </div>
                ))}
            </section>

            <section className={styles.section} aria-labelledby="font-comparison-inputs">
                <h2 id="font-comparison-inputs">Поля ввода</h2>
                <p className={styles.hint}>Измените значение в любой колонке — оно появится и в соседней.</p>
                {COMPONENT_SIZES.map(({ size, fontSize }) => (
                    <div className={styles.example} key={size}>
                        <h3>
                            {size.toUpperCase()} · {fontSize} px
                        </h3>
                        {renderPair(`input-${size}`, (label) => (
                            <TextField
                                className={styles.field}
                                size={size}
                                label="Получатель"
                                prefix={<DefaulticonStrokePrdIcon24 paletteIndex={5} />}
                                inputProps={{
                                    value: recipient,
                                    onChange: handleRecipientChange,
                                    "aria-label": `Получатель ${size.toUpperCase()}, ${label}`,
                                }}
                            />
                        ))}
                    </div>
                ))}

                <div className={styles.example}>
                    <h3>Пустое активное поле</h3>
                    {renderPair("placeholder", (label) => (
                        <TextField
                            className={styles.field}
                            active
                            label="Поиск"
                            prefix={<DefaulticonStrokePrdIcon24 paletteIndex={5} />}
                            inputProps={{
                                value: search,
                                onChange: (event) => setSearch(event.target.value),
                                placeholder: "Имя или номер",
                                "aria-label": `Поиск, ${label}`,
                            }}
                        />
                    ))}
                </div>

                <div className={styles.example}>
                    <h3>Ошибка и пояснение</h3>
                    {renderPair("error", (label) => (
                        <TextField
                            className={styles.field}
                            status={EFormFieldStatus.ERROR}
                            label="Получатель"
                            description={<span className={styles.regular}>Проверьте реквизиты получателя</span>}
                            inputProps={{
                                value: recipient,
                                onChange: handleRecipientChange,
                                "aria-invalid": true,
                                "aria-label": `Получатель с ошибкой, ${label}`,
                            }}
                        />
                    ))}
                </div>

                <div className={styles.example}>
                    <h3>Недоступное поле</h3>
                    {renderPair("disabled", (label) => (
                        <TextField
                            className={styles.field}
                            status={EFormFieldStatus.DISABLED}
                            label="Получатель"
                            inputProps={{ value: recipient, "aria-label": `Недоступный получатель, ${label}` }}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};
