import { AiOutlineInstagram, AiFillYoutube } from 'react-icons/ai';
import { BsFacebook } from 'react-icons/bs';

export default function SocialMedia() {
  return (
    <>
      <h2 className='flex items-center justify-center text-center'>Follow Us</h2>
      <div className='flex items-center justify-center'>
        <a
          target='_blank'
          href='https://www.facebook.com/viamusicstudio/'
          className='m-2'
          rel='noreferrer'
          aria-label='facebook'>
          <BsFacebook />
        </a>
        <a
          target='_blank'
          href='https://www.instagram.com/mirock.nyc/'
          className='m-2'
          rel='noreferrer'
          aria-label='instagram'>
          <AiOutlineInstagram />
        </a>
        <a
          target='_blank'
          href='https://www.youtube.com/channel/UCw1mhfFiSJEMysE2BROjD-g'
          className='m-2'
          rel='noreferrer'
          aria-label='youtube'>
          <AiFillYoutube />
        </a>
      </div>
    </>
  );
}
