import { ICoords } from "../types/ICoords";

export const onMouseDown = (
  e: React.MouseEvent<HTMLElement>,
  widgetRef: React.RefObject<HTMLDivElement>,
  setDragging: (bool: boolean) => void,
  setRel: (coords: ICoords) => void
) => {
  const rect = widgetRef.current?.getBoundingClientRect();
  if (rect) {
    setDragging(true);
    setRel({
      x: e.pageX - rect.left,
      y: e.pageY - rect.top,
    });
    e.stopPropagation();
    e.preventDefault();
  }
};

export const onMouseMove = (
  e: React.MouseEvent<HTMLElement>,
  dragging: boolean,
  containerRef: React.RefObject<HTMLDivElement>,
  widgetRef: React.RefObject<HTMLDivElement>,
  rel: ICoords,
  setPosition: (coords: ICoords) => void
) => {
  if (!dragging) return;
  const containerRect = containerRef.current?.getBoundingClientRect();
  const widgetRect = widgetRef.current?.getBoundingClientRect();

  if (containerRect && widgetRect) {
    let newX = e.pageX - containerRect.left - rel.x;
    let newY = e.pageY - containerRect.top - rel.y;

    newX = Math.max(0, Math.min(newX, containerRect.width - widgetRect.width));
    newY = Math.max(
      0,
      Math.min(newY, containerRect.height - widgetRect.height)
    );

    setPosition({ x: newX, y: newY });
    e.stopPropagation();
    e.preventDefault();
  }
};

export const onMouseUp = (setDragging: (bool: boolean) => void) => {
  setDragging(false);
};