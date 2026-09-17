import React, { useState } from "react";
import {
    UploadZone,
    Gap,
    Text,
    Button,
    EButtonTheme,
    EComponentSize,
    EFontType,
    ETextSize,
} from "@sberbusiness/triplex-next";
import { ClouddraguploadStrokeSrvIcon32 } from "@sberbusiness/icons-next";
import { action } from "storybook/actions";

const itemStyle: React.CSSProperties = { width: "320px" };
const captionStyle: React.CSSProperties = { marginBottom: "8px", fontSize: "16px", fontWeight: "700" };
const contentStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "16px 0",
};
const containerContentStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
};

const renderContainerContent = () => (
    <div style={containerContentStyle}>
        <ClouddraguploadStrokeSrvIcon32 paletteIndex={5} />
        <Gap size={4} />
        <Text type={EFontType.PRIMARY} size={ETextSize.B3} tag="div">
            Положите файлы сюда
        </Text>
    </div>
);

const renderContent = (openUploadDialog: () => void) => (
    <div style={contentStyle}>
        <UploadZone.Input multiple />
        <ClouddraguploadStrokeSrvIcon32 paletteIndex={5} />
        <Gap size={4} />
        <Text type={EFontType.PRIMARY} size={ETextSize.B3} tag="div">
            Перетащите файлы или{" "}
            <Button theme={EButtonTheme.LINK} size={EComponentSize.SM} onClick={openUploadDialog}>
                выберите на компьютере
            </Button>
        </Text>
    </div>
);

/**
 * Набор состояний для скриншот-тестов.
 * Второй блок переводится в состояние перетаскивания play-функцией стори — так проверяется дроп-зона,
 * которая в обычном рендере не видна.
 */
export const VisualTests = () => {
    const [dropZoneContainer, setDropZoneContainer] = useState<HTMLDivElement | null>(null);

    return (
        <div style={{ display: "flex", alignItems: "flex-start", gap: "24px", flexWrap: "wrap" }}>
            <div style={itemStyle}>
                <div style={captionStyle}>DEFAULT</div>
                <UploadZone onChange={action("onChange")}>
                    {({ openUploadDialog }) => renderContent(openUploadDialog)}
                </UploadZone>
            </div>

            <div style={itemStyle}>
                <div style={captionStyle}>DRAG OVER</div>
                <div
                    ref={setDropZoneContainer}
                    data-testid="uploadzone-drop-container"
                    style={{ position: "relative", display: "flow-root", height: "120px" }}
                >
                    <UploadZone
                        onChange={action("onChange")}
                        dropZoneContainer={dropZoneContainer}
                        renderContainerContent={renderContainerContent}
                    >
                        {({ openUploadDialog }) => renderContent(openUploadDialog)}
                    </UploadZone>
                </div>
            </div>
        </div>
    );
};
