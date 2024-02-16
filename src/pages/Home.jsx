import { Link } from 'react-router-dom';
import bird_banner from '../img/bird-banner.png';
import '../css/Home.css';

export default function Home() {
  return (
    <div className='home__container'>
      <img className='home__banner' src={bird_banner} alt="Snake" />
      <Link to='/game' className='link'>Play</Link>
    </div>
  )
}
