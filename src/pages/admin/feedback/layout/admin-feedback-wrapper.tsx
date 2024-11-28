import { Flex } from 'antd'
import React from 'react'

interface AdminFeedbackWrapperProps {
  children: React.ReactNode
}

const AdminFeedbackWrapper = ({children} : AdminFeedbackWrapperProps) => {
  return (
    <Flex vertical gap={20}>
      {children}
    </Flex>
  )
}

export default AdminFeedbackWrapper