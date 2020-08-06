import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import MdLink from "@material-ui/core/Link";
import AddIcon from "@material-ui/icons/Add";
import React, { useState } from "react";
import { useAddAddress } from "../../providers/Energi/context";
import { Link } from "react-router-dom";

export const AddMasternode = () => {
  const [address, setAddress] = useState("");
  const addAddress = useAddAddress();
  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        addAddress(address);
        setAddress("");
      }}
    >
      <Box display="flex" alignItems="center">
        <TextField
          value={address}
          variant="outlined"
          onChange={(ev) => setAddress(ev.target.value)}
          label="Owner Address"
          fullWidth
        />
        <Box>
          <Fab
            type="submit"
            size="small"
            color="primary"
            style={{ marginLeft: 8 }}
          >
            <AddIcon />
          </Fab>
        </Box>
      </Box>
      <FormHelperText>
        Add address to estimate next payout <MdLink component={Link} to="/about">Learn More</MdLink>
      </FormHelperText>
    </form>
  );
};
