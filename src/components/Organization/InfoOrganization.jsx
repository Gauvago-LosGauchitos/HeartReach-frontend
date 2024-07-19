import React, { useEffect, useState } from 'react';
import './InfoOrganization.css';
import { StarRating, StarRatingSee } from './starRating.jsx';
import ImgDefault from '../../assets/img/bg.svg';
import ImgWaos from '../../assets/img/ensalada-1.png';
import timexD from '../../assets/img/time.svg';
import UbixD from '../../assets/img/gps.svg';
import PhonexD from '../../assets/img/phone.svg';
import { useOrganization } from '../../shared/hooks/useOrganization';
import { useParams } from 'react-router-dom';
import { Spinner } from '../../assets/spinner/spinner.jsx';
import { NavBar } from '../NavBar/NavBar.jsx';
import { Footer } from '../Footer/Footer.jsx';
import { registerOrganizationReview, getRevew } from '../../services/api.js';
import Imgprueba from '../../assets/img/imgPrueba.jpg';

export const InfoOrganization = () => {
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const { getOrgsId, selectedOrg, isLoading, fetchVolunteering, volunteering } = useOrganization();
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            console.log(`Fetching organization with id: ${id}`);
            await getOrgsId(id);
            await fetchVolunteering(id);
            await fetchReviews();
            setLoading(false);
        };
        fetchData();
    }, [id]);

    const fetchReviews = async () => {
        try {
            const reviewsData = await getRevew();
            setReviews(reviewsData);
        } catch (err) {
            console.error('Error fetching reviews:', err);
        }
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        try {
            const reviewData = {
                review,
                rating,
                organizationR: selectedOrg._id
            };

            const response = await registerOrganizationReview(reviewData);
            setMessage(response.message);
            setError('');
            setReview('');
            setRating(0);
            await fetchReviews();
        } catch (err) {
            setError('Ocurrió un error al registrar la review.');
            setMessage('');
        }
    };

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    return (
        <div>
            {loading ? (
                <Spinner />
            ) : (
                <div className='body-infoxd'>
                    <NavBar />
                    <header className='headers'>
                        <img className='bg' src={ImgDefault} alt="" />
                        <img className='esp' alt="" />
                        <div className='volu containe'>
                            <a href="#" className='logoWaos'>HeartReach</a>
                        </div>

                        <div className='header-content containe'>
                            <div className='header-infoxd'>
                                <div className='header-txt'>
                                    <h1>{selectedOrg.name}</h1>
                                    <p>{selectedOrg.description}</p>
                                    <a href="#" className='btn-1'>Unirme</a>
                                </div>
                                <div className='header-img'>
                                    <img src={ImgWaos} alt="" />
                                </div>
                            </div>
                        </div>
                    </header>
                    <section className='info containe'>
                        <div className='info-1'>
                            <img src={timexD} alt="" />
                            <h3>Role</h3>
                            <p>{selectedOrg.role}</p>
                        </div>

                        <div className='info-1'>
                            <img src={UbixD} alt="" />
                            <h3>Ubicacion</h3>
                            <p>{selectedOrg.address}</p>
                        </div>

                        <div className='info-1'>
                            <img src={PhonexD} alt="" />
                            <h3>Telefono</h3>
                            <p>{selectedOrg.phone}</p>
                        </div>
                    </section>
                    <section className='review-section'>
                        <form onSubmit={handleSubmitReview}>
                            <h3>Agregar Review</h3>
                            <textarea
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                                placeholder='Escribe tu review...'
                                required
                            />
                            {/* Componente StarRating para seleccionar las estrellas */}
                            <StarRating
                                count={5}
                                size={24}
                                value={rating}
                                activeColor={'#FF9F0D'}
                                inactiveColor={'#ccc'}
                                onChange={handleRatingChange}
                            />
                            <button type='submit'>Enviar Review</button>
                        </form>
                        {message && <p>{message}</p>}
                        {error && <p>{error}</p>}
                    </section>
                    <section className='reviews-container'>
                        <h3>Reviews</h3>
                        {reviews.map((rev, index) => (
                            <div key={index} className='review'>
                                <p><strong>{rev.username}</strong> - {rev.organizationName}</p>
                                <p>{rev.review}</p>
                                <p>Valoración:</p>
                                {/* Componente StarRatingSee que solo muestra las estrellas */}
                                <StarRatingSee
                                    count={5}
                                    size={20}
                                    value={rev.rating}
                                    activeColor={'#FF9F0D'}
                                    inactiveColor={'#ccc'}
                                />
                                <hr />
                            </div>
                        ))}
                    </section>

                    <div className="card-container">
                        {volunteering.length > 0 ? (
                            volunteering.map((volunteer, index) => (
                                <div key={index} className="custom-card">
                                    <div className="image-section">
                                        <img src={Imgprueba} alt='' />
                                    </div>
                                    <div className="content-section">
                                        <a>
                                            <span className="title-text">
                                                {volunteer.title}
                                            </span>
                                        </a>
                                        <p className="description-text">
                                            {volunteer.description}  {/* Asegúrate de que este campo existe */}
                                        </p>
                                        <a className="action-button" href="#">
                                            Find out more
                                            <span aria-hidden="true">→</span>
                                        </a>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No hay voluntariados disponibles.</p>
                        )}
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
};
