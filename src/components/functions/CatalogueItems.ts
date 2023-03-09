import FirstClothe from '../images/catalogueImages/FristClothe.png'
import SecondClothe from '../images/catalogueImages/SecondClothe.png'
import ThreeClothe from '../images/catalogueImages/ThreeClothe.png'
import FourClothe from '../images/catalogueImages/FourClothe.png'


import {ICatalogue} from '../Catalogue'

export const CatalogueItems: ICatalogue[] = [
  {
    id: 1,
    image: FirstClothe,
    price: "20.000",
    favorite: false,
    name:'Camisa Manga larga'
  },
  {
    image: SecondClothe,
    id: 2,
    price: "15.000",
    favorite: false,
    name:'Camisa'
  },
  {
    image: ThreeClothe,
    id: 3,
    price: "20.000",
    favorite: false,
    name:'Camisa Manga larga'
  },
  {
    image: FourClothe,
    id: 4,
    price: "15.000",
    favorite: false,
    name:'Esqueleto'
  }
];