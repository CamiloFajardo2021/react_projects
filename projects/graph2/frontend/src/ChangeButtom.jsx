import { useState } from 'react';
import "./ChangeButtom.css";

export function ChangeButton ({isNode,setIsNode}) {
  const [isFollowing, setIsFollowing] = useState(isNode)



  const text = isFollowing ? 'Nodos' : 'Distribuciones'
  const buttonClassName = isFollowing
    ? 'tw-followCard-button is-following'
    : 'tw-followCard-button'

  const handleClick = () => {
    setIsFollowing(!isFollowing)
    setIsNode(!isNode)
  }

  return (

        <button className={buttonClassName} onClick={handleClick}>
          <span className='tw-followCard-text'>{text}</span>
          <span className='tw-followCard-stopFollow'>Distribuciones</span>
        </button>

  );
};