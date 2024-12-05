import PageBreadcrumbs from '@/components/core/page-breadcrumbs'
import { BaseTab } from '@/components/core/tab'
import { Card, TabsProps } from 'antd'
import React from 'react'
import Term from './components/term'
import PrivatePolicy from './components/private-policy'

const HelpPage = () => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Terms and Rules',
      children: <Term /> 
    },
    {
      key: '2',
      label: 'Private Policy',
      children: <PrivatePolicy />
    }
  ]

  return (
    <Card>
      <PageBreadcrumbs />
      <BaseTab items={items} defaultActiveKey='1' />
    </Card>
  )
}

export default HelpPage