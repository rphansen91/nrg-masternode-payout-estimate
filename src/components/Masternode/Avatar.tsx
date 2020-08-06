import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import CircularProgress from "@material-ui/core/CircularProgress";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { AddressAvatar } from "../../components/Avatar";

const useMasternodeListItemStyle = makeStyles((theme: Theme) =>
  createStyles({
    badge: {
      backgroundColor: ({ isActive, isAlive }: any) =>
        isActive && isAlive
          ? "#00d546"
          : isAlive
          ? "rgb(246, 195, 67)"
          : "rgb(255, 74, 141)",
      borderRadius: 8,
      height: 16,
      width: 16,
      border: `2px solid #757575`,
    },
  })
);

export const MasternodeAvatar = ({
  loading,
  address,
  isActive,
  isAlive,
}: {
  loading: boolean;
  address: string;
  isActive?: boolean;
  isAlive?: boolean;
}) => {
  const classes = useMasternodeListItemStyle({ isActive, isAlive });
  return loading ? (
    <Avatar style={{ position: "relative" }}>
      <CircularProgress
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "1005",
        }}
      />
      <AddressAvatar address={address} diameter={34} />
    </Avatar>
  ) : (
    <Badge
      overlap="circle"
      classes={{ badge: classes.badge }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      variant="dot"
    >
      <Avatar>
        <AddressAvatar address={address} diameter={34} />
      </Avatar>
    </Badge>
  );
};
