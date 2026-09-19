import React, { useState } from "react";
import {
    UploadZone,
    MobileView,
    Gap,
    Text,
    Link,
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
    ClouddraguploadStrokeSrvIcon32,
    DeleteStrokeSrvIcon20,
    DocumentStrokeSrvIcon32,
    DownloadStrokeSrvIcon20,
    ImageStrokeSrvIcon32,
    OtherfilesStrokeSrvIcon32,
} from "@sberbusiness/icons-next";

const HELPBOX_TEXT = "Допустимые форматы файлов: PDF, PNG, XLSX, ZIP.";

const COLUMNS: ITableBasicColumn[] = [
    { fieldKey: "number", width: 38, verticalAlign: EVerticalAlign.TOP },
    { fieldKey: "logo", width: 56, verticalAlign: EVerticalAlign.TOP },
    { fieldKey: "summary", verticalAlign: EVerticalAlign.TOP },
    { fieldKey: "status", width: 122, verticalAlign: EVerticalAlign.TOP },
    { fieldKey: "download", width: 64, cellType: ECellType.COMPONENTS, verticalAlign: EVerticalAlign.TOP },
    { fieldKey: "delete", width: 64, cellType: ECellType.COMPONENTS, verticalAlign: EVerticalAlign.TOP },
];

interface IFileRow {
    /** Иконка файла — зависит от его типа. */
    icon: React.ReactNode;
    name: string;
    size: string;
    status: EMarkerStatus;
    statusText: string;
    /** Скачивание доступно только для уже загруженных файлов. */
    downloadable: boolean;
}

const FILES: IFileRow[] = [
    {
        icon: <DocumentStrokeSrvIcon32 paletteIndex={5} />,
        name: "File_Name_Very Lon...12345678.xlsx",
        size: "Размер файла 10 Кб",
        status: EMarkerStatus.SUCCESS,
        statusText: "Загружен",
        downloadable: true,
    },
    {
        icon: <DocumentStrokeSrvIcon32 paletteIndex={5} />,
        name: "File_Name_Very Lon...12345678.pdf",
        size: "Размер файла 13 Кб",
        status: EMarkerStatus.SUCCESS,
        statusText: "Загружен",
        downloadable: true,
    },
    {
        icon: <OtherfilesStrokeSrvIcon32 paletteIndex={5} />,
        name: "File_Name_Very Lon...12345678.zip",
        size: "Размер файла 23,76 Кб",
        status: EMarkerStatus.SUCCESS,
        statusText: "Загружен",
        downloadable: true,
    },
    {
        icon: <DocumentStrokeSrvIcon32 paletteIndex={5} />,
        name: "File_Name_Very Lon...12345678.xlsx",
        size: "Размер файла 15,4 Кб",
        status: EMarkerStatus.WAITING,
        statusText: "Загружается",
        downloadable: false,
    },
    {
        icon: <ImageStrokeSrvIcon32 paletteIndex={5} />,
        name: "File_Name_Very Lon...12345678.png",
        size: "Размер файла 13 Кб",
        status: EMarkerStatus.WAITING,
        statusText: "Загружается",
        downloadable: false,
    },
];

const buildRows = (): ITableBasicRow[] =>
    FILES.map((file, index) => {
        const rowNumber = index + 1;

        return {
            rowKey: String(rowNumber),
            rowData: {
                number: `${rowNumber}.`,
                logo: file.icon,
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
                // Пустая ячейка — именно <div />, а не null: на falsy-содержимом TableBasic рисует прочерк «---».
                download: file.downloadable ? (
                    <Button
                        size={EComponentSize.MD}
                        icon={<DownloadStrokeSrvIcon20 paletteIndex={0} />}
                        theme={EButtonTheme.SECONDARY}
                        aria-label="Скачать"
                    />
                ) : (
                    <div />
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
            {/* HelpBox — сосед Text, а не его содержимое: так иконка выравнивается по центру строки. */}
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <Text type={EFontType.PRIMARY} size={ETextSize.B3} tag="div">
                    Перетащите файлы или
                    {"\u00A0"}
                    <Link onClick={openUploadDialog}>выберите на компьютере</Link>
                </Text>
                <HelpBox tooltipSize={ETooltipSize.SM}>{HELPBOX_TEXT}</HelpBox>
            </div>
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
                <HelpBox tooltipSize={ETooltipSize.SM}>{HELPBOX_TEXT}</HelpBox>
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
