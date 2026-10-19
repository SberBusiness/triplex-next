import React, { forwardRef, useId, useRef, useState } from "react";
import clsx from "clsx";
import {
    Button,
    EButtonTheme,
    EComponentSize,
    ETriplexNextTheme,
    Island,
    SkinProvider,
    TextField,
    ThemeProvider,
} from "@sberbusiness/triplex-next";
import { LAB_TOKENS, SKIN_TOKENS } from "./tokens";
import styles from "./RetroSkins.module.less";

const SKINS = [
    {
        id: "win95",
        year: "1995",
        name: "Windows 95",
        caption: "Знакомо до щелчка мыши",
        window: "Мой первый проект.exe",
        hero: "Добро пожаловать!",
        detail: "Скошенные грани, утопленное поле и кнопка, которая физически нажимается.",
        character: "Узнаваемость",
    },
    {
        id: "web2",
        year: "2005",
        name: "Web 2.0",
        caption: "Когда у кнопок был глянец",
        window: "triplex / your next big thing",
        hero: "hello, internet.",
        detail: "Стеклянные блики, округлые формы и выпуклая кнопка на глубокой тени.",
        character: "Тактильность",
    },
    {
        id: "wordart",
        year: "1999",
        name: "WordArt",
        caption: "Чуть больше, чем красиво",
        window: "Документ1 — Полёт фантазии",
        hero: "Сделай красиво!",
        detail: "Радужный глянец, глубокие цветные грани и светлая поверхность под текстом.",
        character: "Первое «вау»",
    },
] as const;

interface IPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
    skin: (typeof SKINS)[number];
    enabled: boolean;
    disabled: boolean;
    name: string;
    launches: number;
    onNameChange: (name: string) => void;
    onLaunch: () => void;
}

const Preview = forwardRef<HTMLDivElement, IPreviewProps>(
    ({ skin, enabled, disabled, name, launches, onNameChange, onLaunch, className, ...rest }, ref) => {
        const scopeRef = useRef<HTMLDivElement>(null);
        const headingId = useId();
        return (
            <div ref={ref} className={clsx(styles.preview, className)} {...rest}>
                <div className={styles.previewHeading}>
                    <span className={styles.year}>{skin.year}</span>
                    <div>
                        <h2 id={headingId}>{skin.name}</h2>
                        <p>{skin.caption}</p>
                    </div>
                </div>
                <ThemeProvider
                    scopeRef={scopeRef}
                    theme={ETriplexNextTheme.LIGHT}
                    tokens={enabled ? SKIN_TOKENS : undefined}
                >
                    <div
                        ref={scopeRef}
                        className={styles.stage}
                        data-skin={enabled ? skin.id : "plain"}
                        role="region"
                        aria-labelledby={headingId}
                    >
                        <div className={styles.window}>
                            <div className={styles.titleBar} aria-hidden="true">
                                <span className={styles.appIcon}>✦</span>
                                <span className={styles.windowTitle}>{skin.window}</span>
                                <span className={styles.windowButtons}>
                                    <span>_</span>
                                    <span>□</span>
                                    <span>×</span>
                                </span>
                            </div>
                            <div className={styles.menuBar} aria-hidden="true">
                                {skin.id === "win95" ? (
                                    <>
                                        <span>Файл</span>
                                        <span>Правка</span>
                                        <span>Вид</span>
                                        <span>Справка</span>
                                    </>
                                ) : skin.id === "wordart" ? (
                                    <>
                                        <span className={styles.toolbarA}>A</span>
                                        <span>Arial Black</span>
                                        <span>48 ▾</span>
                                        <span>Ж</span>
                                        <span>К</span>
                                    </>
                                ) : (
                                    <>
                                        <span>home</span>
                                        <span>my projects</span>
                                        <span>community</span>
                                        <span className={styles.beta}>beta!</span>
                                    </>
                                )}
                            </div>
                            <SkinProvider skin={enabled && skin.id === "wordart" ? "wordart" : null}>
                                <div className={styles.content}>
                                    <div className={styles.hero}>
                                        <div className={styles.heroEmblem} aria-hidden="true">
                                            <span>✦</span>
                                        </div>
                                        <h3 className={styles.heroTitle}>
                                            <span className={styles.heroShadow} aria-hidden="true">
                                                {skin.hero}
                                            </span>
                                            <span className={styles.heroFace}>{skin.hero}</span>
                                        </h3>
                                        <p className={styles.heroCaption}>Большие идеи начинаются с одного клика.</p>
                                    </div>
                                    <TextField
                                        className={skin.id === "wordart" ? undefined : styles.field}
                                        label="Название проекта"
                                        inputProps={{
                                            value: name,
                                            maxLength: 24,
                                            onChange: (event) => onNameChange(event.target.value),
                                        }}
                                    />
                                    <Button
                                        className={skin.id === "wordart" ? undefined : styles.launchButton}
                                        theme={EButtonTheme.GENERAL}
                                        size={EComponentSize.LG}
                                        block
                                        disabled={disabled}
                                        onClick={onLaunch}
                                    >
                                        {launches ? "Запустить ещё раз" : "Запустить проект"}
                                    </Button>
                                    <Island
                                        className={skin.id === "wordart" ? undefined : styles.project}
                                        size={EComponentSize.MD}
                                    >
                                        <Island.Header>
                                            <div className={styles.cardEyebrow}>
                                                <span>МОЙ ПРОЕКТ</span>
                                                <span className={styles.cardStar} aria-hidden="true">
                                                    ✦
                                                </span>
                                            </div>
                                            <h3 className={styles.projectTitle}>{name || "Без названия"}</h3>
                                        </Island.Header>
                                        <Island.Body>
                                            <p className={styles.projectDescription}>
                                                Идея сегодня. Легенда завтра.
                                                <br />
                                                Всё остальное — дело техники.
                                            </p>
                                        </Island.Body>
                                        <Island.Footer>
                                            <div className={styles.projectMeta}>
                                                <span>12 экранов</span>
                                                <span>3 участника</span>
                                            </div>
                                        </Island.Footer>
                                    </Island>
                                    <div className={styles.statusBar}>
                                        <span className={styles.statusDot} />
                                        {launches ? `Запуск № ${launches} выполнен` : "Готов к большим делам"}
                                    </div>
                                </div>
                            </SkinProvider>
                        </div>
                        <div className={styles.stageFoot} aria-hidden="true">
                            BUTTON / TEXTFIELD / ISLAND
                        </div>
                    </div>
                </ThemeProvider>
                <div className={styles.verdict}>
                    <span>{skin.character}</span>
                    <p>{skin.detail}</p>
                </div>
            </div>
        );
    },
);
Preview.displayName = "RetroSkinPreview";

