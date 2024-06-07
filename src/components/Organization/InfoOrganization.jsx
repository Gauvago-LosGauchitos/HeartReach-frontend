import React, { useEffect } from 'react';
import './InfoOrganization.css';
import ImgDefault from '../../assets/img/img1.jpg';
import { useOrganization } from '../../shared/hooks/useOrganization';
import { useParams } from 'react-router-dom';


export const InfoOrganization = () => {
    const { id } = useParams();
    const { getOrgsId, selectedOrg, isLoading } = useOrganization();

    useEffect(() => {
        const fetchData = async () => {
            await getOrgsId(id);
        };
        fetchData();
    }, [id, getOrgsId]);

    useEffect(() => {
        // Este useEffect se asegura de que el DOM esté listo antes de intentar manipularlo
        if (!isLoading && selectedOrg) {
            const nextBtn = document.querySelector('.next');
            const prevBtn = document.querySelector('.prev');
            const slider = document.querySelector('.slider');
            const sliderList = slider?.querySelector('.list');
            const thumbnail = document.querySelector('.thumbnail');
            const thumbnailItems = thumbnail?.querySelectorAll('.item');

            if (thumbnailItems && thumbnailItems.length > 0) {
                thumbnail.appendChild(thumbnailItems[0]);
            }

            const moveSlider = (direction) => {
                const sliderItems = sliderList?.querySelectorAll('.item');
                const thumbnailItems = document.querySelectorAll('.thumbnail .item');

                if (sliderItems && thumbnailItems) {
                    if (direction === 'next') {
                        sliderList.appendChild(sliderItems[0]);
                        thumbnail.appendChild(thumbnailItems[0]);
                        slider.classList.add('next');
                    } else {
                        sliderList.prepend(sliderItems[sliderItems.length - 1]);
                        thumbnail.prepend(thumbnailItems[thumbnailItems.length - 1]);
                        slider.classList.add('prev');
                    }

                    const handleAnimationEnd = () => {
                        slider.classList.remove(direction);
                    };

                    slider.addEventListener('animationend', handleAnimationEnd, { once: true });
                }
            };

            if (nextBtn && prevBtn) {
                nextBtn.addEventListener('click', () => moveSlider('next'));
                prevBtn.addEventListener('click', () => moveSlider('prev'));
            }

            return () => {
                if (nextBtn && prevBtn) {
                    nextBtn.removeEventListener('click', () => moveSlider('next'));
                    prevBtn.removeEventListener('click', () => moveSlider('prev'));
                }
            };
        }
    }, [isLoading, selectedOrg]);

    if (!selectedOrg || Object.keys(selectedOrg).length === 0) {
        return <div>No organization data found.</div>;
    }

    return (
        <div>
            <div className="slider">
                <div className="list">
                    <div key={selectedOrg._id} className="item">
                        <p>{selectedOrg.address}</p>
                        <p>{selectedOrg.phone}</p>
                    </div>
                    <div className="item">
                        <img src={ImgDefault} alt="Slider" />
                        <div className="content">
                            <div className="title">{selectedOrg.name}</div>
                            <div className="description">
                            <p>{selectedOrg.description}</p>
                            </div>
                            
                            <div className="button">
                                <button>UNIRME</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="thumbnail">
                    {[1, 2, 3, 4].map((index) => (
                        <div className="item" key={index}>
                            <img src={ImgDefault} alt={`Thumbnail ${index}`} />
                        </div>
                    ))}
                </div>

                <div className="nextPrevArrows">
                    <button className="prev"> &lt; </button>
                    <button className="next"> &gt; </button>
                </div>
            </div>
        </div>
    );
};
