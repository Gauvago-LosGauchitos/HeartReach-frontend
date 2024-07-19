import { useEffect, useState } from 'react';
import './OrganizationView.css';
import ImgDefault from '../../assets/img/logo.png';
import imhHeroe from '../../assets/img/imhHeroe.jpg';
import { useNavigate } from 'react-router-dom';
import { useOrganization } from '../../shared/hooks/useOrganization.jsx';
import { NavBar } from '../NavBar/NavBar';
import { Spinner } from '../../assets/spinner/spinner';
import { Footer } from '../Footer/Footer.jsx';

export const OrganizationView = () => {
  const [loading, setLoading] = useState(true);
  const { org, isLoading } = useOrganization();
  const navigate = useNavigate();

  // Verificar la estructura de los datos
  console.log('Organization data:', org);
  const handlerInfoOrg = (id) => {
    navigate(`/infoOrganization/${id}`);
  };

  // Verificar si org.organizations es un array o un objeto
  let organizations = [];
  if (org && org.organizations) {
    organizations = Array.isArray(org.organizations) ? org.organizations : [org.organizations];
  }

  console.log('Organizations array:', organizations);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

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
              <div key={index} className='target' onClick={() => handlerInfoOrg(orgItem._id)}>
                <div className='container-organization'>
                  {/* Otros elementos */}
                  <div className="YoutubeVideo">
                    <div className="Image"><img src={orgItem?.images} alt="Logo" className='logo-organization'/></div>
                    <div className="Icon"> <img src={ImgDefault} alt="Organization Logo" className='img' /></div>
                    <div className="Title"><center><p>{orgItem?.name || "Nombre no disponible"}</p></center></div>
                    <div className="Name"><p>{orgItem?.address || "Correo no disponible"}</p></div>
                    <div className="Tel"><p>Tel: {orgItem?.phone || "Telefono no disponible"}</p></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
};
