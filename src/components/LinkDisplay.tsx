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

  function copyToClipboard(link: string) {
    if (!navigator.clipboard) {
      console.log("Clipboard API not available");
      return;
    }

    try {
      navigator.clipboard.writeText(link);
      setSelectedLink(link);
    } catch (error) {
      console.error(error);
    }
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
