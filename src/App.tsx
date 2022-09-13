import React, { useState, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";

interface info {
  owner: string;
  repo: string;
  hash: string;
}

interface fileInfo extends info {
  path: string;
}

interface githubFile {
  additions: number;
  blob_url: string;
  changes: number;
  contents_url: string;
  deletions: number;
  filename: string;
  raw_url: string;
  sha: string;
  status: string;
}

function App() {
  const [inputValue, setInputValue] = useState("");
  const [links, setLinks] = useState<JSX.Element[]>();

  function parseGithubURL(commit: string) {
    const splitCommit = commit.split("/");
    const owner = splitCommit[3];
    const repo = splitCommit[4];
    const hash = splitCommit[6];
    const info = { owner, repo, hash };
    return info;
  }

  function structureRequestURL({ owner, repo, hash }: info) {
    const site = "https://api.github.com";
    return `${site}/repos/${owner}/${repo}/commits/${hash}`;
  }

  async function getCommitFiles(structuredUrl: string) {
    const response = await fetch(structuredUrl).then((response) =>
      response.json()
    );
    return response["files"];
  }

  function parseRawFiles(files: githubFile[], commitInfo: info): fileInfo[] {
    return files.map((file) => ({ ...commitInfo, path: file.filename }));
  }

  function structureStaticallyLink({ owner, repo, hash, path }: fileInfo) {
    const site = "https://cdn.statically.io";
    return `${site}/gh/${owner}/${repo}/${hash}/${path}`;
  }

  async function createLinks() {
    const info = parseGithubURL(inputValue);
    const structuredRequestURL = structureRequestURL(info);
    const rawFiles = await getCommitFiles(structuredRequestURL);
    const filesWithPaths = parseRawFiles(rawFiles, info);

    const links = filesWithPaths.map((file) => {
      const url = structureStaticallyLink(file);
      return <li key={url}>{url}</li>
    });
    setLinks(links);
  }

  

  return (
    <div className="App">
      <input
        value={inputValue}
        onChange={(ev) => {
          setInputValue(ev.target.value);
        }}
      />
      <button onClick={() => createLinks()}>Submit</button>
      <ul>{links}</ul>
    </div>
  );
}

export default App;
