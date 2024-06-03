import React from 'react'
import './OrganizationView.css'
import { useNavigate } from 'react-router-dom'
import { useOrganization } from '../../shared/hooks/useOrganization.jsx'

export const OrganizationView = () => {
  const { org, isLoading } = useOrganization()
  const navigate = useNavigate()

  console.log('Organization in Showcase:', org);
  return (
    <div className='booody'>
      <div className=''>
        ola chitu
      </div>
    </div>
  )
}
