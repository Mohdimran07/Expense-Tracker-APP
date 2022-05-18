import { Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import './Dashboard.css'

const Dashboard = () => {
  return (
    <div className='container'>
        <div>Hello</div>
      <div className='container__right'>
          <Typography>
              Complete your <Link to="/profile">Profile</Link>
          </Typography>
      </div>
      
    </div>
  )
}

export default Dashboard
