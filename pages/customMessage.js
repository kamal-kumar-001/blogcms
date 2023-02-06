import React from 'react';

// const CustomMessage = () => {
const CustomMessage = ({botResponse}) => {
  return (
    <>
        {botResponse}
      <img
      src='https://i.pinimg.com/originals/cf/da/fa/cfdafa4dc6aab40eae1c5315c02b9339.jpg'
      style={{ width: '100%' }}
    />
    </>
    
  );
};

export default CustomMessage;