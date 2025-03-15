import logo from '../assets/logo.svg' 
import '../styles/header.css'

export default function Header(){
    return <div className='header'>

        <div className='logo-container'>
            <img src={logo} className='logo' alt='Ragposium Logo'></img>
            <a className='logo-font dark-cream'>Ragposium</a>
        </div>
    </div>
}