import React from "react";
import { IImageGalleryItemProps } from "../types";

/**
 * Маркер-элемент галереи. Не рендерит ничего сам — `ImageGalleryExtended`
 * извлекает props через `React.Children` и кладёт список в контекст.
 */
export const ImageGalleryExtendedItem: React.FC<IImageGalleryItemProps> = () => null;

ImageGalleryExtendedItem.displayName = "ImageGalleryExtended.Item";
