import '../styles/query.css'
import Header from '../layouts/header'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { SearchAnalytics } from '../features/searchAnalytics';
import { SearchAnalyticsResult } from '../types/analytics';



const SAMPLE_ANALYTICS: SearchAnalyticsResult = {
    nResults: 3,
    pairs: [
        {
            word: "Psycology",
            alignment: 65,
        },
        {
            word: "Violence",
            alignment: 54,
        },
        {
            word: "Adolescence",
            alignment: 30,
        },
        {
            word: "Funny",
            alignment: 19,
        }
    ],
    maxAlignment: 65,
}

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

        <SearchAnalytics analytics={SAMPLE_ANALYTICS}  />

    </div>
}