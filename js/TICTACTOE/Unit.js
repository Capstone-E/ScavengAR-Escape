import React from 'react';

const Unit = ({ value, onClick }) => {
  const style = value ? `unit ${value}` : `unit`;
  return (
    <button className={style} onClick={onClick}>
      {value}
    </button>
  );
};

export default Unit;
