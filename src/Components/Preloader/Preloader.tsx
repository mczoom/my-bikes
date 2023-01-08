import React from 'react'

interface PreloaderProps {
  isLoading: boolean
}


export const Preloader = ({isLoading}: PreloaderProps) => {

    const preloaderClassName = `preloader ${isLoading ? '' : 'preloader_off'}`;

    return (
        <div className={preloaderClassName}>
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </div>
    )
};
