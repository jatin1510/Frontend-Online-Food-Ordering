import { Button, Card } from '@mui/material'
import React from 'react'

const OrderCard = () => {
  return (
    <Card className='flex justify-between items-center p-5'>
        <div className='flex items-center space-x-5'>
            <img className='h-20 w-20' src="https://cdn.pixabay.com/photo/2022/06/07/14/15/food-7248455_1280.png" alt="" />
            <div>
                <p>Pizza</p>
                <p>$399</p>
            </div>
        </div>
        <div>
            <Button className='cursor-not-allowed '>Completed</Button>
        </div>
    </Card>
  )
}

export default OrderCard
