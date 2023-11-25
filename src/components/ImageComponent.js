import React from 'react';

const ImageComponent = ({ base64URL }) => {
  return (
    <div>
      <img src={base64URL} alt="Your Image Alt Text" />
    </div>
  );
};

export default ImageComponent;
    