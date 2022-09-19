import React, { useEffect, useState } from "react";
import { Title, TitleSizes } from "@patternfly/react-core";
import { Input, LinkDisplay } from "./components";
import { createLinks } from './utilities/getLinks'

function App() {
  const [inputValue, setInputValue] = useState("");
  const [links, setLinks] = useState<string[]>();
  const [valueSubmitted, setValueSubmitted] = useState(false);

  useEffect(() => {
    if (valueSubmitted && !inputValue) {
      setValueSubmitted(false);
    }
  }, [valueSubmitted, inputValue]);

  async function handleSubmit() {
    const imageLinks = await createLinks(inputValue)
    setLinks(imageLinks)
    setValueSubmitted(true);
  }

  return (
    <div className="App center">
      <div className="limit-width">
        <Title headingLevel="h1" size={TitleSizes["4xl"]}>
          Merge Commit Link:
        </Title>
        <Input
          value={inputValue}
          onChange={(value) => setInputValue(value)}
          onSubmit={handleSubmit}
        />
        {valueSubmitted && <LinkDisplay links={links} />}
      </div>
    </div>
  );
}

export default App;
