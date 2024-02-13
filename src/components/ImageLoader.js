import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Logo from '../assets/images/logo.png';
import SocialMedia from './SocialMedia';

function ImageLoader() {
  const { imageId } = useParams();

  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showTip, setShowTip] = useState(false); // 新增状态控制提示框显示

  useEffect(() => {
    const imageUrl = `https://pics.easy4music.com/mirock/${imageId}.jpg`;
    setImageUrl(imageUrl);

    const image = new Image();
    image.onload = () => {
      setLoading(false);
      setError(false);
    };
    image.onerror = () => {
      setLoading(false);
      setError(true);
    };
    image.src = imageUrl;
  }, [imageId]);

  // 显示保存图片的提示
  const showSaveImageTip = () => {
    setShowTip(true); // 显示提示框
  };

  // 关闭提示框
  const closeTip = () => {
    setShowTip(false); // 隐藏提示框
  };

  return (
    <div className={`flex flex-col items-center lg:justify-center h-screen bg-black`}>
      {loading && (
        <div
          id='loadingMessage'
          className='text-lg text-white m-auto'>
          圖片讀取中，請稍後...
        </div>
      )}
      {!loading && !error && (
        <>
          <img
            src={imageUrl}
            alt='Images'
            className='object-contain w-full h-1/2 pt-8'
            style={{ display: error ? 'none' : 'block' }}
          />

          <div
            id='downloadButton'
            className='mt-4 relative'>
            <button
              onClick={showSaveImageTip}
              style={{
                background: 'linear-gradient(45deg, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c)',
              }}
              className='px-4 py-2 bg-blue-500 text-black rounded hover:bg-blue-700 transition duration-300 flex items-center justify-center m-auto'>
              怎麼保存圖片？
            </button>

            <div className='text-3xl text-highlight-light z-10 mt-8 text-white flex flex-col items-center justify-center m-auto'>
              <img
                src={Logo}
                alt='logo'
                className='w-40 h-40 lg:w-48 lg:h-48 overflow-hidden cursor-pointer'
                onClick={() => (window.location.href = 'https://www.easy4music.com/mirock')}
              />
              <SocialMedia />
            </div>
          </div>
        </>
      )}
      {!loading && error && (
        <div className='text-lg text-white flex flex-col items-center justify-center m-auto'>
          圖片讀取失敗，請稍後再試。
          <button
            style={{
              background: 'linear-gradient(45deg, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c)',
            }}
            onClick={() => window.location.reload()}
            className='px-4 py-2 mt-4 bg-blue-500 text-black rounded hover:bg-blue-700 transition duration-300'>
            重新整理
          </button>
        </div>
      )}
      {showTip && (
        <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-10'>
          <div className='bg-white p-4 rounded-lg shadow-lg text-center'>
            <p>長按圖片，然後選擇“儲存到照片”，就會存到手機相簿囉！</p>
            <button
              style={{
                background: 'linear-gradient(45deg, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c)',
              }}
              className='mt-4 px-4 py-2 bg-blue-500 text-black rounded hover:bg-blue-700 transition duration-300'
              onClick={closeTip}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageLoader;
