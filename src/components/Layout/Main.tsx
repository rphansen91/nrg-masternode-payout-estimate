import React, { FC } from 'react'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import { NavLink } from 'react-router-dom'

export const MainLayout: FC = ({ children }) => {
  return (
    <>
      <Box py={5} flexGrow={1}>
        {children}
      </Box>
      <Box display="flex" alignItems="center" py={5}>
        <Typography display="block" align="center" style={{ width: '100%' }}>
          <Link component={NavLink} to='/' activeStyle={{ color: '#fff' }} exact>
            Home
          </Link>
          {' | '}
          <Link component={NavLink} to='/about' activeStyle={{ color: '#fff' }} exact>
            About
          </Link>
          {' | '}
          <Link href={process.env.REACT_APP_GIT_URL} target="_blank">
            Github
          </Link>
        </Typography>
      </Box>
    </>
  )
}