import Modal from "react-modal";
import styles from "./Favoritos.module.css"
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useEffect, useState } from "react";


interface ICatalogue {
  id: number;
  image: any;
  price: string;
  favorite: boolean;
  name: string;
}


function Favoritos(props: any) {

  const { modalIsOpen , closeModal} = props;


  const [favorites, setFavorites] = useState ([])

  useEffect(() =>{

    //@INFO Se parsea dos veces, por alguna razon magica
    const newItemsStringify = localStorage.getItem('CatalogueFav') || ''
    const newItemsFirstParse = JSON.parse(newItemsStringify)
    const newItemslastParse = JSON.parse(newItemsFirstParse) || []

    const favoriteItems = newItemslastParse.filter((item:any) => item.favorite)

    setFavorites(favoriteItems)

  },[modalIsOpen])

  return (
    <div>
      <Modal
        className={styles.modal}
        overlayClassName={styles.Overlay}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <>
          <div className={styles.modal_header}>
            <h2>Mirá tus favoritos!</h2>
            <button className={styles.close_button} onClick={closeModal}>
              <AiOutlineCloseCircle />
            </button>
          </div>

          {favorites.map((item: ICatalogue) => (
            <div key={item.id} className={styles.fav_cards}>
              <img
                className={styles.fav_image}
                alt="item_image"
                src={item.image}
              />
              <div>
                <p>{item.name}</p>
                <p>{item.price} COP</p>
              </div>
            </div>  
          ))}
        </>
      </Modal>
    </div>
  );
}

export default Favoritos;
