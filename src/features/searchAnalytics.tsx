
import { SearchAnalyticsResult } from "../types/analytics"
import "../styles/searchAnalytics.css"

interface Props {
    analytics: SearchAnalyticsResult;
    show: boolean;
}


export const SearchAnalytics: React.FC<Props> = ({ analytics, show }) => {
    return <div id="search-analytics" style={{display: show?'inline':'none'}}>
        <div>

        { analytics.pairs.map((alignment, index) => (
        <div key={index} className="word-alignment-item">
            <a>{alignment.word}</a>
            <div className="word-alignment-bar-container">
                <div key={index} className="word-alignment-bar" style={{width: `${100* alignment.alignment/analytics.maxAlignment}%`}}>
                    {`${alignment.alignment}%`}
                </div>
            </div>
        </div>
        ))
            }
        </div>
        <div id="bottom-axis">
            % Match
        </div>
    </div>


}