import React from 'react';
import { FaStar } from 'react-icons/fa';

export const StarRating = ({ count, size, value, activeColor, inactiveColor, onChange }) => {
    const stars = Array.from({ length: count }, (_, index) => index + 1);

    const handleChange = (newValue) => {
        onChange(parseInt(newValue, 10)); // Convertir newValue a número
    };

    return (
        <div>
            {stars.map((star) => (
                <FaStar
                    key={star}
                    size={size}
                    style={{ marginRight: 5, cursor: 'pointer', color: star <= value ? activeColor : inactiveColor }}
                    onClick={() => handleChange(star)}
                />
            ))}
        </div>
    );
};

export const StarRatingSee = ({ count, size, value, activeColor, inactiveColor }) => {
    const stars = Array.from({ length: count }, (_, index) => index + 1);

    return (
        <div>
            {stars.map((star) => (
                <FaStar
                    key={star}
                    size={size}
                    style={{ marginRight: 5, color: star <= value ? activeColor : inactiveColor }}
                />
            ))}
        </div>
    );
};