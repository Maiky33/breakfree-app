import Modal from "react-modal";
import styles from "./Favorites.module.css"
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { BsFillTrash3Fill } from 'react-icons/bs'
import { BiShoppingBag } from 'react-icons/bi'


interface ICatalogue {
  id: number;
  image: any;
  price: string;
  favorite: boolean;
  name: string;
}


function Favoritos(props: any) {

  const link = "https://api.whatsapp.com/send?phone=+573054106917&text=Hola,+estoy+interesad@+en+esté+producto:"

  const { modalIsOpen , closeModal} = props;


  const [favorites, setFavorites] = useState<ICatalogue[]>([])
  const [catalogue, setCatalogue] = useState<ICatalogue[]>([])
  const [deleted, setDeleted] = useState(false)

  useEffect(() =>{
    //@INFO Se parsea dos veces, por alguna razon magica
    const newItemsStringify = localStorage.getItem('CatalogueFav') || '[]'
    const newItemsParse = JSON.parse(newItemsStringify)
    const favoriteItems = newItemsParse.filter((item: any) => item.favorite)
    
    setFavorites(favoriteItems)
    setCatalogue(newItemsParse)
  },[modalIsOpen])

  
  useEffect(() =>{
    //@INFO Se parsea dos veces, por alguna razon magica
    const newItemsStringify = localStorage.getItem('CatalogueFav') || '[]'
    const newItemsParse = JSON.parse(newItemsStringify)
    const favoriteItems = newItemsParse.filter((item: any) => item.favorite)
    
    setFavorites(favoriteItems)
    setCatalogue(newItemsParse)
  },[deleted])
  

  const FavoriteEnable = (selected: ICatalogue) => {
    //creamos constante la cual va mapear el catalogo
    const deleteFav = catalogue.map((item : ICatalogue) => {
      //si item.id es igual al selected.id
      if (item.id === selected.id) {
        //me retorna los datos del item y favorite lo pasa al contrario de item.favorite
        return {
          ...item,
          favorite: item.favorite === false,
        };
        //en caso de que no sea igual me retorna el item
      } else {
        return item;
      }
    });

    setDeleted(!deleted)
    //seteamos el catalogo con todos los productos actualizados con likes o no
    setCatalogue(deleteFav);
    localStorage.setItem("CatalogueFav", JSON.stringify(deleteFav))
  };


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

          <div className={styles.cards_container}>
          {favorites.map((item: ICatalogue) => (
            <div key={item.id} className={styles.fav_cards}>
              <img
                className={styles.fav_image}
                alt="item_image"
                src={item.image}
              />
              <div className={styles.fav_info}>
                <p>{item.name}</p>
                <p>{item.price} COP</p>
              </div>

              <div className={styles.buttons_container}>

                <a className={`${styles.buttons} ${styles.shop_button}`} href={`${link} ${item.name}`} target="_blank" rel="noreferrer"> 
                  <BiShoppingBag />
                </a>

                <button 
                  className={`${styles.buttons} ${styles.delete_button}`}
                  onClick={() => FavoriteEnable(item)}
                >
                  <BsFillTrash3Fill />
                </button>
              </div>
            </div>  
          ))}
          </div>
        </>
      </Modal>
    </div>
  );
}

export default Favoritos;
