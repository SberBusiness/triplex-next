import React, { useState } from "react";
import {
    UploadZone,
    MobileView,
    Gap,
    Text,
    Link,
    Button,
    EButtonTheme,
    EComponentSize,
    EFontType,
    ETextSize,
} from "@sberbusiness/triplex-next";
import { ClouddraguploadStrokeSrvIcon32 } from "@sberbusiness/icons-next";

export const Default = () => {
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

    /** Широкий экран: перетаскивание плюс ссылка выбора файлов. */
    const renderDesktopContent = (openUploadDialog: () => void) => (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "16px 0" }}>
            <UploadZone.Input multiple />
            <ClouddraguploadStrokeSrvIcon32 paletteIndex={5} />
            <Gap size={4} />
            <Text type={EFontType.PRIMARY} size={ETextSize.B3} tag="div">
                Label text
                {"\u00A0"}
                <Link onClick={openUploadDialog}>Link text</Link>
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
        </div>
    );
};
