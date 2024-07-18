import { useEffect, useState } from 'react';
import '../components/Organization/OrganizationView.css';
import ImgDefault from '../assets/img/logo.png';
import { useNavigate } from 'react-router-dom';
import { useVolunteer } from '../shared/hooks/useVolunteer.jsx';
import { NavBar } from '../components/NavBar/NavBar.jsx';
import { Spinner } from '../assets/spinner/spinner.jsx';

export const VoluntersView = () => {
  const [loading, setLoading] = useState(true)
  const { volunteers, isLoading } = useVolunteer();
  const navigate = useNavigate();

  // Verificar la estructura de los datos
  const hanadlerInfoVolunteer = (id) => {
    navigate(`/infoVoluntering/${id}`);
  }

  // Verificar si org.organizations es un array o un objeto
  

  console.log('Voluntariados array:', volunteers);

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
                {!isLoading && volunteers.map((volItem, index) => (
                  <div key={index}className='target' onClick={() => hanadlerInfoOrg(volItem._id)}>
                    <div className='container-organization'>
                      {/* Otros elementos */}
                      <div class="cardBox">
                        <div class="card">
                          <div class="h4">{volItem?.title || "Nombre no disponible"}</div>

                          <div class="content">
                            <div class="h3">{volItem?.name || "Nombre no disponible"}</div>
                            <p>Dirección: {volItem?.address || "Correo no disponible"}</p>
                            <p>Teléfono: {volItem?.phone || "Teléfono no disponible"}</p>
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