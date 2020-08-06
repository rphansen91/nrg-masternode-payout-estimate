import React, { useMemo } from 'react'

const { default: JazzIcon } = require("react-jazzicon");

export const AddressAvatar = ({ address, ...props }: { address: string, diameter?: number }) => {
  const seed = useMemo(
    () => parseInt((address || "").replace("0x", "").slice(0, 8), 16),
    [address]
  );
  return <JazzIcon seed={seed} {...props} />
}