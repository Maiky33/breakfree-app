import { FiHeart } from "react-icons/fi";
import { useState, useEffect } from "react";
import { BsFillHeartFill } from "react-icons/bs";
import { CatalogueItems } from "./functions/CatalogueItems";
import { FiltersItems } from "./functions/Filters";


import Styles from "./Catalogue.module.css";

//interfaz filtros TypeScript
export interface IFilters {
  id: string;
  name: string;
  active: boolean;
}

//interfaz catalogo TypeScript
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

  //hacemos un estado que sera el catalogo modificado y luego estaremos mapeando 
  const [filteredTargets, setfilteredTargets] = useState<ICatalogue[]>([]);
  
  // Codigo para el funcionamiento de los filtros.
  const [filterActive, setFilterActive] = useState("Todo");

  //para saber que filtro a sido seleccionado
  const [select, setSelect] = useState<IFilters[]>(FiltersItems);


  //hago un state del search que recibimos del local cada vez que alguien escribe en un input
  const [Search, setSearch] = useState<string>("");
  
  //guardo y traemos el catalogo de favoritos.
  const [catalogueFav, setCatalogueFav] = useState<string>('');
  

  //nos traemos lo que este guardado en el local storage y seteamos catalogo
  useEffect(() => { 
    //al empezar cada 200 milisegundos traera el catalogo para poder actualizar el catalogo y que se pueda actualizar el mapeo
    setInterval(() => { 
      const getallcatalogue = localStorage.getItem('CatalogueFav') || JSON.stringify(Fav)
      setCatalogueFav(getallcatalogue)
    }, 200)
    // eslint-disable-next-line
  },[]) 
  

  useEffect(() => {
    //resivimos el catalogo cada vez que catalogueFav cambie
    const getallcatalogue = localStorage.getItem('CatalogueFav') || JSON.stringify(Fav)
    setfilteredTargets(JSON.parse(getallcatalogue))

    //cada vez que search cambie ejecutamos el filtro
    filterProducts();

    //cada vez que select cambie ejecutamos el filtro
    filterProducts()

    //para cuando el catalogo cambie sigan los filtros
    filterProducts()   

    // eslint-disable-next-line
  }, [Search, select, catalogueFav])
  


  useEffect(() => {
    //cada vez que se este tipeando en un input se va ejecutar la funcion listenInputChange
    const listenInputChange = () => {
      //nos traemos search del local
      const localStorageSearchValue = localStorage.getItem('search') || ''
      //si search del local es distinto de search vamos actualizar search con lo que ahi en el local
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
    const newfav = JSON.parse(catalogueFav).map((item : ICatalogue) => {
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
    //seteamos fav para actualizar el catalogo
    setFav(newfav)
    
    //filtramos nuevamente el catalogo para que no se muestre el catalogo completo nuevamente
    filterProducts()

    //seteamos el catalogo con todos los productos actualizados con likes o no, en modo de string
    setCatalogueFav(JSON.stringify(newfav));
    //y guardamos cada vez queden like en el local
    localStorage.setItem("CatalogueFav", JSON.stringify(newfav))
  };



  //Creamos una función para filtrar los productos
  const selectionActive = (selected: IFilters) => {
    //borramos lo que ahi en el search y el local para que no afecte el filtro
    setSearch('')
    localStorage.setItem('search', '')
    
    //hacemos una constante la cual va retornar el objeto de los filtros mostrando cual es el que a sido seleccionado
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

    //seteamos los filtros con el correspondiente
    setSelect(newSelect);
    //seteamos filteractive con el nombre del filtro que sea igual a que elegimos 
    setFilterActive(selected.id);
  };



  //hacemos una funcion par filtrar el catalogo y setear filteredTargets
  const filterProducts = () => {
    //creamos variable para filtrar el catalogo
    let newFilteredTargets: ICatalogue[] = [];

    //si filterActive es igual a todo
    if (filterActive === "Todo") {

      //la primera vez va retornar el catalogo sin likes o el default
      newFilteredTargets = Fav
  
      //pero si catalogueFav existe (osea si hay localStorage)
      if (catalogueFav) { 
        //newFilteredTargets va ser igual al catalogo de localStorage (evitando perder los likes)
        newFilteredTargets = JSON.parse(catalogueFav)
      }
    
      //si search existe
      if (Search) {
        //filtramos lo que hay en el localStorage por lo que hay en search
        newFilteredTargets = JSON.parse(catalogueFav).filter((item:ICatalogue) => {
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
      //en caso de que filterActive no sea igual a todo vamos a filtrar el catalogo que viene del local y le decimos que nos retorne todo en donde item.name sea igual al estado que seteamos al elegir el filtro
      newFilteredTargets = JSON.parse(catalogueFav).filter((item: ICatalogue) => (  
        item.name.toLowerCase() === filterActive.toLowerCase()
      ))
    }

    //seteamos setfilteredTargets para poder mapear con los nuevos filtros
    setfilteredTargets(newFilteredTargets)
  };

  

  return (
    <div className={Styles.Catalogue}>
      <div className={Styles.ContainFiltersTargets}>
        <div className={Styles.filter_container}>
          {/*Mapeamos lo filtros y le pasamos las funciones correctas*/}
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
