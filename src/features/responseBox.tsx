import { useEffect, useRef } from "react";
import { components } from "../types/ragposiumSchema";
import "../styles/responseBox.css";
import { ragposiumClient } from "../services/ragposium-core";

type PaperQueryResponse = components["schemas"]["PaperQueryResponse"];

interface Props {
  papers: PaperQueryResponse | null;
  onCopy: () => void;
}

export const ResponseBox: React.FC<Props> = ({ papers, onCopy }) => {
  const werePapers = useRef<boolean>(false);

  const paperContainer = useRef<HTMLDivElement | null>(null);
  const paperResults = useRef<(HTMLDivElement | null)[]>([]);

  const animatePapers = () => {
    paperContainer.current?.classList.add("fade-in");
  };

  useEffect(() => {
    if (paperContainer.current == null) {
      return;
    }

    if (papers && !werePapers.current) {
      werePapers.current = true;
      animatePapers();
    }

    if (!papers) {
      werePapers.current = false;
      paperContainer.current.style.opacity = "0";
      try {
        paperContainer.current.classList.remove("fade-in");
      } catch (error) {
        console.error("Failed to remove class:", error);
      }
    }
  });

  return (
    <div
      id="response-box"
      ref={(el) => {
        paperContainer.current = el;
      }}
    >
      <h1>Here's what we found</h1>

      {papers?.papers.map((paper, idx) => {
        // const distance = availablePapers.distances[idx]

        return (
          <div
            key={idx}
            className="response-container"
            ref={(el) => {
              paperResults.current[idx] = el;
            }}
          >
            <a className="authors">{paper.authors}</a>
            <a
              className="title"
              href={paper.url.replace("abs", "pdf")}
              target="_blank"
            >
              {paper.title}
            </a>
            <div className="abstract">{paper.abstract}</div>
            <button
              className="cite"
              onClick={async () => {
                const response = await ragposiumClient.POST(
                  "/generate-citation",
                  {
                    params: {
                      query: {
                        arxiv_id: paper.arxiv_id || "",
                      },
                    },
                  },
                );

                if (response.error) {
                  throw new Error(
                    `Failed to generate citation: ${response.error.detail?.toString()}`,
                  );
                }

                await navigator.clipboard.writeText(response.data);
                console.log("Copied bibtex to clipboard:", response.data);
                onCopy();
              }}
            >
              <i className="bi bi-quote"></i>
            </button>
            <a className="arxiv-link" href={paper.url} target="_blank">
              <i className="bi bi-box-arrow-in-right"></i>
            </a>
          </div>
        );
      })}
    </div>
  );
};
