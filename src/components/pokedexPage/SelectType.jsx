import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import './styles/SelectType.css'


const SelectType = ({ setSelectValue, setInputValue, selectValue, inputSearch, setCurrentPage }) => {

const urlType = "https://pokeapi.co/api/v2/type/"
 const [pokeTypes, getAllTypes] = useFetch( urlType )


 useEffect(() => {
    getAllTypes()
 }, []);

 const handleChange = (e) => {
    setSelectValue(e.target.value)
    setInputValue('')
    inputSearch.current.value = ''
    setCurrentPage(1)
 }

  return (
    <select className="poke__select" value={selectValue} onChange={handleChange}>
        <option value="allPokemons">All Pokemons</option>
        {
            pokeTypes?.results.map( type => (
                <option key={type.url} value={type.url}>{type.name}</option>
            ))
        }
    </select>
  )
}

export default SelectType