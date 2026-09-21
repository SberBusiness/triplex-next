import React, { useState } from "react";
import { UploadZone, Gap, Text, Link, EFontType, ETextSize } from "@sberbusiness/triplex-next";
import { ClouddraguploadStrokeSrvIcon32 } from "@sberbusiness/icons-next";
import { action } from "storybook/actions";

export interface PlaygroundArgs {
    /** Разрешить выбор нескольких файлов (prop поля UploadZone.Input). */
    multiple: boolean;
    /** Передать внешний контейнер в prop dropZoneContainer. */
    withDropZoneContainer: boolean;
    /** Отрисовать контент дроп-зоны через prop renderContainerContent. */
    withContainerContent: boolean;
}

export const Playground = ({ multiple, withDropZoneContainer, withContainerContent }: PlaygroundArgs) => {
    const [dropZoneContainer, setDropZoneContainer] = useState<HTMLDivElement | null>(null);

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
                onChange={action("onChange")}
                dropZoneContainer={withDropZoneContainer ? dropZoneContainer : undefined}
                renderContainerContent={withContainerContent ? renderContainerContent : undefined}
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
                        <UploadZone.Input multiple={multiple} />
                        <ClouddraguploadStrokeSrvIcon32 paletteIndex={5} />
                        <Gap size={4} />
                        <Text type={EFontType.PRIMARY} size={ETextSize.B3} tag="div">
                            Label text
                            {"\u00A0"}
                            <Link onClick={openUploadDialog}>Link text</Link>
                        </Text>
                    </div>
                )}
            </UploadZone>
        </div>
    );
};
