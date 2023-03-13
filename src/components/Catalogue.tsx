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
  const [Fav, _setFav] = useState<ICatalogue[]>(CatalogueItems);
  //hacemos un estado que estaremos mapeando 
  const [filteredTargets, setfilteredTargets] = useState<ICatalogue[]>([]);
  
  
  // Codigo para el funcionamiento de los filtros.
  const [filterActive, setFilterActive] = useState("Todo");
  const [select, setSelect] = useState<IFilters[]>(FiltersItems);

  //hago un state del search
  const [Search, setSearch] = useState<string>("");
  
  //guardo el catalogo de favoritos.
  const [catalogueFav, setCatalogueFav] = useLocalStorage("CatalogueFav", '');
  

  //usamos el useeffect para actualizar el local con los del catalogo en caso de que no haya local poder filtrarlos
  useEffect(() => { 
    setCatalogueFav(JSON.stringify(Fav))
  },[])

  useEffect(() => {
    filterProducts();
    // eslint-disable-next-line
  }, [Search])
  
  useEffect(() => {
    filterProducts()
    // eslint-disable-next-line
  },[select])


  
  useEffect(() => {
    //cada vez que se este tipeando en un input se va ejecutar la funcion listenInputChange
    const listenInputChange = () => {
      const localStorageSearchValue = localStorage.getItem('search') || ''
      if(localStorageSearchValue !== Search) setSearch(localStorageSearchValue)
    }

    //@INFO Cada que se escribe en CUALQUIER input de la plataforma se lee el evento y se actualiza el state con el valor de localstorage.
    window.addEventListener('input', listenInputChange);

    //finaliza el evento
    return () => window.removeEventListener('input', listenInputChange)
  });


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

    //Seteamos filteredTargets con el nuevo catalogo para que se reflejen los likes
    setfilteredTargets(newfav);

    //seteamos el catalogo con todos los productos actualizados con likes o no
    setCatalogueFav(JSON.stringify(newfav));
  };



  //Filtros Cristian
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
  };

  //filtramos el catalogo y seteamos filteredTargets
  const filterProducts = () => {
    let newFilteredTargets: ICatalogue[] = [];

    //si filterActive es igual a todo
    if (filterActive === "Todo") {

      //la primera vez va retornar el catalogo sin likes
      newFilteredTargets = Fav
  
      //si catalogueFav existe
      if (catalogueFav) { 
        //newFilteredTargets va ser igual al catalogo de localStorage (evitando perder los likes)
        newFilteredTargets = JSON.parse(catalogueFav)
      }
    
      //si search existe
      if (Search) {
        //filtramos lo que hay en el localStorage por lo que hay en search
        newFilteredTargets = JSON.parse(catalogueFav).filter((item:any) => {
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
      //si search no es igual a todo filtramos por lo que hay en filtered que sea igual a filterselect
      newFilteredTargets = JSON.parse(catalogueFav).filter((item:any) => {
        const filteredName =  item.name.toLowerCase();
        const filterSelected = filterActive.toLowerCase();
  
        if (filteredName === filterSelected) {
          console.log("coincide");
        } else {
          console.log("no coincide");
        }

        return filteredName === filterSelected
      });
    }

    //seteamos setfilteredTargets para poder mapear los nuevos filtros
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
