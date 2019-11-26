import React, { useState, useEffect } from 'react';
import './StarRating.scss';

export function StarRating({ rating }) {
    let [ stars, setStars ] = useState([]);

    useEffect(() => {
        if (rating > 5 || rating < 0) return;
        
        const arr = [];

        for (let id = 0; id < 5; id ++) {
            arr.push({ icon: id < rating ? 'star' : 'star_border', id })
        }

        setStars(arr);
    }, [ rating, setStars ]);

    return (
        <div className="star-rating">
            {
                stars.map(star => <i key={star.id} className="material-icons"> { star.icon } </i>)
            }
        </div>
    );
}