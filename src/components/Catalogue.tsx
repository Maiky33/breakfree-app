import { FiHeart } from "react-icons/fi";
import { useState, useEffect } from "react";
import { BsFillHeartFill } from "react-icons/bs";
import { CatalogueItems } from "./functions/CatalogueItems";
import { FiltersItems } from "./functions/Filters";
import useLocalStorage from "use-local-storage";

import Styles from "./Catalogue.module.css";


export interface IFilters {
  id: string;
  name: string;
  active: boolean;
}

export interface ICatalogue {
  id: number;
  image: any;
  price: string;
  favorite: boolean;
  name: string;
}

const Catalogue = () => {

  //Metemos el catalogo en un state para poder modificarlo.
  const [Fav, setFav] = useState<ICatalogue[]>(CatalogueItems);
  // Codigo para el funcionamiento de los filtros.

  const [select, setSelect] = useState<IFilters[]>(FiltersItems);
  const [filterActive, setFilterActive] = useState("Todo");

  const [filteredTargets, setfilteredTargets] = useState <ICatalogue[]> ([]);

  //me traigo lo del input que guardo cristian.
  // const [Search , setSearch] = useLocalStorage<string>("text_input", "");
  const [Search, setSearch] = useState <string> ("");


  //guardo el catalogo de favoritos.
  const [_catalogueFav, setCatalogueFav] = useLocalStorage("CatalogueFav", "");
 

  useEffect(() => {
    setSearch('')
    localStorage.setItem('search', '')
  }, [])
  


  useEffect(() => {
    filterProducts();
    // eslint-disable-next-line
  }, [Search])


  useEffect(() => {
    
    const listenInputChange = () => {
      const localStorageSearchValue = localStorage.getItem('search') || ''
      if(localStorageSearchValue !== Search) setSearch(localStorageSearchValue)
    }

    //@INFO Cada que se escribe en CUALQUIER input de la plataforma se lee el evento y se actualiza el state con el valor de localstorage.
    window.addEventListener('input', listenInputChange);
    return () => window.removeEventListener('input', listenInputChange)
  });

  useEffect(() => {
    FavoriteItems()
    // eslint-disable-next-line
  }, [filteredTargets])

  //hacemos una funcion que va recibir un item al hacer click
  const FavoriteEnable = (selected: ICatalogue) => {
    //creamos constante la cual va mapear el catalogo
    const newfav = filteredTargets.map((item : ICatalogue) => {
      //si item.id es igual al selected.id
      if (item.id === selected.id) {
        //me retorna los datos del item y favorite lo pasa al contrario de item.favorite
        return {
          ...item,
          favorite: !item.favorite,
        };
        //en caso de que no sea igual me retorna el item
      } else {
        return item;
      }
    });

    //Seteamos Fav con el nuevo catalogo
    setfilteredTargets(newfav);
    setFav(newfav)
  };


  //enviar favoritos localStorarge
  const FavoriteItems = () => {
    const favotiteItems = filteredTargets.filter((item: ICatalogue) => item.favorite === true);
    setCatalogueFav(JSON.stringify(favotiteItems));
  };

  const selectionActive = (selected: IFilters) => {

    setSearch('')
    localStorage.setItem('search', '')

    const newSelect = select.map((item : IFilters) => {
      if (item.id === selected.id) {
        return {
          ...item,
          active: true,
        };
      } else {
        return {
          ...item,
          active: false,
        };
      }
    });
    setSelect(newSelect);
    setFilterActive(selected.id);
        
    filterProducts()
  };

  const filterProducts = () => {

    let newFilteredTargets: ICatalogue[] = [];

    if (filterActive === "Todo") {
      newFilteredTargets = Fav
      if (Search) {
        newFilteredTargets = filteredTargets.filter((item) => {
          if (
            item?.name?.toLocaleLowerCase().includes(Search.toLocaleLowerCase())
          ) {
            return true;
          } else {
            return false;
          }
        })
      } 
    } else {
      newFilteredTargets = Fav.filter((item) => {
        const filteredName =  item.name.toLowerCase();
        const filterSelected = filterActive.toLowerCase();
  
        if (filteredName === filterSelected) {
          return filteredName;
        } else {
          console.log("error");
        }
      });
    }
    setfilteredTargets(newFilteredTargets)
    
  };


  

  


  return (
    <div className={Styles.Catalogue}>
      <div className={Styles.ContainFiltersTargets}>
        <div className={Styles.filter_container}>
          {select.map((item) => (
            <button
              key={item.id}
              className={
                item.active
                  ? ` ${Styles.filter_button} ${Styles.filter_button_selected}`
                  : ` ${Styles.filter_button}`
              }
              onClick={() => selectionActive(item)}
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className={Styles.ContainTargets}>
          <div className={Styles.TargetTitle}>
            <h2 className={Styles.Title}>New arrivals</h2>
            <p>View more</p>
          </div>
          <div className={Styles.ContainTarget}>
            {/*Mapeamos el catalogo*/}
            {filteredTargets.map((item: ICatalogue) => (
              <div key={item.id} className={Styles.Target}>
                <div className={Styles.containLikeButton}>
                  {!item.favorite ? (
                    <FiHeart
                      onClick={() => FavoriteEnable(item)}
                      className={Styles.like_button}
                    />
                  ) : (
                    <BsFillHeartFill
                      onClick={() => FavoriteEnable(item)}
                      className={Styles.liked_button}
                    />
                  )}
                </div>
                <img
                  className={Styles.imageTarget}
                  alt="images"
                  src={item.image}
                />
                <div className={Styles.containPrice}>
                  <p>{item.name}</p>
                  <p className={Styles.Price}>{item.price} COP</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
};

export default Catalogue;
