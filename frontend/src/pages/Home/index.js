import styles from './style.module.css'
import { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAnimal, loadAnimals } from '../../redux/actions'
import {useHistory} from 'react-router-dom'

export default function App() {

  let dispatch = useDispatch()
  let history = useHistory()

  const {animals} = useSelector(state => state.data)
  useEffect(() =>{
    dispatch(loadAnimals())
  },[dispatch])

  const handleDeleteAnimal = (id) =>{
    if(window.confirm("Você deseja mesmo deletar esse usuário ?")){
      dispatch(deleteAnimal(id))
    }
  }

  const convertDate = (date) =>{
    const newDate = date.split("-")
    return `${newDate[2]}/${newDate[1]}/${newDate[0]}`
  }

  return (
    <div className={styles.container}>
      <button className={styles.btnNew} onClick={() => {history.push("/animal/novo")}}>Novo animal</button>

      <table className={styles.table} cellSpacing="0">
        <thead>
          <th>Data de nascimento</th>
          <th>Nome</th>
          <th>Tipo</th>
          <th>Peso</th>
          <th>Alterar</th>
          <th>Excluir</th>
        </thead>
        <tbody>
          { animals &&
            animals.map((animal, idx) =>{
              return(<tr key={animal.id}>
                <td>{convertDate(animal.date)}</td>
                <td>{animal.name}</td>
                <td>{animal.type}</td>
                <td>{animal.weight} Kg</td>
                <td><button onClick={() =>{history.push(`/animal/${animal.id}/editar`)}}>Alterar</button></td>
                <td><button onClick={() =>{handleDeleteAnimal(animal.id)}}>Excluir</button></td>
              </tr>)
            })
          }
        </tbody>
      </table>
        
      </div>
  );
}
