import React, { forwardRef, useEffect, useId, useRef, useState } from "react";
import clsx from "clsx";
import {
    Button,
    EButtonTheme,
    EComponentSize,
    ETriplexNextTheme,
    Island,
    TextField,
    ThemeProvider,
} from "@sberbusiness/triplex-next";
import { createKnitTexture, IKnitTexture } from "./knitTexture";
import { useKnittedCanvas } from "./useKnittedCanvas";
import reference from "../assets/reference.png";
import styles from "./KnittedSkin.module.less";

const TOKENS = {
    ColorNeutral: {
        100: { value: "#faf6ed" },
        90: { value: "#f0e9dd" },
        80: { value: "#e3d9c9" },
        70: { value: "#d4c5b3" },
        30: { value: "#766b5e" },
        10: { value: "#302e28" },
    },
    ColorBrand: {
        30: { value: "#243f35" },
        40: { value: "#345b48" },
        50: { value: "#426953" },
        60: { value: "#527b62" },
    },
    ColorError: { 50: { value: "#964435" } },
    Button: { General_Shadow_Focus: { value: "0 0 0 3px #be8541 inset" } },
    Island: { Type1_Shadow: { value: "0 2px 12px #302e2812, 0 0 0 1px #d4c5b3" } },
    FormField: {
        Background_Default: { value: "#faf6ed" },
        Background_Hover: { value: "#f0e9dd" },
        Background_Active: { value: "#faf6ed" },
        Input_Color_Default: { value: "#302e28" },
        Label_Color_Default: { value: "#766b5e" },
        Shadow_Default: { value: "0 0 0 1px #d4c5b3 inset" },
        Shadow_Active: { value: "0 0 0 2px #426953 inset" },
    },
};

const METHODS = [
    {
        id: "overlay",
        number: "01",
        title: "Текстура поверх",
        subtitle: "Рельеф без изменения контуров",
        detail: "Прозрачный слой бликов и теней подчёркивает петли. Буквы и границы остаются гладкими.",
    },
    {
        id: "svg",
        number: "02",
        title: "SVG-фильтр",
        subtitle: "Свет и небольшое искажение",
        detail: "Петли деформируют изображение. Направленный свет подчёркивает вязку.",
    },
    {
        id: "webgl",
        number: "03",
        title: "WebGL",
        subtitle: "Рельеф с сохранением деталей",
        detail: "Свет подчёркивает рельеф петель. Текст сохраняет исходную детализацию.",
    },
] as const;

interface ISceneProps {
    name: string;
    saved: boolean;
    disabled: boolean;
    onNameChange: (value: string) => void;
    onSave: () => void;
}

const Scene = forwardRef<HTMLDivElement, ISceneProps>(({ name, saved, disabled, onNameChange, onSave }, ref) => (
    <div ref={ref} className={styles.scene}>
        <div className={styles.sampleHeader}>
            <span className={styles.eyebrow}>Зимняя коллекция</span>
            <h2>Ближе к теплу.</h2>
            <p>Знакомый интерфейс в новом материале.</p>
        </div>
        <div data-knit-input>
            <TextField
                className={styles.knittedComponent}
                data-knit-component
                label="Ваше имя"
                inputProps={{ value: name, maxLength: 24, onChange: (event) => onNameChange(event.target.value) }}
            />
        </div>
        <Button
            className={styles.knittedComponent}
            data-knit-component
            theme={EButtonTheme.GENERAL}
            size={EComponentSize.LG}
            block
            disabled={disabled}
            onClick={onSave}
            aria-pressed={saved}
        >
            {saved ? "Сохранено ✓" : "Сохранить"}
        </Button>
        <Island className={clsx(styles.product, styles.knittedComponent)} data-knit-component size={EComponentSize.MD}>
            <Island.Header>
                <div className={styles.productTop}>
                    <span>Северный свитер</span>
                    <span className={styles.productMark}>№ 01</span>
                </div>
            </Island.Header>
            <Island.Body>
                <div className={styles.motif} aria-hidden="true">
                    <span>✦</span>
                    <span>✦</span>
                    <span>✦</span>
                    <span>✦</span>
                    <span>✦</span>
                </div>
                <p className={styles.productDescription}>
                    Мягкая шерсть, лесные оттенки
                    <br />и немного зимнего настроения.
                </p>
            </Island.Body>
            <Island.Footer>
                <div className={styles.productBottom}>
                    <strong>4 900 ₽</strong>
                    <span>100% шерсть</span>
                </div>
            </Island.Footer>
        </Island>
        <p className={styles.sampleFoot}>BUTTON · TEXTFIELD · ISLAND</p>
    </div>
));
Scene.displayName = "KnittedScene";

