import React from "react";
import {
  Button,
  TextInputGroup,
  TextInputGroupMain,
  TextInputGroupUtilities,
} from "@patternfly/react-core";
import TimesIcon from "@patternfly/react-icons/dist/esm/icons/times-icon";

export interface InputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export function Input({ value, onChange, onSubmit }: InputProps) {
  const hasValue = value !== "";
  const hintText = hasValue
    ? "https://github.com/"
    : "https://github.com/owner/repo/commit/commit_hash";

  function handleEnter() {
    if (!value) {
      return;
    }

    onSubmit();
  }

  function handleArrowKey() {}

  function clearInput() {
    onChange("");
  }

  function handleTextInputKeyDown(event: React.KeyboardEvent) {
    switch (event.key) {
      case "Enter":
        handleEnter();
        break;
      case "Escape":
        clearInput();
        break;
      case "ArrowUp":
      case "ArrowDown":
        handleArrowKey();
        break;
    }
  }

  return (
    <TextInputGroup>
      <TextInputGroupMain
        value={value}
        onChange={(value) => onChange(value)}
        onKeyDown={handleTextInputKeyDown}
        hint={hintText}
      />
      <TextInputGroupUtilities>
        {hasValue && (
          <Button
            variant="plain"
            onClick={clearInput}
            aria-label="Clear button and input"
          >
            <TimesIcon />
          </Button>
        )}
      </TextInputGroupUtilities>
    </TextInputGroup>
  );
}
