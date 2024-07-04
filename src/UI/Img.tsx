import React from 'react'

interface IPropsImg{
    img: string
}

const Img: React.FC<IPropsImg> = ({img}) => {
  return (
    <img style={{height: 30, width: 30}} src={img}/>
  )
}

export default Img
