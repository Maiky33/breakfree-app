import Modal from "react-modal";
import styles from "./Favorites.module.css"
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { BsFillTrash3Fill, BsCartCheckFill } from 'react-icons/bs'
import { BiShoppingBag } from 'react-icons/bi'


interface ICatalogue {
  id: number;
  image: any;
  price: string;
  favorite: boolean;
  name: string;
}


function Favoritos(props: any) {

  // Recibimos por props las funciones que nos ayudan a mostrar y ocultar el modal.
  const { modalIsOpen , closeModal} = props;

  // Creamos los estados que usamos para actualizar el modal y los productos que se mostraran en él.
  const [favorites, setFavorites] = useState<ICatalogue[]>([])
  const [catalogue, setCatalogue] = useState<ICatalogue[]>([])
  const [text, setText] = useState("")
  const [deleted, setDeleted] = useState(false)


  // Creamos una constante la cual guardara el link base de whatsapp con el que luego enviaremos un mensaje al vendedor.
  const link = "https://api.whatsapp.com/send?phone=+573054106917&text=Hola,+estoy+interesad@+en+esté+producto:"


  // Usamos dos useEffect para traer los productos desde el localStorage y actualizar la lista dependiendo de la interacción del usuario.
  useEffect(() =>{
    getFavorites()

    // eslint-disable-next-line
  },[modalIsOpen, deleted])


  // Creamos la función encargada de traer los productos desde el localStorage y con la cual actualizamos los estados anteriores. 
  const getFavorites = () =>{
    const newItemsStringify = localStorage.getItem('CatalogueFav') || '[]'
    const newItemsParse = JSON.parse(newItemsStringify)
    const favoriteItems = newItemsParse.filter((item: any) => item.favorite)

    shopAll(favoriteItems)

    
    setFavorites(favoriteItems)
    setCatalogue(newItemsParse)
  }


  // Usamos una función para eliminar el producto de favoritos cuando el usuario le de click al botón de eliminar.
  const deleteItem = (selected: ICatalogue) => {
    //creamos constante la cual va mapear el catalogo.
    const deleteFav = catalogue.map((item : ICatalogue) => {
      //si item.id es igual al selected.id
      if (item.id === selected.id) {
        //me retorna los datos del item y favorite lo cambia a false.
        return {
          ...item,
          favorite: item.favorite === false,
        };
        //en caso de que no sea igual me retorna el item.
      } else {
        return item;
      }
    });
    

    shopAll(favorites)
    // Actualizamos el estado "deleted" para que se actualice la lista que se nuestra en el modal.
    setDeleted(!deleted)
    //seteamos el catalogo con todos los productos actualizados con likes o no.
    setCatalogue(deleteFav);
    // Guardamos en el localStorage el nuevo catalogo con los likes actualizados.
    localStorage.setItem("CatalogueFav", JSON.stringify(deleteFav))
  };

  
  const shopAll = (favs: ICatalogue[]) =>{

    let products = favs.map((item: ICatalogue) =>{
      return item.name
    })

    setText(products.join(', '))
  }


  return (
    <div>
      <Modal
        className={styles.modal}
        overlayClassName={styles.Overlay}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        contentLabel="Selected Option"
      >
        <>
          {/* Header del modal */}
          <div className={styles.modal_header}>
            <h2>Mira tus favoritos!</h2>
            <button className={styles.close_button} onClick={closeModal}>
              <AiOutlineCloseCircle />
            </button>
          </div>

          {/* Contenedor de los productos */}
          <div className={styles.cards_container}>
            {/* Tarjetas para cada producto */}
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
                  {/* Botón de compra whatsapp */}
                  <a 
                    className={`${styles.buttons} ${styles.shop_button}`} 
                    href={`${link} *${item.name}*`} 
                    target="_blank" 
                    rel="noreferrer"
                  > 
                    <BiShoppingBag />
                  </a>

                  {/* Botón para eliminar favorito */}
                  <button 
                    className={`${styles.buttons} ${styles.delete_button}`}
                    onClick={() => deleteItem(item)}
                  >
                    <BsFillTrash3Fill />
                  </button>
                </div>
              </div>  
            ))}
          </div>

          <div className={styles.modal_footer}>
            <a
              href={`${link} *${text}*`}
              className={(favorites.length? styles.shop_all : styles.inactive)}
              target="_blank" 
              rel="noreferrer"
            >
              <BsCartCheckFill />
            </a>
          </div>
        </>
      </Modal>
    </div>
  );
}

export default Favoritos;
