import { Button, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import ExpenseContext from '../../context-store/Expense-context'
import './Dashboard.css'

const Dashboard = () => {
    const expCtx = useContext(ExpenseContext)
    const logOutHandler = () => {
       expCtx.logout()
       
    }
  return (
    <div className='container'>
        <div>Hello</div>
      <div className='container__right'>
          <Typography>
              Complete your <Link to="/profile">Profile</Link>
          </Typography>
      </div>
      <div>
          <Button onClick={logOutHandler}>Log out</Button>
      </div>
      
    </div>
  )
}

export default Dashboard
