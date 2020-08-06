import Box from "@material-ui/core/Box";
import Popover from "@material-ui/core/Popover";
import React, { FC } from "react";

export const MasternodePopover: FC<{
  anchorEl: HTMLButtonElement | null;
  onClose: () => any;
}> = ({
  anchorEl,
  onClose,
  children
}) => {
  const open = Boolean(anchorEl);
  const id = open ? "avatar-popover" : undefined;
  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Box maxWidth={320} p={2}>
        {children}
      </Box>
    </Popover>
  );
};
