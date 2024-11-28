import { Flex } from "antd"
import { FC } from "react"

interface MenuWrapperProps {
  children: React.ReactNode
}

export const MenuWrapper : FC<MenuWrapperProps> =  ({children}) => {
  return <Flex vertical gap={20}>
    {children}
  </Flex>
}