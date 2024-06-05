import React from 'react'
import './OrganizationView.css'
import ImgDefault from '../../assets/img/logo.png'
import { useNavigate } from 'react-router-dom'
import { useOrganization } from '../../shared/hooks/useOrganization.jsx'

export const OrganizationView = () => {
  const { org, isLoading } = useOrganization()
  const navigate = useNavigate()

  console.log('Organization in Showcase:', org)
  return (
    <div className='body'>

      <div className="header_image_container">
        <div>
          <h1>Hola chitu</h1>
          <p>un pollo pollon</p>
        </div>
      </div>

      <div>
        <section>
          <h2 className="section__header">Escoje tu proximo voluntariado</h2>
          <div>
            {!isLoading && Array.isArray(org) && org.map((orgItem, index) => (
              
              <div key={index} style={{ border: '1px solid black' }}>

                <div>
                  <img src={ImgDefault} alt="Organization Logo" />
                  <div>
                    <label>
                      <input type="checkbox" />
                      {console.log(orgItem)}
                      {console.log("ola")}
                    </label>

                  </div>
                </div>
                <div>
                  <h1>{orgItem.name}</h1>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
