// import { SearchAnalyticsResult } from "../types/analytics"
import "../styles/searchAnalytics.css";
import { useEffect, useRef } from "react";
import type { components } from "../types/ragposiumSchema";

type DictionaryQueryResponse = components["schemas"]["DictionaryQueryResponse"];

interface Props {
  analytics: DictionaryQueryResponse | null;
  show: boolean;
}

const ANIMATE_DELAY = 200; // ms
const BENCHMARK_DISTANCE = 1.5;

export const SearchAnalytics: React.FC<Props> = ({ analytics, show }) => {
  const wordAlignmentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const wordAlignmentWords = useRef<(HTMLElement | null)[]>([]);
  const wordAlignmentBars = useRef<(HTMLDivElement | null)[]>([]);
  const bottomBar = useRef<HTMLDivElement | null>(null);

  const animateShow = () => {
    // Fade in words
    wordAlignmentWords.current.forEach((item, idx) => {
      if (item == null) {
        return;
      }
      item.style.opacity = "0";

      setTimeout(
        () => {
          item.classList.add("fade-in");
        },
        ANIMATE_DELAY * (idx + 1),
      );
    });

    // Stretch word bars
    wordAlignmentBars.current.forEach((item, idx) => {
      if (item == null) {
        return;
      }

      item.style.opacity = "0";

      setTimeout(
        () => {
          item.classList.add("expand-horiz");
        },
        ANIMATE_DELAY * (idx + 1),
      );
    });

    // Fade in bottom bar axis
    if (bottomBar.current) {
      bottomBar.current.style.opacity = "0";
    }

    setTimeout(() => {
      bottomBar.current?.classList.add("fade-in");
    }, ANIMATE_DELAY);
  };

  useEffect(() => {
    if (show) {
      animateShow();
    }
  }, [show]);

  return (
    <div id="search-analytics" style={{ display: show ? "inline" : "none" }}>
      <div>
        {analytics?.words.map((_, index) => {
          const minDistance = Math.min(...analytics.distances);
          const word = analytics.words[index];
          const distance = analytics.distances[index];

          const relativeAlignment =
            (BENCHMARK_DISTANCE - distance) / BENCHMARK_DISTANCE;
          const maxAlignment =
            (BENCHMARK_DISTANCE - minDistance) / BENCHMARK_DISTANCE;

          return (
            <div
              key={index}
              className="word-alignment-item"
              ref={(el) => {
                wordAlignmentRefs.current[index] = el;
              }}
            >
              <a
                ref={(el) => {
                  wordAlignmentWords.current[index] = el;
                }}
              >
                {word}
              </a>
              <div className="word-alignment-bar-container">
                <div
                  key={index}
                  className="word-alignment-bar"
                  style={{
                    width: `${(100 * relativeAlignment) / maxAlignment}%`,
                  }}
                  ref={(el) => {
                    wordAlignmentBars.current[index] = el;
                  }}
                >
                  {`${(100 * relativeAlignment).toFixed(0)}%`}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div
        id="bottom-axis"
        ref={(el) => {
          bottomBar.current = el;
        }}
      >
        % Match
      </div>
    </div>
  );
};
