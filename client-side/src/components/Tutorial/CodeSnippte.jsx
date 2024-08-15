import React, { useEffect, useState, useRef } from "react";
import hljs from "highlight.js/lib/core";
import python from "highlight.js/lib/languages/python";
import "highlight.js/styles/atom-one-dark.css"; // Dark theme for the code block
hljs.registerLanguage("python", python);

const CodeSnippte = (props) => {
  const { NameOfClass, CodeContent } = props;
  const [copySuccess, setCopySuccess] = useState("Copy");
  const codeRef = useRef(null); // Ref to access the code block

  useEffect(() => {
    hljs.highlightAll(); // Apply syntax highlighting to all code blocks
  }, []);

  const copyToClipboard = () => {
    if (codeRef.current) {
      navigator.clipboard.writeText(codeRef.current.innerText).then(() => {
        setCopySuccess("Copied!");
        setTimeout(() => setCopySuccess("Copy"), 2000); // Reset the message after 2 seconds
      });
    }
  };

  return (
    <div className="code-container">
      <button onClick={copyToClipboard} style={{cursor:'pointer'}}>
        <span className="copy-success">{copySuccess}</span>
      </button>
      <pre>
        <code ref={codeRef} className={NameOfClass}>
          {CodeContent}
        </code>
      </pre>
    </div>
  );
};

export default CodeSnippte;
