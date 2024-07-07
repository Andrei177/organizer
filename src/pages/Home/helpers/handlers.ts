import { ICoords } from "../types/ICoords";

export const onMouseDown = (e: React.MouseEvent<HTMLElement>, widgetRef: any, setDragging: (bool: boolean) => void, setRel: (coords: ICoords) => void) => {
    const rect = widgetRef.current.getBoundingClientRect();
    setDragging(true);
    setRel({
        x: e.pageX - rect.left,
        y: e.pageY - rect.top,
    });
    e.stopPropagation();
    e.preventDefault();
};

export const onMouseMove = (e: React.MouseEvent<HTMLElement>, dragging: boolean, containerRef: any, widgetRef: any, rel: ICoords, setPosition: (coords: ICoords) => void) => {
    if (!dragging) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const widgetRect = widgetRef.current.getBoundingClientRect();

    let newX = e.pageX - containerRect.left - rel.x;
    let newY = e.pageY - containerRect.top - rel.y;

    newX = Math.max(0, Math.min(newX, containerRect.width - widgetRect.width));
    newY = Math.max(0, Math.min(newY, containerRect.height - widgetRect.height));

    setPosition({ x: newX, y: newY });
    e.stopPropagation();
    e.preventDefault();
};

export const onMouseUp = (setDragging: (bool: boolean) => void) => {
    setDragging(false);
};