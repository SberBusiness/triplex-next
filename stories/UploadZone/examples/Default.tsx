import React from "react";
import { UploadZone, Gap, Text, Link, EFontType, ETextSize } from "@sberbusiness/triplex-next";
import { ClouddraguploadStrokeSrvIcon32 } from "@sberbusiness/icons-next";

export const Default = () => {
    const handleChange = () => {};

    return (
        <div style={{ maxWidth: "480px" }}>
            <UploadZone onChange={handleChange}>
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
        </div>
    );
};
