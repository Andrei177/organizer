import React, { useState } from 'react'

const CalendarWidget = () => {
    const [x, setX] = useState(480);
    const [y, setY] = useState(60);
  
    let offsetX = 0;
    let offsetY = 0;
  
    const dragStartHandler = (event: React.DragEvent<HTMLDivElement>) => {
      const rect = (event.target as HTMLDivElement).getBoundingClientRect();
      offsetX = event.clientX - rect.left;
      offsetY = event.clientY - rect.top;
    };
  
    const dragEndHandler = (event: React.DragEvent<HTMLDivElement>) => {
      if(event.clientX !== 0 && event.clientY !== 0){
        setX(event.clientX - offsetX);
        setY(event.clientY - offsetY);
      }
    }
    return (
      <div
          draggable
          style={{position: "absolute", top: y, left: x}}
          className="test"
          onDragEnd={dragEndHandler}
          onDragStart={dragStartHandler}>
        Мини календарь
      </div>
    )
}

export default CalendarWidget
