import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";
import "./styles/PokeIdPage.css";
import { keyframes, styled } from "styled-components";

const PokeIdPage = () => {
  const { id } = useParams();
  const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;

  const [pokemon, getPokemon] = useFetch(url);

  useEffect(() => {
    getPokemon();
  }, [id]);

  console.log(pokemon);

  const infoType = pokemon?.types[0].type.name;

  const spin = keyframes`
    0% { width: 0; }
    100% { width: ${pokemon?.stats.base_stat}; }
  `;
  const StylesDiv = styled.div`
    animation: ${spin} 2s both;
  `;

  const history = useNavigate();

  const handlePlus = () => {
    const newId = parseInt(id) + 1;
    history(`/pokedex/${newId}`);
  };

  const handleMinus = () => {
    const newId = parseInt(id) - 1;
    if (newId >= 1) {
      history(`/pokedex/${newId}`);
    }
  };

  return (
    <div className="wrapper__pokeinfo">
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
      <article className="body__poke">
        <header className="header__poke-body">
          <Link to='/pokedex'>
          <span className="header__return"><i
                className={`bx bx-chevron-left`}
              ></i>Pokedex</span>
              </Link>
          <div className={`image__poke ${infoType}-gradient`}>
            <img
              src={pokemon?.sprites.other["official-artwork"].front_default}
              alt=""
            />
          </div>
          <div className="navigate__id">
            <button className="poke__btn left-button" onClick={handleMinus}>
              <i
                className={`bx bx-chevron-left poke__icon ${infoType}-color`}
              ></i>
            </button>
            <span className={`id__poke ${infoType}-color`}>#{id}</span>
            <button className="poke__btn right-button" onClick={handlePlus}>
              <i
                className={`bx bx-chevron-right poke__icon ${infoType}-color`}
              ></i>
            </button>
          </div>
        </header>
        <article className="contain__info">
          <section className="section__description">
            <h2 className={`title__poke ${infoType}-color`}>{pokemon?.name}</h2>
            <ul className="list__poke">
              <li className="item__poke">
                <span className="label__poke">peso</span>
                <span className="text__poke">
                  {Math.ceil(pokemon?.weight * 0.1)}kg
                </span>
              </li>
              <li className="item__poke">
                <span className="label__poke">altura</span>
                <span className="text__poke">
                  {Math.ceil(pokemon?.height * 10)}cm
                </span>
              </li>
            </ul>
            <div className="info__poke">
              <div className="type__info">
                <h2 className="title__info">tipo</h2>
                <ul className="list__info">
                  {pokemon?.types.map((type) => (
                    <li
                      className={`item__info ${type?.type.name}-gradient`}
                      key={type.type.url}
                    >
                      <span>{type.type.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="abilities__info">
                <h2 className="title__info">habilidades</h2>
                <ul className="list__info">
                  {pokemon?.abilities.map((ability) => (
                    <li className="item__info" key={ability.ability.url}>
                      {ability.ability.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
          <div className="info__stats">
            <h2 className="title__stats">Stats</h2>
            <ul className="list__stats">
              {pokemon?.stats.map((stat) => (
                <div key={stat.stat.url}>
                  <li className="item__stats">
                    <span className="label__stats">{stat.stat.name}:</span>
                    <span className="text__stats">{stat.base_stat} / 200</span>
                  </li>
                  <div className="bar__stats">
                    <StylesDiv
                      className={`progress__stats ${infoType}-gradient`}
                      style={{
                        width: `${
                          stat.base_stat < 200
                            ? (stat.base_stat / 200) * 100
                            : 100
                        }%`,
                      }}
                    ></StylesDiv>
                  </div>
                </div>
              ))}
            </ul>
          </div>
          <section className="move__section">
            <h2 className="move__title">Movements</h2>
            <ul className="move__list">
              {pokemon?.moves.map((move) => (
                <li className="move__item" 
                 key={move.move.url}>
                  {move.move.name}
                </li>
              ))}
            </ul>
          </section>
        </article>
      </article>
    </div>
  );
};

export default PokeIdPage;
