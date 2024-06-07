import React, { useEffect } from 'react';
import './InfoOrganization.css';
import ImgDefault from '../../assets/img/img1.jpg';
import {useOrganization} from '../../shared/hooks/useOrganization'
import { useParams } from 'react-router-dom';

export const InfoOrganization = () => {
    const {id} = useParams();
    const {getOrgsId, selectedOrg, isLoading} = useOrganization()
    useEffect(()=>{
        const fetchData= async ()=>{
            await getOrgsId(id)
        }
         fetchData()
    }, []);

    console.log(selectedOrg)

    useEffect(() => {
        const nextBtn = document.querySelector('.next');
        const prevBtn = document.querySelector('.prev');
        const slider = document.querySelector('.slider');
        const sliderList = slider.querySelector('.list');
        const thumbnail = document.querySelector('.thumbnail');
        const thumbnailItems = thumbnail.querySelectorAll('.item');

        thumbnail.appendChild(thumbnailItems[0]);

        const moveSlider = (direction) => {
            const sliderItems = sliderList.querySelectorAll('.item');
            const thumbnailItems = document.querySelectorAll('.thumbnail .item');

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
    }, []);

    return (
        <div>

            <div className="slider">
                <div className="list">
                    { Array.isArray(selectedOrg) && selectedOrg.map(orgItem =>(
                        <div key={orgItem._id}> 
                            <h2>{orgItem.name}</h2>
                        </div>
                    ))}
                        <div className="item">
                            <img src={ImgDefault} alt={`Slider `} />
                            <div className="content">
                                <div className="title">Voluntariado De Mascotas</div>
                                
                                <div className="description">
                                    En este voluntariado lo que se llegara a reliazar sera ayudar aun albergue de perros a conseguirles un hogar 
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
