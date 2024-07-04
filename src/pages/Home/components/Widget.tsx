import { FC, ReactNode, useState } from 'react'
import { ICoords } from '../types/ICoords'
import styles from '../../../assets/styles/Home.module.css'
import Draggable from 'react-draggable'
import { useNavigate } from 'react-router-dom'

interface IWidget{
    position: ICoords,
    setPosition: (newPosition: ICoords) => void,
    clickRoute: string,
    title: string,
    children: ReactNode
}

const Widget: FC<IWidget> = ({position, setPosition, clickRoute, title, children}) => {
    const [isDragging, setIsDragging] = useState<boolean>(false);

    const handleDrag = (_e: any, data: any) => {
        setIsDragging(true);
        setPosition({ x: data.x, y: data.y });
    }
    const handleStop = () => {
        setTimeout(() => setIsDragging(false), 0);
    }
    const handleClick = () => {
        if(!isDragging){
            navigate(clickRoute)
        }
    }

    const navigate = useNavigate();
    

    return (
        <Draggable
            position={position}
            onDrag={handleDrag}
            onStop={handleStop}
            bounds='parent'
            >
            <div className={styles['widget']} onClick={handleClick}>
                <h3>{title}</h3>
                {children}
            </div>
        </Draggable>
    )
}

export default Widget