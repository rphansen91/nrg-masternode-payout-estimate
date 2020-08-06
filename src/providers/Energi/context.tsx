import React, { FC, useEffect, useCallback } from 'react'
import { hawk, useHawkState, useHawkSetState, dispatch } from 'react-hawk'
import { listMasternodes } from './api'
import { IMasternode } from './types'

const ADDRESSES = 'nrg_addresses'
const addressesHawk = hawk({
  key: ADDRESSES,
  default: (localStorage.getItem(ADDRESSES) || '').split(',').filter(v => v)
})

const masternodeListHawk = hawk<{
  loading: boolean
  error: string
  data: IMasternode[] | null
}>({
  key: 'masternodeList',
  default: {
    loading: false,
    error: '',
    data: null
  }
})

export const useAddresses = () => useHawkState(addressesHawk)
export const useSetAddresses = () => {
  const setState = useHawkSetState(addressesHawk)
  return useCallback((v: string[]) => {
    setState(v)
    localStorage.setItem(ADDRESSES, v.join(','))
  }, [setState])
}
export const useAddAddress = () => {
  const addresses = useAddresses()
  const setAddresses = useSetAddresses()
  return useCallback((address) => {
    setAddresses([address].concat(addresses.filter(v => v && v !== address)))
  }, [addresses])
}
export const useRemoveAddress = () => {
  const addresses = useAddresses()
  const setAddresses = useSetAddresses()
  return useCallback((address) => {
    setAddresses(addresses.filter(v => v === (address || '').toLowerCase()))
  }, [addresses])
}
export const useMasternodeList = () => useHawkState(masternodeListHawk)

export const EnergiProvider: FC = ({ children }) => {
  useEffect(() => {
    loadMasternodeList()
  }, [])
  return (
    <>{children}</>
  )
}

function loadMasternodeList () {
  dispatch(masternodeListHawk, {
    loading: true,
    error: '',
    data: null
  });
  listMasternodes()
  .then(({ result }) => dispatch(masternodeListHawk, {
    loading: false,
    error: '',
    data: result
  }))
  .catch((err) => dispatch(masternodeListHawk, {
    loading: false,
    error: err.message,
    data: null
  }))
}