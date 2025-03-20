/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Index
     * @description Root of the API
     */
    get: operations["index__get"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/health": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Health
     * @description Endpoint to check health.
     */
    get: operations["health_health_get"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/query-papers": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * Query Papers
     * @description Query the database for matching papers.
     */
    post: operations["query_papers_query_papers_post"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/query-dict": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * Query Dict
     * @description Query the dictionary database for similar words.
     */
    post: operations["query_dict_query_dict_post"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
}
export type webhooks = Record<string, never>;
export interface components {
  schemas: {
    /**
     * DictionaryQueryResponse
     * @description Response to dictionary query.
     */
    DictionaryQueryResponse: {
      /** Words */
      words: string[];
      /** Distances */
      distances: number[];
    };
    /** HTTPValidationError */
    HTTPValidationError: {
      /** Detail */
      detail?: components["schemas"]["ValidationError"][];
    };
    /**
     * MessageResponse
     * @description Generic request for messages.
     */
    MessageResponse: {
      /** Message */
      message: string;
    };
    /**
     * PaperMetadata
     * @description Metadata representation of an arXiv paper.
     *
     *     Attributes
     *     ----------
     *     url : str
     *         The URL of the paper.
     *     title : str
     *         The title of the paper.
     *     authors : str
     *         The authors of the paper.
     *     abstract : str
     *         The abstract of the paper.
     */
    PaperMetadata: {
      /** Url */
      url: string;
      /** Title */
      title: string;
      /** Authors */
      authors: string;
      /** Abstract */
      abstract: string;
    };
    /**
     * PaperQueryResponse
     * @description Response to paper query.
     */
    PaperQueryResponse: {
      /** Papers */
      papers: components["schemas"]["PaperMetadata"][];
      /** Distances */
      distances: number[];
    };
    /**
     * QueryRequest
     * @description Requests papers corresponding to a query.
     */
    QueryRequest: {
      /** Query */
      query: string;
      /** N Results */
      n_results: number;
    };
    /** ValidationError */
    ValidationError: {
      /** Location */
      loc: (string | number)[];
      /** Message */
      msg: string;
      /** Error Type */
      type: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
  index__get: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["MessageResponse"];
        };
      };
    };
  };
  health_health_get: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["MessageResponse"];
        };
      };
    };
  };
  query_papers_query_papers_post: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["QueryRequest"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["PaperQueryResponse"];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  query_dict_query_dict_post: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["QueryRequest"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["DictionaryQueryResponse"];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
}
