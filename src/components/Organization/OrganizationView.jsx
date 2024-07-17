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
          <NavBar />
              <h2 className="section__header">Escoje tu proximo voluntariado</h2>
              <div className='object'>
                {!isLoading && organizations.map((orgItem, index) => (
                  <div key={index}className='target' onClick={() => hanadlerInfoOrg(orgItem._id)}>
                    <div className='container-organization'>
                      {/* Otros elementos */}
                      <div class="cardBox">
                        <div class="card">
                          <div class="h4">{orgItem?.name || "Nombre no disponible"}</div>

                          <div class="content">
                            <div class="h3">{orgItem?.name || "Nombre no disponible"}</div>
                            <p>Dirección: {orgItem?.address || "Correo no disponible"}</p>
                            <p>Teléfono: {orgItem?.phone || "Teléfono no disponible"}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
        </div>
      )}
    </div>
  );
}