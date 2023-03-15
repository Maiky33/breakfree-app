import { useState } from "react";
import { FiHeart } from "react-icons/fi";
import { BiSearchAlt } from "react-icons/bi";
import { BsWhatsapp } from 'react-icons/bs'
import styles from "../components/Navbar.module.css";
import Favoritos from "./Favorites";


const Navbar = () => {

  
  const [mobile, setMobile] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  
  function openModal() {
    setIsOpen(true);
  }


  function closeModal() {
    setIsOpen(false);
  }


  const clickMobile = () => {
    setMobile(!mobile);
  };

  
  return (
    <>
      <div className={styles.navbar}>
        <div className={`${styles.logo_container} ${styles.logo_desktop}`}>
          BREAK FREE
        </div>

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
              placeholder="Busca tus prendas favoritas, blusas, pantalones..."
              maxLength={30}
              onChange={(e) => localStorage.setItem('search', e.target.value)}
            />


            <button onClick={clickMobile} className={styles.search_button}>
              <BiSearchAlt />
            </button>
          </div>

          
          <button 
            className={`${styles.navbar_buttons} ${styles.like_button}`}
            onClick={openModal}
          >
            <FiHeart />
          </button>


          <div className={`${styles.navbar_buttons} ${styles.wh_button}`}> 
            <a href="https://wa.link/31c5fa" target="_blank" rel="noreferrer"> 
              <button className={`${styles.navbar_buttons} ${styles.wh_button}`}>  
                <BsWhatsapp/>
              </button>
            </a>
          </div>
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
