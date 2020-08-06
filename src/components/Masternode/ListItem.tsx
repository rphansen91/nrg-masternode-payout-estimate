import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import Skeleton from "@material-ui/lab/Skeleton";
import React, { useMemo } from "react";
import { AddressAvatar } from "../../components/Avatar";
import { IMasternode } from "../../providers/Energi/types"
import { estimateBlocksTil } from "../../providers/Energi/estimate";
import { useRemoveAddress } from "../../providers/Energi/context";

const useMasternodeListItemStyle = makeStyles((theme: Theme) =>
  createStyles({
    badge: {
      backgroundColor: ({ isActive, isAlive }: any) =>
        isActive && isAlive
          ? "rgb(41, 182, 175)"
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

export const MasternodeListItem = ({
  masternodeList,
  address,
  loading,
}: {
  masternodeList: IMasternode[] | null;
  address: string;
  loading: boolean;
}) => {
  const removeAddress = useRemoveAddress();
  const {
    rank,
    isActive,
    isAlive,
    estimatedTime,
    estimatedTimeUntil,
  } = useMemo(() => estimateBlocksTil(masternodeList, address), [
    masternodeList,
    address,
  ]);
  const classes = useMasternodeListItemStyle({ isActive, isAlive });
  return (
    <ListItem>
      {loading ? (
        <ListItemAvatar>
          <Tooltip
            title={
              <>
                <Typography noWrap>
                  Address:{" "}
                  <Typography
                    component="span"
                    style={{ textOverflow: "ellipsis" }}
                  >
                    {address}
                  </Typography>
                </Typography>
                <Typography>Estimating next reward time...</Typography>
              </>
            }
          >
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
          </Tooltip>
        </ListItemAvatar>
      ) : (
        <Tooltip
          title={
            <>
              <Typography noWrap>
                Address:{" "}
                <Typography
                  component="span"
                  style={{ textOverflow: "ellipsis" }}
                >
                  {address}
                </Typography>
              </Typography>
              <Typography>Rank: {rank}</Typography>
              <Typography>Active: {String(isActive)}</Typography>
              <Typography>Alive: {String(isAlive)}</Typography>
            </>
          }
        >
          <ListItemAvatar>
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
          </ListItemAvatar>
        </Tooltip>
      )}
      <ListItemText
        primary={
          loading ? (
            <Skeleton variant="text" width={120} />
          ) : (
            <>
              #{rank} {estimatedTime?.format("MMMM Do YYYY, h:mm:ss a")}
            </>
          )
        }
        secondary={
          loading ? <Skeleton variant="text" width={100} /> : estimatedTimeUntil
        }
      />
      <ListItemSecondaryAction>
        <IconButton size="small" onClick={() => removeAddress(address)}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
