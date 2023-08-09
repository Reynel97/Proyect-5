import { useRef } from "react"
import { useDispatch} from "react-redux"
import { setTrainerG } from "../store/slice/trainer.slice"
import { useNavigate } from "react-router-dom"
import './styles/HomePage.css'


const HomePage = () => {

const inputTrainer = useRef()

const dispatch = useDispatch()

const navigate = useNavigate()

 const handleSubmit= (e)=>{
    e.preventDefault()
    dispatch(setTrainerG(inputTrainer.current.value.trim()))
    navigate('/pokedex')
  }


  return (
    <>
    <div className="home__contain">
      <div className="image__content">
      <img className="home__image" src="pokedex.png" alt="" />
      </div>
      <div className="home__paragraph">
        <h2 className="home__title">hi trainer!</h2>
        <p className="home__text">to start with the app, give your name trainer 😀</p>
      </div>
      <form className='home__form' onSubmit={handleSubmit}>
        <input ref={inputTrainer} type="text" placeholder="Nombre..."/>
        <button className="btn-primary">start</button>
      </form>
    </div>
      <div className="home__footer">
        <div className="footer__red"></div>
        <div className="circle-max">
          <div className="circle-min"></div>
        </div>
      </div>
    </>
  )
}

export default HomePage