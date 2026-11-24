import React, { useEffect, useState } from "react";
import { useTheme } from "storybook/theming";
import faces from "./faces.json";
import styles from "./FontGlyphs.module.less";

interface IGlyph {
    gid: number;
    name: string;
    codes: number[];
    path: string;
    viewBox: string;
}

// Восемь пиктограмм из образца icons-designer в архиве glyphfull.
const DESIGNER_ICONS = new Set([0x100241, 0x10039a, 0x10020a, 0x100262, 0x100263, 0x100211, 0x100202, 0x100204]);
const FAMILIES = [...new Set(faces.map(({ family }) => family))];
const formatCode = (code: number) => `U+${code.toString(16).toUpperCase().padStart(4, "0")}`;

function matchesQuery(glyph: IGlyph, query: string) {
    if (!query) return true;
    if (Array.from(query).length === 1) return glyph.codes.some((code) => String.fromCodePoint(code) === query);
    if (/^U\+[0-9a-f]+$/i.test(query)) return glyph.codes.includes(parseInt(query.slice(2), 16));
    return glyph.name.toLowerCase().includes(query.toLowerCase()) || `gid ${glyph.gid}` === query.toLowerCase();
}

function GlyphGrid({ faceId, group, query }: { faceId: string; group: string; query: string }) {
    const [glyphs, setGlyphs] = useState<IGlyph[]>();
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        const url = new URL(`./data/${faceId}.json`, import.meta.url);
        fetch(url, { signal: controller.signal })
            .then((response) => {
                if (!response.ok) throw new Error(response.statusText);
                return response.json() as Promise<IGlyph[]>;
            })
            .then(setGlyphs)
            .catch(() => {
                if (!controller.signal.aborted) setFailed(true);
            });
        return () => controller.abort();
    }, [faceId]);

    if (failed) return <p role="alert">Не удалось загрузить глифы. Обновите страницу, чтобы попробовать ещё раз.</p>;
    if (!glyphs) return <p role="status">Загрузка глифов…</p>;

    const visible = glyphs.filter((glyph) => {
        if (group === "icons" && !glyph.codes.some((code) => DESIGNER_ICONS.has(code))) return false;
        if (group === "unencoded" && glyph.codes.length) return false;
        return matchesQuery(glyph, query === " " ? query : query.trim());
    });

    return (
        <>
            <p role="status">
                Показано {visible.length} из {glyphs.length} глифов.
            </p>
            {visible.length === 0 ? (
                <p>В этом начертании нет глифов, подходящих под выбранные условия.</p>
            ) : (
                <ul className={styles.grid} aria-label="Глифы выбранного начертания">
                    {visible.map(({ gid, name, codes, path, viewBox }) => (
                        <li className={styles.card} key={gid}>
                            <div className={styles.sample}>
                                {path ? (
                                    <svg viewBox={viewBox} aria-hidden="true">
                                        <path d={path} transform="scale(1 -1)" fill="currentColor" />
                                    </svg>
                                ) : (
                                    <span>Без контура</span>
                                )}
                            </div>
                            <strong>{name}</strong>
                            <span>{codes.length ? codes.map(formatCode).join(" · ") : "Без Unicode"}</span>
                            <small>GID {gid}</small>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}

export function FontGlyphs() {
    const theme = useTheme();
    const [faceId, setFaceId] = useState("SBSansText-Regular");
    const [group, setGroup] = useState("all");
    const [query, setQuery] = useState("");
    const face = faces.find(({ id }) => id === faceId);

    return (
        <section
            className={styles.fontGlyphs}
            style={{ color: theme.color.defaultText, colorScheme: theme.base }}
            aria-label="Каталог глифов"
        >
            <div className={styles.controls}>
                <label>
                    Начертание
                    <select value={faceId} onChange={(event) => setFaceId(event.target.value)}>
                        {FAMILIES.map((family) => (
                            <optgroup key={family} label={family}>
                                {faces
                                    .filter((item) => item.family === family)
                                    .map(({ id, style }) => (
                                        <option key={id} value={id}>
                                            {family} {style}
                                        </option>
                                    ))}
                            </optgroup>
                        ))}
                    </select>
                </label>
                <label>
                    Набор глифов
                    <select value={group} onChange={(event) => setGroup(event.target.value)}>
                        <option value="all">Все глифы</option>
                        <option value="icons">Пиктограммы дизайнеров</option>
                        <option value="unencoded">Без кода Unicode</option>
                    </select>
                </label>
                <label>
                    Поиск по символу, коду или имени
                    <input
                        type="search"
                        value={query}
                        placeholder="₽, U+20BD, ampersand"
                        onChange={(event) => setQuery(event.target.value)}
                    />
                </label>
            </div>
            <p>{face?.inLibrary ? "Подключено в Triplex Next" : "Доступно только в каталоге Storybook"}</p>
            <GlyphGrid key={faceId} faceId={faceId} group={group} query={query} />
        </section>
    );
}
