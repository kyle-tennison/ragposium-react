import '../styles/query.css'
import Header from '../layouts/header'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { SearchAnalytics } from '../features/searchAnalytics';
import { PaperMetadata } from '../types/analytics';
import { useState } from 'react';
import { baseUrl, ragposiumClient } from '../services/ragposium-core';

import type { components } from "../types/ragposiumSchema"

type DictionaryQueryResponse = components["schemas"]["DictionaryQueryResponse"];


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

    const [textareaContent, setTextareaContent] = useState<string>("");

    const [searchAnalytics, setSearchAnalytics] = useState<DictionaryQueryResponse|null>(null);


    const sendQuery = async () => {
        setSearchAnalytics(null); // reset from last request

        console.debug("Sending textarea content:", textareaContent);
        console.debug("Using base url:", baseUrl)

        const dict_query_future = ragposiumClient.POST("/query-dict", {
            body: {
                query: textareaContent,
                n_results: 4,
            }
        })


        // const paper_query_future = ragposiumClient.POST("/query-papers", {
        //     body:{
        //         query: textareaContent,
        //         n_results: 5
        //     }
        // })

        // const dict_query = await dict_query_future
        // const paper_query = await paper_query_future
        
        dict_query_future.then((value) => {

            console.log("Dictionary query responded with:", value)

            if (value.error) {
                throw new Error(`Failed to query dictionary: ${value.error.detail?.toString()}`)
            }

            setSearchAnalytics(value.data)
        })
        
        

    }

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
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setTextareaContent(e.target.value)
              }}
            >
            </textarea>
            <button onClick={sendQuery}>
                <i className="bi bi-arrow-up-circle-fill dark-cream"></i>
            </button>
        </div>

        <SearchAnalytics analytics={searchAnalytics} show={searchAnalytics !== null}/>

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