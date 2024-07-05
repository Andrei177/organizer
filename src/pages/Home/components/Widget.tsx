import React, { FC, ReactNode, RefObject, useRef, useState } from 'react';
import { ICoords } from '../types/ICoords';
import { useNavigate } from 'react-router-dom';

interface IWidget {
    position: ICoords,
    setPosition: (newPosition: ICoords) => void,
    clickRoute: string,
    title: string,
    children: ReactNode,
    containerRef: RefObject<HTMLDivElement>
}

const Widget: FC<IWidget> = ({ position, setPosition, clickRoute, title, children, containerRef }) => {
    const widgetRef = useRef<HTMLDivElement>(null);
    const [dragging, setDragging] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [rel, setRel] = useState({ x: 0, y: 0 });
    const navigate = useNavigate();

    const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (widgetRef.current) {
            const rect = widgetRef.current.getBoundingClientRect();
            setDragging(true);
            setRel({
                x: e.pageX - rect.left,
                y: e.pageY - rect.top,
            });
            setIsDragging(false);
            e.stopPropagation();
            e.preventDefault();
        }
    };

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!dragging) return;
        if (containerRef.current && widgetRef.current) {
            const containerRect = containerRef.current.getBoundingClientRect();
            const widgetRect = widgetRef.current.getBoundingClientRect();

            let newX = e.pageX - containerRect.left - rel.x;
            let newY = e.pageY - containerRect.top - rel.y;

            newX = Math.max(0, Math.min(newX, containerRect.width - widgetRect.width));
            newY = Math.max(0, Math.min(newY, containerRect.height - widgetRect.height));

            setPosition({ x: newX, y: newY });
        }
        setIsDragging(true);
        e.stopPropagation();
        e.preventDefault();
    };

    const onMouseUp = () => {
        setDragging(false);
    };

    return (
        <div
            ref={widgetRef}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            style={{
                position: 'absolute',
                cursor: 'grab',
                left: position.x,
                top: position.y,
            }}
            onClick={() => { if (!isDragging) navigate(clickRoute) }}
        >
            <h3>{title}</h3>
            {children}
        </div>
    );
};

export default Widget;