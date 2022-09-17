import React, { useState } from "react";
import {
  Menu,
  MenuContent,
  MenuList,
  MenuItem,
  Tooltip,
} from "@patternfly/react-core";
import { CopyIcon } from "@patternfly/react-icons";

export interface LinkDisplayProps {
  links?: string[];
}

export function LinkDisplay({ links }: LinkDisplayProps) {
  const [selectedLink, setSelectedLink] = useState("");

  function handleClipboardCopySuccess(link: string) {
    setSelectedLink(link);
    setTimeout(() => setSelectedLink(""), 3000);
  }

  function handleClipboardCopyFailure(error: any) {
    console.error(error);
  }

  async function copyToClipboard(link: string) {
    if (!navigator.clipboard) {
      console.log("Clipboard API not available");
      return;
    }

    await navigator.clipboard.writeText(link).then(
      () => handleClipboardCopySuccess(link),
      (error) => handleClipboardCopyFailure(error)
    );
  }

  const menuItems = links?.map((link) => {
    const linkCopyStatus = link === selectedLink ? "Copied" : "Click to copy";

    return (
      <Tooltip content={linkCopyStatus} position="left">
        <MenuItem
          key={link}
          icon={<CopyIcon />}
          onClick={() => copyToClipboard(link)}
        >
          {link}
        </MenuItem>
      </Tooltip>
    );
  });

  return (
    <Menu>
      <MenuContent>
        <MenuList>{menuItems}</MenuList>
      </MenuContent>
    </Menu>
  );
}
