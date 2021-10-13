import { useEffect, useState } from "react"
import styles from './style.module.css'
import { useHistory, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { updateAnimal, getOneAnimal } from '../../redux/actions'

export default function UpdateAnimal (){
  const {id: animalIdParam} = useParams();
  let history = useHistory()
  let dispatch = useDispatch()
  let {animal} = useSelector(state => state.data)

  const [newAnimal, setNewAnimal] = useState({})

  useEffect(() =>{
    dispatch(getOneAnimal(animalIdParam))
  },[dispatch, animalIdParam])
  
  useEffect(() =>{
    setNewAnimal({...animal})
  }, [animal])

  const {name, type, weight, date} = newAnimal

  const handleInputChange = (e) =>{
    let {name, value} = e.target
    setNewAnimal({ ...newAnimal, [name]: value})
  }

  const [errorForm, setErrorForm] = useState(null)

  const handleSubmitCreate = (e) =>{
    e.preventDefault()
    
    if(!name || !type || !weight || !date){
      setErrorForm("O formulário deve ser preenchido corretamente")
    }
    else{
      dispatch(updateAnimal(animalIdParam, newAnimal))
      history.push("/")
    }
  }

  return(
    <>
      <div className={styles.container}>

        <form className={styles.form} onSubmit={handleSubmitCreate}>
          <fieldset className={styles.fieldset}>
            <legend>Animal</legend>
            
            <label><span>Nome</span> <input type="text" placeholder="Nome do animal" name="name" value={name || ""} onChange={handleInputChange}/></label>
            <label><span>Tipo</span> <select name="type" value={type || ""} onChange={handleInputChange}>
              <option value="">Escolha uma opção</option>
              <option value="Cachorro">Cachorro</option>
              <option value="Gato">Gato</option>
            </select>
            </label>
            <label><span>Peso</span> <input type="number" placeholder="Ex: 20.5" name="weight" value={weight || ""} onChange={handleInputChange}/></label>
            <label><span>Data de nascimento</span> <input type="date" name="date" value={date || ""} onChange={handleInputChange}/></label>
            {errorForm ? <div className={styles.errorMsg}>{errorForm}</div> : null}
          </fieldset>

          <div className={styles.btnSection}>
            <button className={styles.btnCancel} onClick={()=>{history.push("/")}}>Cancelar</button>
            <button type="submit" className={styles.btnSave}>Salvar</button>
          </div>
        </form>
      </div>
      
    </>
  )
}