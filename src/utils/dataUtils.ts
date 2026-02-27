import { Emoji, ListItem, CategoryPage } from '../types';
import defaultEmojis from '../data/emoji.json';

export const HEADER_HEIGHT = 40;

export const processEmojiData = (
    width: number,
    columns: number,
    customEmojis?: Emoji[],
    additionalEmojis?: Emoji[],
    hideListHeaders?: boolean
) => {
    // Pre-calculate exact row heights
    const itemSize = Math.floor(width / columns);
    const sidePadding = width - itemSize * columns;

    const source = customEmojis || (defaultEmojis as Emoji[]);
    const fullList = additionalEmojis ? [...source, ...additionalEmojis] : source;

    // Group by category
    const grouped = fullList.reduce((acc, emoji) => {
        if (!acc[emoji.category]) acc[emoji.category] = [];
        acc[emoji.category].push(emoji);
        return acc;
    }, {} as Record<string, Emoji[]>);

    const categories = Object.keys(grouped);

    const verticalData: ListItem[] = [];
    const horizontalPages: CategoryPage[] = [];
    const categoryIndices: Record<string, number> = {};

    let currentVerticalOffset = 0;

    categories.forEach((cat) => {
        categoryIndices[cat] = verticalData.length;

        // Inject header if not hidden
        if (!hideListHeaders) {
            verticalData.push({
                type: 'header', id: `h-${cat}`, title: cat,
                length: HEADER_HEIGHT, offset: currentVerticalOffset
            });
            currentVerticalOffset += HEADER_HEIGHT;
        }

        const items = grouped[cat];
        const catRows: ListItem[] = [];
        let currentHorizontalOffset = 0;

        // Chunk items into rows
        for (let i = 0; i < items.length; i += columns) {
            const rowEmojis = items.slice(i, i + columns);

            verticalData.push({
                type: 'row', id: `vr-${cat}-${i}`, data: rowEmojis,
                length: itemSize, offset: currentVerticalOffset
            });
            currentVerticalOffset += itemSize;

            catRows.push({
                type: 'row', id: `hr-${cat}-${i}`, data: rowEmojis,
                length: itemSize, offset: currentHorizontalOffset
            });
            currentHorizontalOffset += itemSize;
        }

        horizontalPages.push({ category: cat, rows: catRows });
    });

    return { verticalData, horizontalPages, categories, categoryIndices, fullList, itemSize, sidePadding };
};