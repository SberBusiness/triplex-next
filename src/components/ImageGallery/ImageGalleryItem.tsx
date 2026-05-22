import React from "react";
import { IImageGalleryItemProps } from "./types";

/**
 * Маркер-элемент галереи. Не рендерит ничего сам — родительский `ImageGallery`
 * извлекает props через `React.Children` и выполняет фактический рендер.
 */
export const ImageGalleryItem: React.FC<IImageGalleryItemProps> = () => null;

ImageGalleryItem.displayName = "ImageGallery.Item";
