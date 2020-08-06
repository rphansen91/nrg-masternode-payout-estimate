import List from "@material-ui/core/List";
import React from "react";
import {
  useAddresses,
  useMasternodeList,
} from "../../providers/Energi/context";
import { MasternodeListItem } from './ListItem'

export const MasternodeList = () => {
  const { data, loading } = useMasternodeList();
  const addresses = useAddresses();
  return (
    <List disablePadding>
      {addresses.map((address) => (
        <MasternodeListItem
          key={address}
          address={address}
          masternodeList={data}
          loading={loading}
        />
      ))}
    </List>
  );
};
