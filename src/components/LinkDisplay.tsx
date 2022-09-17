import React from "react";
import { Menu, MenuContent, MenuList, MenuItem } from "@patternfly/react-core";

export interface LinkDisplayProps {
  links?: string[];
}

export function LinkDisplay({ links }: LinkDisplayProps) {
  const menuItems = links?.map((link) => <MenuItem key={link}>{link}</MenuItem>);

  return (
    <Menu>
      <MenuContent>
        <MenuList>{menuItems}</MenuList>
      </MenuContent>
    </Menu>
  );
}
