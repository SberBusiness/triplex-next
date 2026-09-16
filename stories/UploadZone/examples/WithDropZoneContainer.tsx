import React, { useState } from "react";
import { UploadZone, Gap, Text, Link, EFontType, ETextSize } from "@sberbusiness/triplex-next";
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

    return (
        <div ref={setDropZoneContainer} style={{ position: "relative", display: "flow-root", maxWidth: "480px" }}>
            <UploadZone
                onChange={handleChange}
                dropZoneContainer={dropZoneContainer}
                renderContainerContent={renderContainerContent}
            >
                {({ openUploadDialog }) => (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            padding: "16px 0",
                        }}
                    >
                        <UploadZone.Input multiple />
                        <ClouddraguploadStrokeSrvIcon32 paletteIndex={5} />
                        <Gap size={4} />
                        <Text type={EFontType.PRIMARY} size={ETextSize.B3} tag="div">
                            Перетащите файлы или{" "}
                            <Link onClick={openUploadDialog}>выберите на компьютере</Link>
                        </Text>
                    </div>
                )}
            </UploadZone>
            <Gap size={16} />
            <Text type={EFontType.SECONDARY} size={ETextSize.B4} tag="div">
                Файлы можно перетащить в любое место этого блока — дроп-зона раскроется на всю его площадь.
            </Text>
        </div>
    );
};
