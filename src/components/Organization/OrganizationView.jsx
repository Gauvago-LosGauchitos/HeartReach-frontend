import { useEffect, useState } from 'react';
import './OrganizationView.css';
import ImgDefault from '../../assets/img/logo.png';
import imhHeroe from '../../assets/img/imhHeroe.jpg'
import { useNavigate } from 'react-router-dom';
import { useOrganization } from '../../shared/hooks/useOrganization.jsx';
import { NavBar } from '../NavBar/NavBar';
import { Spinner } from '../../assets/spinner/spinner';

export const OrganizationView = () => {
  const [loading, setLoading] = useState(true)
  const { org, isLoading } = useOrganization();
  const navigate = useNavigate();

  // Verificar la estructura de los datos
  console.log('Organization data:', org);
  const hanadlerInfoOrg = (id) => {
    navigate(`/infoOrganization/${id}`);
  }

  // Verificar si org.organizations es un array o un objeto
  let organizations = [];
  if (org && org.organizations) {
    organizations = Array.isArray(org.organizations) ? org.organizations : [org.organizations];
  }

  console.log('Organizations array:', organizations);

  useEffect(() => {
    const timer = setTimeout(() => {
        setLoading(false)
    }, 600)
    return () => clearTimeout(timer)
}, [])

  return (

    <div>
        {loading ? (
            <Spinner />
        ) : (
    <div className='body'>
      <NavBar/>
      <div className="header_image_container">
        <div>
          <h1>Hola chitu</h1>
          <p>un pollo pollon</p>
        </div>
      </div>

      <div>
        <section>
          <h2 className="section__header">Escoje tu proximo voluntariado</h2>
          <div className='object'>
            {!isLoading && organizations.map((orgItem, index) => (
              <div key={index} style={{ border: '1px solid black' }} className='target' onClick={()=>hanadlerInfoOrg(orgItem._id)}>
                <div>
                  <img src={ImgDefault} alt="Organization Logo" className='img'/>
                  <div>
                    <h1>{orgItem?.name || "Nombre no disponible"}</h1> {/* Aquí mostramos el nombre de la organización */}
                    {console.log("Org item:", orgItem)}
                    <p>Dirección: {orgItem?.address || "Correo no disponible"}</p>
                    <p>Telefono: {orgItem?.phone || "Telefono no disponible"}</p>
                  </div>
                </div>
                <div>
                  {/* Otros elementos */}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
    )}
        </div>
  );
}