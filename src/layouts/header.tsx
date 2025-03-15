import '../styles/header.css'
import Logo from '../components/logo'

export default function Header(){
    return <div className='header'>

        <div className='logo-container'>
            <Logo/>
            <a className='logo-font dark-cream'>Ragposium</a>
        </div>
    </div>
}