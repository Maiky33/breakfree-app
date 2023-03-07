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


  //Metemos el catalogo en un state para poder modificarlo
  const [Fav, setFav] = useState<ICatalogue[]>(CatalogueItems);

  //guardo el catalogo de favoritos
  const [catalogueFav, setCatalogueFav] = useLocalStorage("CatalogueFav", "");

  //hacemos una funcion que va recibir un item al hacer click
  const FavoriteEnable = (selected: ICatalogue) => {
    //creamos constante la cual va mapear el catalogo
    const newfav = Fav.map((item) => {
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
    //seteamos Fav con el nuevo catalogo
    setFav(newfav);
    FavoriteItems();
  };

  //enviar favoritos localStorarge
  const FavoriteItems = () => {
    const favotiteItems = Fav.filter((item) => item.favorite === true);
    setCatalogueFav(JSON.stringify(favotiteItems));
  };

  // Codigo para el funcionamiento de los filtros

  const [select, setSelect] = useState<IFilters[]>(FiltersItems);
  const [filterActive, setFilterActive] = useState("Todo");

  //me traigo lo del input que guardo cristian
  const [Search , setSearch] = useLocalStorage<string>("text_input", "");
  
  const selectionActive = (selected: IFilters) => {
    const newSelect = select.map((item) => {
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
    setSearch('')
  };

  // useEffect(() => {
  //   console.log(Search);
  // },[Search])

  const GetCatalogue = () => {
    let filteredTargets: ICatalogue[] = [];

    if (filterActive === "Todo") {
      filteredTargets = Fav      
    } else {
      filteredTargets = Fav.filter((item) => {
        const filteredName = item.name.toLowerCase();
        const filterSelected = filterActive.toLowerCase();

        if (filteredName === filterSelected) {
          return filteredName;
        } else {
          console.log("error");
        }
      });
    }

    const newFliterWithSearch = filteredTargets?.filter((item) => {
      if (
        item?.name?.toLocaleLowerCase().includes(Search.toLocaleLowerCase())
      ) {
        return true;
      } else {
        return false;
      }
    });

    // if (Search !== '') {
    //     filteredTargets = Fav.filter((item) => {
    //       if (
    //         item?.name?.toLocaleLowerCase().includes(Search.toLocaleLowerCase())
    //       ) {
    //         return true;
    //       } else {
    //         return false;
    //       }
    //     })
    // } else { 
    //     filteredTargets = Fav
    // }

    return (
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
            {newFliterWithSearch.map((item: ICatalogue) => (
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
    );
  };

  return <div className={Styles.Catalogue}>
    <GetCatalogue/>
  </div>;
};

export default Catalogue;
