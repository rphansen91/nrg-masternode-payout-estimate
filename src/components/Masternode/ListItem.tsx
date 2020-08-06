import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import Skeleton from "@material-ui/lab/Skeleton";
import React, { useMemo, useState } from "react";
import { useRemoveAddress } from "../../providers/Energi/context";
import { estimateBlocksTil } from "../../providers/Energi/estimate";
import { IMasternode } from "../../providers/Energi/types";
import { MasternodeAvatar } from "./Avatar";
import { MasternodePopover } from "./Popover";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";

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
  const [avatarEl, setAvatarEl] = useState<HTMLButtonElement | null>(null);
  const [removeEl, setRemoveEl] = useState<HTMLButtonElement | null>(null);

  const handleClickAvatar = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAvatarEl(event.currentTarget);
  };

  const handleCloseAvatar = () => {
    setAvatarEl(null);
  };

  const handleClickRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    setRemoveEl(event.currentTarget);
  };

  const handleCloseRemove = () => {
    setRemoveEl(null);
  };

  return (
    <ListItem>
      <MasternodePopover anchorEl={avatarEl} onClose={handleCloseAvatar}>
        <AddressLink address={address} />
        {loading ? (
          <Typography>Estimating next reward time...</Typography>
        ) : (
          <>
            <Typography>Rank: {rank}</Typography>
            <Typography>Active: {String(isActive)}</Typography>
            <Typography>Alive: {String(isAlive)}</Typography>
          </>
        )}
      </MasternodePopover>
      <MasternodePopover anchorEl={removeEl} onClose={handleCloseRemove}>
        <AddressLink address={address} />
        <Typography paragraph>Are you sure you want to remove this address?</Typography>
        <Box display="flex">
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCloseRemove}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => removeAddress(address)}
            style={{ marginLeft: 8 }}
          >
            Confirm
          </Button>
        </Box>
      </MasternodePopover>
      <ListItemAvatar>
        <IconButton onClick={handleClickAvatar}>
          <MasternodeAvatar
            loading={loading}
            address={address}
            isActive={isActive}
            isAlive={isAlive}
          />
        </IconButton>
      </ListItemAvatar>
      <ListItemText
        primary={
          loading ? (
            <Skeleton variant="text" width={120} />
          ) : typeof rank === "number" ? (
            <>
              #{rank} {estimatedTime?.format("MMMM Do YYYY, h:mm a")}
            </>
          ) : (
            "Address not found in Masternode list"
          )
        }
        secondary={
          loading ? <Skeleton variant="text" width={100} /> : estimatedTimeUntil
        }
      />
      <ListItemSecondaryAction>
        <Tooltip title={<Typography>Remove address</Typography>}>
          <IconButton onClick={handleClickRemove}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

const AddressLink = ({ address }: { address?: string }) => {
  return (
    <Typography noWrap>
      Address:{" "}
      <Link
        target="_blank"
        href={`https://explorer.energi.network/address/${address}/coin_balances`}
        style={{ textOverflow: "ellipsis" }}
      >
        {address}
      </Link>
    </Typography>
  );
};
