import { useState } from "react";
import { FiHeart } from "react-icons/fi";
import { BiSearchAlt } from "react-icons/bi";
import { BsWhatsapp } from 'react-icons/bs'
import styles from "../components/Navbar.module.css";
import Favoritos from "./Favorites";


const Navbar = () => {

  // Usamos un estado para saber si el buscador mobile está abierto o cerrado.  
  const [mobile, setMobile] = useState(false);

  // Usamos un esatdo para saber si el modal está abierto o cerrado.
  const [modalIsOpen, setIsOpen] = useState(false);
  

  // Creamos una función para cambiar el estado del modal a abierto.
  const openModal = () => {
    setIsOpen(true);
  }

  // Creamos una función para cambiar el estado del modal a cerrado.
  const closeModal = () => {
    setIsOpen(false);
  }

  // Creamos una función para cambiar el estado del buscador mobile.
  const clickMobile = () => {
    setMobile(!mobile);
  };

  
  return (
    <>
      <div className={styles.navbar}>
        {/* Logo Desktop */}
        <div className={`${styles.logo_container} ${styles.logo_desktop}`}>
          BREAK FREE
        </div>

        {/* Logo mobile */}
        <div
          className={
            !mobile 
              ?`${styles.logo_container} ${styles.logo_mobile}`
              : styles.disable
          }
        >
          BREAK FREE
        </div>

        <div className={styles.right_container}>

          {/* Buscador desktop */}
          <div
            className={`${styles.search_container} ${styles.search_container_desktop}`}
          >
            <input
              className={`${styles.search}`}
              type="text"
              placeholder="Busca tus prendas favoritas, blusas, pantalones..."
              maxLength={50}
              onChange={(e) => localStorage.setItem('search', e.target.value)}
          />

            <button className={styles.search_button}>
              <BiSearchAlt />
            </button>
          </div>

          {/* Buscador mobile */}
          <div
            className={`${styles.search_container} ${styles.search_container_mobile}`}
          >
            <input
              className={
                mobile
                  ?`${styles.search} ${styles.search_mobile}`
                  : styles.disable
              }
              type="text"
              placeholder="Busca tus prendas favoritas"
              maxLength={30}
              onChange={(e) => localStorage.setItem('search', e.target.value)}
            />

            <button onClick={clickMobile} className={styles.search_button}>
              <BiSearchAlt />
            </button>
          </div>

          {/* Botón de favoritos */}
          <button 
            className={`${styles.navbar_buttons} ${styles.like_button}`}
            onClick={openModal}
          >
            <FiHeart />
          </button>

          {/* Botón de whatsapp */}
            <a 
              className={`${styles.navbar_buttons} ${styles.wh_button}`} 
              href="https://wa.link/31c5fa" 
              target="_blank" 
              rel="noreferrer"
            > 
              <BsWhatsapp/>
            </a>

        </div>
      </div>

      <Favoritos 
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
      />
    </>
  );
};

export default Navbar;
