import { useSelector } from "react-redux";
import useFetch from "../hooks/useFetch";
import { useEffect, useRef, useState } from "react";
import PokeCard from "../components/pokedexPage/PokeCard";
import SelectType from "../components/pokedexPage/SelectType";
import "./styles/PokedexPage.css";
import Pagination from "../components/pokedexPage/Pagination";
import ShowError from "../components/pokedexPage/ShowError";
import { Link } from "react-router-dom";

const PokedexPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState("allPokemons");
  const [currentPage, setCurrentPage] = useState(1);

  const inputSearch = useRef();

  const trainer = useSelector((reducer) => reducer.trainer);

  const perPage = 20;
  // const lastIndex = currentPage * perPage;
  // const firstIndex = lastIndex - perPage;
  const firstIndex = (currentPage - 1)* perPage

  const url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=1281`;
  const [pokemons, getAllPokemons, getPokemonsByType, showError] = useFetch(url);

  useEffect(() => {
    if (selectValue === "allPokemons") {
      getAllPokemons();
    } else {
      getPokemonsByType(selectValue);
    }
  }, [selectValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setInputValue(inputSearch.current.value.trim().toLowerCase());
    setSelectValue("allPokemons");
    setCurrentPage(1);
  };

  const cbFilter = (poke) => poke.name.includes(inputValue);
  const filtered = pokemons?.results.filter(cbFilter)


  const totalCards = pokemons?.results.filter(cbFilter)?.length;
  const quantyPage = Math.ceil(totalCards / perPage);



  return (
    <div className="poke__wrapper">
      <header className="poke__header">
        <div className="header-red">
          <div className="header-black">
          <Link to='/'>
            <img src="pokedex.png" alt="" />
            </Link>
          </div>
        </div>
        <div className="header-circle">
          <div className="circle"></div>
        </div>
      </header>
      <div className="poke__main">
        <p className="poke__text">
          <span className="poke__label">Welcome {trainer}</span>, here you can
          find your favorite pokemon.
        </p>
        <div className="poke__search">
          <form className="poke__form" onSubmit={handleSubmit}>
            <input
              ref={inputSearch}
              type="text"
              placeholder="Buscar Pokemon..."
            />
            <button>search</button>
          </form>
          <SelectType
            setInputValue={setInputValue}
            setSelectValue={setSelectValue}
            selectValue={selectValue}
            inputSearch={inputSearch}
            setCurrentPage={setCurrentPage}
          />
        </div>
        {
         (quantyPage === 0 || showError
          ?
          (<ShowError/>)
          :
        ( <>
          <Pagination
            quantyPage={quantyPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        <div className="contain__cards">
          {filtered
            ?.map((poke) => <PokeCard url={poke.url} key={poke.url} />).slice(firstIndex, firstIndex + perPage)
            }
        </div>
        <Pagination
          quantyPage={quantyPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </>
      ))
      }
      </div>
    </div>
  );
};

export default PokedexPage;
