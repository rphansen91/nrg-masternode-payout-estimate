import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import React, { useEffect, useState } from "react";
import { useMasternodeList } from "../../providers/Energi/context";

export const MasternodeListError = () => {
  const { error } = useMasternodeList();
  const [errorOpen, setErrorOpen] = useState(false);
  useEffect(() => {
    if (error) {
      setErrorOpen(true);
    }
  }, [error]);
  return (
    <Snackbar
      open={errorOpen}
      onClose={() => setErrorOpen(false)}
      autoHideDuration={6000}
    >
      <Alert severity="error">{error}</Alert>
    </Snackbar>
  );
};
