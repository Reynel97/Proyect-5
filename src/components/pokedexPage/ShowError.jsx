
import './styles/ShowError.css'

const ShowError = () => {
  return (
    <div className="error">
      <i className='bx bx-error'></i>
        <h2 className="error_title">  
          El Parametro de la consulta no es correcta!
          </h2>
    </div>
  )
}

export default ShowError