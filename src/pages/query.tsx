import '../styles/query.css'
import Header from '../layouts/header'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { SearchAnalytics } from '../features/searchAnalytics';
import { PaperMetadata, SearchAnalyticsResult } from '../types/analytics';



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


const SAMPLE_PAPERS: PaperMetadata[] = [
    {
        url: "example.com",
        title: "A psychoanalysis of war paraphernalia bedroom decorations",
        authors: "M. Heisenberg, K. Michael, A. Jones",
        abstract: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur interdum, nisl nisi consequat nunc, vitae scelerisque eros eros in nisl. Fusce vel orci sit amet massa luctus sagittis. Proin id eros ut velit tempor bibendum. Duis euismod, nulla eu tempor cursus, erat nunc consectetur dui, vel euismod..."
    },
    {
        url: "example.com",
        title: "A psychoanalysis of war paraphernalia bedroom decorations",
        authors: "M. Heisenberg, K. Michael, A. Jones",
        abstract: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur interdum, nisl nisi consequat nunc, vitae scelerisque eros eros in nisl. Fusce vel orci sit amet massa luctus sagittis. Proin id eros ut velit tempor bibendum. Duis euismod, nulla eu tempor cursus, erat nunc consectetur dui, vel euismod..."
    },
]


export default function Query(){

    // const revealAnalytics = () => {}

    return <div id='query-page'>
        <Header />

        <div id='query-box'>
            <h1 className='dark-cream'>How can we help you today?</h1>
            <textarea className='input-box' placeholder='Enter a phrase here'
              onInput={(e: React.FormEvent<HTMLTextAreaElement>) => {
                const textarea = e.target as HTMLTextAreaElement;
                textarea.style.height = `auto`; // Adjust height to content
                textarea.style.height = `${textarea.scrollHeight}px`; // Adjust height to content
              }}
            >
            </textarea>
            <button>
                <i className="bi bi-arrow-up-circle-fill dark-cream"></i>
            </button>
        </div>

        <SearchAnalytics analytics={SAMPLE_ANALYTICS} show={false}/>

        <div id='response-box' style={{display: 'none'}}>
            <h1>Here's what we found</h1>

            {SAMPLE_PAPERS.map((paper, index) => (
                <div key={index} className='response-container'>
                    <a className='authors'>{paper.authors}</a>
                    <h2>{paper.title}</h2>
                    <p className='abstract'>{paper.abstract}</p>
                    <button className='cite'>
                        <i className="bi bi-quote"></i>
                    </button>
                </div>
                ))}

        </div>


    </div>
}