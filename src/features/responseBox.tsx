import { useEffect, useRef } from "react";
import { components } from "../types/ragposiumSchema";
import "../styles/responseBox.css"

type PaperQueryResponse = components["schemas"]["PaperQueryResponse"];


interface Props {
    papers: PaperQueryResponse|null;
}


export const ResponseBox: React.FC<Props> = ({papers}) => {

    const werePapers = useRef<boolean>(false);

    const paperContainer = useRef<HTMLDivElement|null>(null);
    const paperResults = useRef<(HTMLDivElement|null)[]>([]);

    const animatePapers = () => {
        paperContainer.current?.classList.add("fade-in")
    }

    useEffect(() => {

        if (paperContainer.current == null){
            return
        }
        
        if (papers && !werePapers.current){
            werePapers.current = true;
            animatePapers()
        }
        
        if (!papers) {
            werePapers.current = false
            paperContainer.current.style.opacity = "0";
            try {
                paperContainer.current.classList.remove("fade-in");
            } catch (error) {
                console.error("Failed to remove class:", error);
            }
        }


    })


    return <div id='response-box' ref={(el) => {paperContainer.current = el}}>
            <h1>Here's what we found</h1>

            {papers?.papers.map((paper, idx) => {

                // const distance = availablePapers.distances[idx]
                
                return <div key={idx} className='response-container' ref={(el) => {paperResults.current[idx] = el}}>
                    <a className='authors'>{paper.authors}</a>
                    <a className='title' href={paper.url} target="_blank">{paper.title}</a>
                    <div className='abstract'>{paper.abstract}</div>
                    <button className='cite'>
                        <i className="bi bi-quote"></i>
                    </button>
                </div>
                })}

        </div>
}