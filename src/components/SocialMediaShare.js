import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  PinterestShareButton,
  FacebookIcon,
  TwitterIcon,
  PinterestIcon,
} from 'react-share';

const SocialMediaShare = ({ imageUrl }) => {
  return (
    <div>
      <FacebookShareButton url={imageUrl}>
        <FacebookIcon
          size={32}
          round={true}
        />
      </FacebookShareButton>
      <TwitterShareButton url={imageUrl}>
        <TwitterIcon
          size={32}
          round={true}
        />
      </TwitterShareButton>
      <PinterestShareButton
        url={window.location.href}
        media={imageUrl}>
        <PinterestIcon
          size={32}
          round={true}
        />
      </PinterestShareButton>
    </div>
  );
};

export default SocialMediaShare;
