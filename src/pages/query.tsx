import '../styles/query.css'
import Header from '../layouts/header'
import 'bootstrap-icons/font/bootstrap-icons.css';


export default function Query(){

    return <div id='query-page'>
        <Header />

        <div id='query-box'>
            <h1 className='dark-cream'>How can we help you today?</h1>
            <textarea className='input-box'>
            </textarea>
            <button>
                <i className="bi bi-arrow-up-circle-fill dark-cream"></i>
            </button>
        </div>
    </div>
}