export const Default = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...rest }, ref) => {
        const scopeRef = useRef<HTMLElement>(null);
        const [enabled, setEnabled] = useState(true);
        const [disabled, setDisabled] = useState(false);
        const [name, setName] = useState("Большие планы");
        const [launches, setLaunches] = useState(0);
        return (
            <div ref={ref} className={className} {...rest}>
                <ThemeProvider scopeRef={scopeRef} theme={ETriplexNextTheme.LIGHT} tokens={LAB_TOKENS}>
                    <main ref={scopeRef} className={styles.retroSkins}>
                        <header className={styles.header}>
                            <div>
                                <p className={styles.eyebrow}>TRIPLEX / TIME MACHINE</p>
                                <h1>
                                    Интернет, который
                                    <br />
                                    можно потрогать.
                                </h1>
                            </div>
                            <div className={styles.headerNote}>
                                <span>ТРИ ЭПОХИ. ОДНИ КОМПОНЕНТЫ.</span>
                                <p>
                                    Объём, характер и немного ностальгии.
                                    <br />
                                    Попробуйте нажать — у кнопок есть глубина.
                                </p>
                            </div>
                        </header>
                        <div className={styles.controls}>
                            <p>Выберите настроение.</p>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={!enabled}
                                    onChange={(event) => setEnabled(!event.target.checked)}
                                />
                                Показать без скинов
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={disabled}
                                    onChange={(event) => setDisabled(event.target.checked)}
                                />
                                Заблокировать кнопки
                            </label>
                        </div>
                        <div className={styles.gallery}>
                            {SKINS.map((skin) => (
                                <Preview
                                    key={skin.id}
                                    skin={skin}
                                    enabled={enabled}
                                    disabled={disabled}
                                    name={name}
                                    launches={launches}
                                    onNameChange={setName}
                                    onLaunch={() => setLaunches((value) => value + 1)}
                                />
                            ))}
                        </div>
                        <footer className={styles.footer}>
                            <p>
                                Меняются формы, шрифты, грани и свет. Текст остаётся читаемым, компоненты —
                                интерактивными.
                            </p>
                            <p role="status">
                                {launches
                                    ? `Проект «${name || "Без названия"}» запущен. Всего запусков: ${launches}.`
                                    : "Введите название проекта — оно появится во всех трёх вариантах."}
                            </p>
                        </footer>
                    </main>
                </ThemeProvider>
            </div>
        );
    },
);
Default.displayName = "RetroSkinsDemo";