interface IPreviewProps extends ISceneProps {
    method: (typeof METHODS)[number];
    texture: IKnitTexture;
    stitch: number;
    strength: number;
}

interface IPreviewStyle extends React.CSSProperties {
    "--triplex-next-runtime-Knit-Texture": string;
    "--triplex-next-runtime-Knit-Size": string;
    "--triplex-next-runtime-Knit-Row": string;
    "--triplex-next-runtime-Knit-Strength": number;
    "--triplex-next-runtime-Knit-Filter": string;
}

const Preview = forwardRef<HTMLElement, IPreviewProps>(({ method, texture, stitch, strength, ...sceneProps }, ref) => {
    const sourceRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const filterId = `knit-${useId().replace(/:/g, "")}`;
    const status = useKnittedCanvas(
        sourceRef,
        canvasRef,
        method.id === "webgl" ? texture.relief : "",
        stitch,
        strength,
    );
    const previewStyle: IPreviewStyle = {
        "--triplex-next-runtime-Knit-Texture": `url("${texture.overlay}")`,
        "--triplex-next-runtime-Knit-Size": `${stitch}px`,
        "--triplex-next-runtime-Knit-Row": `${(stitch * 4) / 3}px`,
        "--triplex-next-runtime-Knit-Strength": strength * 0.65,
        "--triplex-next-runtime-Knit-Filter": strength > 0 ? `url("#${filterId}")` : "none",
    };
    return (
        <section
            ref={ref}
            className={styles.preview}
            data-method={method.id}
            style={previewStyle}
            aria-label={method.title}
        >
            <div className={styles.methodHeader}>
                <span className={styles.methodNumber}>{method.number}</span>
                <div>
                    <h2>{method.title}</h2>
                    <p>{method.subtitle}</p>
                </div>
            </div>
            {method.id === "svg" && texture.height && (
                <svg className={styles.filterDefinitions} aria-hidden="true" width="0" height="0">
                    <defs>
                        <filter id={filterId} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
                            <feImage
                                href={texture.height}
                                x="0"
                                y="0"
                                width={stitch}
                                height={(stitch * 4) / 3}
                                result="heightCell"
                            />
                            <feTile in="heightCell" result="heightMap" />
                            <feDisplacementMap
                                in="SourceGraphic"
                                in2="heightMap"
                                scale={strength * stitch * 0.32}
                                xChannelSelector="A"
                                yChannelSelector="A"
                                result="fabric"
                            />
                            <feDiffuseLighting
                                in="heightMap"
                                surfaceScale={stitch * 0.2}
                                diffuseConstant="1.2"
                                result="light"
                            >
                                <feDistantLight azimuth="235" elevation="55" />
                            </feDiffuseLighting>
                            <feComposite
                                in="fabric"
                                in2="light"
                                operator="arithmetic"
                                k1="1"
                                k2="0"
                                k3="0"
                                k4="0"
                                result="litFabric"
                            />
                            <feComposite
                                in="SourceGraphic"
                                in2="litFabric"
                                operator="arithmetic"
                                k1="0"
                                k2={1 - strength}
                                k3={strength}
                                k4="0"
                            />
                        </filter>
                    </defs>
                </svg>
            )}
            <div className={styles.stage}>
                <Scene ref={sourceRef} {...sceneProps} />
                {method.id === "webgl" && (
                    <canvas
                        ref={canvasRef}
                        className={clsx(styles.canvas, (status !== "ready" || strength === 0) && styles.canvasHidden)}
                        aria-hidden="true"
                        data-status={status}
                    />
                )}
            </div>
            <p className={styles.methodDetail}>{method.detail}</p>
            {method.id === "webgl" && (
                <p className={styles.canvasNote} role="status">
                    {status === "unavailable"
                        ? "WebGL недоступен — показан исходный интерфейс."
                        : status === "loading"
                          ? "Подготавливаем вязку…"
                          : "При вводе поле показано без эффекта — видны курсор и выделение."}
                </p>
            )}
        </section>
    );
});
Preview.displayName = "KnittedPreview";

