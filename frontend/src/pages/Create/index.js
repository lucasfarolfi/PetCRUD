import { useState } from "react"
import styles from './style.module.css'
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { addAnimal } from "../../redux/actions"
export default function NewAnimal (){

  let history = useHistory()
  let dispatch = useDispatch()

    const [newAnimal, setNewAnimal] = useState({
      name: '',
      type: '',
      weight: '',
      date: ''
    })

    const {name, type, weight, date} = newAnimal

    const handleInputChange = (e) =>{
      let {name, value} = e.target
      setNewAnimal({ ...newAnimal, [name]: value})
    }

    const [errorForm, setErrorForm] = useState(null)

    //Submit com o redux
    const handleSubmitCreate = (e) =>{
      e.preventDefault()
      
      if(!name || !type || !weight || !date){
        setErrorForm("O formulário deve ser preenchido corretamente")
      }
      else{
        dispatch(addAnimal(newAnimal))
        history.push("/")
        setErrorForm(null)
      }
    }

    return(
        <>
          <div className={styles.container}>

          <form className={styles.form} onSubmit={handleSubmitCreate}>
            <fieldset className={styles.fieldset}>
            <legend>Animal</legend>
            
              <label><span>Nome</span> <input type="text" placeholder="Nome do animal" name="name" value={name} onChange={handleInputChange}/></label>
              <label><span>Tipo</span> <select name="type" onChange={handleInputChange}>
                  <option value="">Escolha uma opção</option>
                  <option value="Cachorro">Cachorro</option>
                  <option value="Gato">Gato</option>
                  <option value="Hamster">Hamster</option>
                  <option value="Passarinho">Passarinho</option>
                  <option value="Papagaio">Papagaio</option>
                  <option value="Peixe">Peixe</option>
                </select>
              </label>
              <label><span>Peso</span> <input type="number" placeholder="Ex: 20.5" name="weight" value={weight} onChange={handleInputChange}/></label>
              <label><span>Data de nascimento</span> <input type="date" name="date" value={date} onChange={handleInputChange}/></label>
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