import "../styles/query.css";
import Header from "../layouts/header";
import "bootstrap-icons/font/bootstrap-icons.css";
import { SearchAnalytics } from "../features/searchAnalytics";
import { useState } from "react";
import { baseUrl, ragposiumClient } from "../services/ragposium-core";

import type { components } from "../types/ragposiumSchema";
import { ResponseBox } from "../features/responseBox";

type DictionaryQueryResponse = components["schemas"]["DictionaryQueryResponse"];
type PaperQueryResponse = components["schemas"]["PaperQueryResponse"];

export default function Query() {
  const [textareaContent, setTextareaContent] = useState<string>("");

  const [searchAnalytics, setSearchAnalytics] =
    useState<DictionaryQueryResponse | null>(null);
  const [availablePapers, setAvailablePapers] =
    useState<PaperQueryResponse | null>(null);

  const sendQuery = async () => {
    // reset from last request
    setSearchAnalytics(null);
    setAvailablePapers(null);

    console.debug("Sending textarea content:", textareaContent);
    console.debug("Using base url:", baseUrl);

    const dict_query_future = ragposiumClient.POST("/query-dict", {
      body: {
        query: textareaContent,
        n_results: 4,
      },
    });

    const paper_query_future = ragposiumClient.POST("/query-papers", {
      body: {
        query: textareaContent,
        n_results: 5,
      },
    });

    dict_query_future.then((value) => {
      console.log("Dictionary query responded with:", value);

      if (value.error) {
        throw new Error(
          `Failed to query dictionary: ${value.error.detail?.toString()}`,
        );
      }

      setSearchAnalytics(value.data);
    });

    paper_query_future.then((value) => {
      console.log("Paper query responded with:", value);

      if (value.error) {
        throw new Error(
          `Failed to query papers: ${value.error.detail?.toString()}`,
        );
      }

      setAvailablePapers(value.data);
    });
  };

  return (
    <div id="query-page">
      <Header />

      <div id="query-box">
        <h1 className="dark-cream">How can we help you today?</h1>
        <textarea
          className="input-box"
          placeholder="Enter a phrase here"
          onInput={(e: React.FormEvent<HTMLTextAreaElement>) => {
            const textarea = e.target as HTMLTextAreaElement;
            textarea.style.height = `auto`; // Adjust height to content
            textarea.style.height = `${textarea.scrollHeight}px`; // Adjust height to content
          }}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setTextareaContent(e.target.value);
          }}
          onKeyDown={(ev) => {
            if (ev.key == "Enter" && !ev.shiftKey) {
              ev.preventDefault();
              sendQuery();
            }
          }}
        ></textarea>
        <button onClick={sendQuery}>
          <i className="bi bi-arrow-up-circle-fill dark-cream"></i>
        </button>
      </div>

      <SearchAnalytics
        analytics={searchAnalytics}
        show={searchAnalytics !== null}
      />

      <ResponseBox papers={availablePapers} />
    </div>
  );
}
