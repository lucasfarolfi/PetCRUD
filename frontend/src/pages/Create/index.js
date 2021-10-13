import { useState } from "react"

export default function Create(){
    const [nameCreate, setNameCreate] = useState('')
  const [typeCreate, setTypeCreate] = useState('')
  const [weightCreate, setWeightCreate] = useState('')
  const [birthdateCreate, setBirthdateCreate] = useState('')
  const [createAnimal, setCreateAnimal] = useState({})
  const handleChangeNameCreate = (e) =>{
    console.log(nameCreate)
    setNameCreate(e.target.value)
  }
  const handleChangeTypeCreate = (e) =>{
    setTypeCreate(e.target.value)
  }
  const handleChangeWeightCreate = (e) =>{
    setWeightCreate(e.target.value)
  }
  const handleChangeBirthCreate = (e) =>{
    setBirthdateCreate(e.target.value)
  }

  //Submit com o redux
  const handleSubmitCreate = (e) =>{
    e.preventDefault()
    setCreateAnimal({name: nameCreate, 
      type: typeCreate, 
      weight: weightCreate, 
      birthdate: birthdateCreate
    })
    console.log(createAnimal)
  }

  return(
      <>
      <div className={styles.container}>

        <form className={styles.form} onSubmit={handleSubmitCreate}>
          <fieldset className={styles.fieldset}>
          <legend>Animal</legend>
          
            <label><span>Nome</span> <input type="text" placeholder="Nome do animal" value={nameCreate} onChange={handleChangeNameCreate}/></label>
            <label><span>Tipo</span> <select value={typeCreate} onChange={handleChangeTypeCreate}>
                <option>Cachorro</option>
                <option>Gato</option>
              </select>
            </label>
            <label><span>Peso</span> <input type="number" placeholder="Ex: 20.5" value={weightCreate} onChange={handleChangeWeightCreate}/></label>
            <label><span>Data de nascimento</span> <input type="date" value={birthdateCreate} onChange={handleChangeBirthCreate}/></label>
          </fieldset>

          <div className={styles.btnSection}>
            <button className={styles.btnCancel}>Cancelar</button>
            <button type="submit" className={styles.btnSave}>Criar</button>
          </div>
        </form>
      </div>
      </>
  )
}