export const Default = forwardRef<HTMLDivElement>((_, ref) => {
    const scopeRef = useRef<HTMLDivElement>(null);
    const [texture, setTexture] = useState<IKnitTexture>({ relief: "", height: "", overlay: "" });
    const [stitch, setStitch] = useState(4);
    const [strength, setStrength] = useState(0.85);
    const [enabled, setEnabled] = useState(true);
    const [disabled, setDisabled] = useState(false);
    const [name, setName] = useState("Александра");
    const [saved, setSaved] = useState(false);
    useEffect(() => setTexture(createKnitTexture()), []);

    return (
        <div ref={ref}>
            <ThemeProvider scopeRef={scopeRef} theme={ETriplexNextTheme.LIGHT} tokens={TOKENS}>
                <main ref={scopeRef} className={styles.demo}>
                    <header className={styles.header}>
                        <div>
                            <p className={styles.kicker}>TRIPLEX / MATERIAL LAB</p>
                            <h1>Интерфейс из нитей</h1>
                            <p className={styles.intro}>
                                Три способа превратить одни и те же компоненты в вязаное полотно. Эффект только на
                                кнопке, поле и карточке.
                            </p>
                        </div>
                        <figure className={styles.reference}>
                            <img src={reference} alt="Референс: светлый вязаный свитер с цветным зимним рисунком" />
                            <figcaption>
                                Референс
                                <br />
                                <strong>Шерсть и мелкая петля</strong>
                            </figcaption>
                        </figure>
                    </header>
                    <div className={styles.controls}>
                        <label className={styles.rangeLabel}>
                            Размер петли <output>{stitch} px</output>
                            <input
                                aria-label="Размер петли"
                                type="range"
                                min="2"
                                max="10"
                                step="0.5"
                                value={stitch}
                                onChange={(event) => setStitch(Number(event.target.value))}
                            />
                        </label>
                        <label className={styles.rangeLabel}>
                            Сила эффекта <output>{Math.round(strength * 100)}%</output>
                            <input
                                aria-label="Сила эффекта"
                                type="range"
                                min="0"
                                max="1"
                                step="0.05"
                                value={strength}
                                onChange={(event) => setStrength(Number(event.target.value))}
                            />
                        </label>
                        <label className={styles.checkLabel}>
                            <input
                                type="checkbox"
                                checked={!enabled}
                                onChange={(event) => setEnabled(!event.target.checked)}
                            />
                            Без эффекта
                        </label>
                        <label className={styles.checkLabel}>
                            <input
                                type="checkbox"
                                checked={disabled}
                                onChange={(event) => setDisabled(event.target.checked)}
                            />
                            Отключить кнопки
                        </label>
                    </div>
                    <div className={styles.comparison}>
                        {METHODS.map((method) => (
                            <Preview
                                key={method.id}
                                method={method}
                                texture={texture}
                                stitch={stitch}
                                strength={enabled ? strength : 0}
                                name={name}
                                saved={saved}
                                disabled={disabled}
                                onNameChange={setName}
                                onSave={() => setSaved((value) => !value)}
                            />
                        ))}
                    </div>
                    <footer className={styles.footer}>
                        <p>Попробуйте ввести имя и нажать «Сохранить». Значения синхронизируются во всех образцах.</p>
                        <p>Крупнее петли — заметнее материал. Мельче петли — лучше читается текст.</p>
                    </footer>
                </main>
            </ThemeProvider>
        </div>
    );
});
Default.displayName = "KnittedSkinDemo";
