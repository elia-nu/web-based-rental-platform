import React, { useState, useEffect } from 'react';
import "./search.css";
function Slider() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        '/img/sun.jpg',
        '/img/.jpg',
        '/img/about.jpg'
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((currentSlide + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [currentSlide, slides.length]);

    return (
        <div className="slider">
            {slides.map((slide, index) => (
                <img
                    key={index}
                    src={slide}
                    alt={`Slide ${index}`}
                    className={index === currentSlide ? 'active' : ''}
                />
            ))}
        </div>
    );
}

export default Slider;