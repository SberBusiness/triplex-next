import React, { useState } from "react";
import {
    UploadZone,
    MobileView,
    Gap,
    Text,
    HelpBox,
    Button,
    MarkerStatus,
    TableBasic,
    ITableBasicColumn,
    ITableBasicRow,
    ECellType,
    EVerticalAlign,
    EMarkerStatus,
    EButtonTheme,
    EComponentSize,
    EFontType,
    ETextSize,
    ETooltipSize,
} from "@sberbusiness/triplex-next";
import {
    AttachmentStrokeSrvIcon20,
    ClouddraguploadStrokeSrvIcon32,
    DeleteStrokeSrvIcon20,
    DocumentStrokeSrvIcon32,
} from "@sberbusiness/icons-next";

const COLUMNS: ITableBasicColumn[] = [
    { fieldKey: "number", width: 38, verticalAlign: EVerticalAlign.TOP },
    { fieldKey: "logo", width: 56, verticalAlign: EVerticalAlign.TOP },
    { fieldKey: "summary", verticalAlign: EVerticalAlign.TOP },
    { fieldKey: "status", width: 122, verticalAlign: EVerticalAlign.TOP },
    { fieldKey: "attach", width: 64, cellType: ECellType.COMPONENTS, verticalAlign: EVerticalAlign.TOP },
    { fieldKey: "delete", width: 64, cellType: ECellType.COMPONENTS, verticalAlign: EVerticalAlign.TOP },
];

const FILES = [
    { name: "Выписка за январь.pdf", size: "1,2 МБ", status: EMarkerStatus.SUCCESS, statusText: "Загружен" },
    { name: "Выписка за февраль.pdf", size: "980 КБ", status: EMarkerStatus.WAITING, statusText: "Обработка" },
    { name: "Выписка за март.pdf", size: "1,4 МБ", status: EMarkerStatus.WAITING, statusText: "Обработка" },
];

const buildRows = (): ITableBasicRow[] =>
    FILES.map((file, index) => {
        const rowNumber = index + 1;

        return {
            rowKey: String(rowNumber),
            rowData: {
                number: `${rowNumber}.`,
                logo: <DocumentStrokeSrvIcon32 paletteIndex={5} />,
                summary: (
                    <>
                        <Text size={ETextSize.B3}>{file.name}</Text>
                        <Gap size={4} />
                        <Text type={EFontType.SECONDARY} size={ETextSize.B4}>
                            {file.size}
                        </Text>
                    </>
                ),
                status: (
                    <MarkerStatus status={file.status} size={EComponentSize.LG}>
                        {file.statusText}
                    </MarkerStatus>
                ),
                attach: (
                    <Button
                        size={EComponentSize.MD}
                        icon={<AttachmentStrokeSrvIcon20 paletteIndex={0} />}
                        theme={EButtonTheme.SECONDARY}
                        aria-label="Прикрепить"
                    />
                ),
                delete: (
                    <Button
                        size={EComponentSize.MD}
                        icon={<DeleteStrokeSrvIcon20 paletteIndex={0} />}
                        theme={EButtonTheme.SECONDARY}
                        aria-label="Удалить"
                    />
                ),
            },
        };
    });

export const Production = () => {
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

    const renderDesktopContent = (openUploadDialog: () => void) => (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "16px 0" }}>
            <UploadZone.Input multiple />
            <ClouddraguploadStrokeSrvIcon32 paletteIndex={5} />
            <Gap size={4} />
            <Text type={EFontType.PRIMARY} size={ETextSize.B3} tag="div">
                Перетащите файлы или{" "}
                <Button theme={EButtonTheme.LINK} size={EComponentSize.SM} onClick={openUploadDialog}>
                    выберите на компьютере
                </Button>
                {" "}
                <HelpBox tooltipSize={ETooltipSize.SM}>Поддерживаются файлы PDF и XLSX до 10 МБ.</HelpBox>
            </Text>
        </div>
    );

    const renderMobileContent = (openUploadDialog: () => void) => (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                gap: "8px",
                padding: "12px 16px",
            }}
        >
            <UploadZone.Input multiple />
            <div style={{ display: "flex", gap: "4px" }}>
                <Text size={ETextSize.B3}>Файлы для импорта</Text>
                <HelpBox tooltipSize={ETooltipSize.SM}>Поддерживаются файлы PDF и XLSX до 10 МБ.</HelpBox>
            </div>
            <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.SM} onClick={openUploadDialog}>
                Загрузить
            </Button>
        </div>
    );

    return (
        <div ref={setDropZoneContainer} style={{ position: "relative", display: "flow-root" }}>
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
            <TableBasic columns={COLUMNS} data={buildRows()} renderNoData={() => <div />} headless />
        </div>
    );
};
