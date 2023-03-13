import useLocalStorage from "use-local-storage";
import Modal from "react-modal";
import styles from "./Favoritos.module.css"
import { AiOutlineCloseCircle } from "react-icons/ai";
import {useEffect,useState} from 'react'


interface ICatalogue {
  id: number;
  image: any;
  price: string;
  favorite: boolean;
  name: string;
}


function Favoritos(props: any) {

  const { modalIsOpen } = props;
  const { closeModal } = props;

  const [catalogueFav] = useLocalStorage('CatalogueFav', '[]')
  const [Favs, setFavs] = useState(JSON.parse(catalogueFav))


  const getDatareloadFav = async() => {  
    let newFavs = await JSON.parse(catalogueFav)
    setFavs(newFavs)
  }

  useEffect(() => { 
    getDatareloadFav()
    // eslint-disable-next-line
  },[catalogueFav])
   

  return (
    <div>
      <Modal
        className={styles.modal}
        overlayClassName={styles.Overlay}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <div className={styles.modal_header}>
          <h2>Mirá tus favoritos!</h2>
          <button className={styles.close_button} onClick={closeModal}>
            <AiOutlineCloseCircle />
          </button>
        </div>
 
        {Favs.filter((item:ICatalogue) => (item.favorite === true)).map((item: ICatalogue) => (
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
        ))
        }
      </Modal>
    </div>
  );
}

export default Favoritos;
