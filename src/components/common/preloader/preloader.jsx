import preloader from '../../../assets/images/preloader.svg'
import React from 'react';
import styles from './preloader.module.css'
let Preloader = () => {
    return (
        <div className = {styles.preloaderBlock}>
            <img src={preloader} alt="preloader" />
        </div>
    )
}
export default Preloader;
