import React, { useState, useEffect } from 'react';
import './Paginator.scss';

export function Paginator({ value, onChange = () => {}, count }) {
    let [ pages, setPages ] = useState([1]);
    let [ selectedPage, setSelectedPage ] = useState(value);

    useEffect(() => {
        if (count > 0) setPages([...Array(count)].map((_, i) => i + 1));
    }, [count]);

    useEffect(() => {
        if (pages.includes(value) && selectedPage !== value) {
            setSelectedPage(value);
        }
    }, [pages, value, selectedPage]);

    const handleLeftArrowClick = () => {
        if (selectedPage > 1) {
            setSelectedPage(selectedPage - 1);
            onChange(selectedPage - 1);
        }
    };

    const handleRightArrowClick = () => {
        if (selectedPage < pages[pages.length - 1]) {
            setSelectedPage(selectedPage + 1);
            onChange(selectedPage + 1);
        }
    };

    const handlePageClick = (event) => {
        const page = +event.target.dataset.page;

        setSelectedPage(page);
        onChange(page);
    };

    return (
        <div className="paginator">
            <button className="paginator__button" onClick={handleLeftArrowClick}>
                <i className="material-icons"> keyboard_arrow_left </i>
            </button>
            {
                pages.map(page => {
                    return (
                        <button className={
                            selectedPage === page
                                ? 'paginator__button paginator__button_selected'
                                : 'paginator__button'
                        } onClick={handlePageClick} data-page={page} key={page}>
                            {page}
                        </button>
                    );
                })
            }
            <button className="paginator__button" onClick={handleRightArrowClick}>
                <i className="material-icons"> keyboard_arrow_right </i>
            </button>
        </div>
    );
}