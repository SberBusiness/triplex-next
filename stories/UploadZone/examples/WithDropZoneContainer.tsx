import React, { useState } from "react";
import {
    UploadZone,
    MobileView,
    Gap,
    Text,
    Button,
    EButtonTheme,
    EComponentSize,
    EFontType,
    ETextSize,
} from "@sberbusiness/triplex-next";
import { ClouddraguploadStrokeSrvIcon32 } from "@sberbusiness/icons-next";

export const WithDropZoneContainer = () => {
    /** Контейнер, на площади которого перехватывается перетаскивание файлов. */
    const [dropZoneContainer, setDropZoneContainer] = useState<HTMLDivElement | null>(null);

    const handleChange = () => {};

    const renderContainerContent = () => (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
            }}
        >
            <ClouddraguploadStrokeSrvIcon32 paletteIndex={5} />
            <Gap size={4} />
            <Text type={EFontType.PRIMARY} size={ETextSize.B3} tag="div">
                Положите файлы сюда
            </Text>
        </div>
    );

    /** Широкий экран: перетаскивание плюс ссылка-кнопка выбора файлов. */
    const renderDesktopContent = (openUploadDialog: () => void) => (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "16px 0" }}>
            <UploadZone.Input multiple />
            <ClouddraguploadStrokeSrvIcon32 paletteIndex={5} />
            <Gap size={4} />
            <Text type={EFontType.PRIMARY} size={ETextSize.B3} tag="div">
                Перетащите файлы или{"\u00a0"}
                <Button theme={EButtonTheme.LINK} size={EComponentSize.SM} onClick={openUploadDialog}>
                    выберите на компьютере
                </Button>
            </Text>
        </div>
    );

    /** Узкий экран: перетаскивания нет, поэтому вместо области сброса — обычная кнопка. */
    const renderMobileContent = (openUploadDialog: () => void) => (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", padding: "16px 0" }}>
            <UploadZone.Input multiple />
            <Text type={EFontType.PRIMARY} size={ETextSize.B3} tag="div">
                Файлы для импорта
            </Text>
            <Gap size={8} />
            <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.SM} onClick={openUploadDialog}>
                Загрузить
            </Button>
        </div>
    );

    return (
        <div ref={setDropZoneContainer} style={{ position: "relative", display: "flow-root", maxWidth: "480px" }}>
            <UploadZone
                onChange={handleChange}
                dropZoneContainer={dropZoneContainer}
                renderContainerContent={renderContainerContent}
            >
                {({ openUploadDialog }) => (
                    <MobileView fallback={renderDesktopContent(openUploadDialog)}>
                        {renderMobileContent(openUploadDialog)}
                    </MobileView>
                )}
            </UploadZone>
            <Gap size={16} />
            <Text type={EFontType.SECONDARY} size={ETextSize.B4} tag="div">
                Файлы можно перетащить в любое место этого блока — дроп-зона раскроется на всю его площадь.
            </Text>
        </div>
    );
};
