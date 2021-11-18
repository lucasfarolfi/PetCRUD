import styles from './style.module.css'
import { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadAnimals } from '../../redux/actions'
import {useHistory} from 'react-router-dom'
import AnimalsTable from '../../components/AnimalsTable'

export const convertDate = (date) =>{
  const newDate = date.split("-")
  return `${newDate[2]}/${newDate[1]}/${newDate[0]}`
}

export default function App() {

  let dispatch = useDispatch()
  let history = useHistory()

  const {animals} = useSelector(state => state.data)
  useEffect(() =>{
    dispatch(loadAnimals())
  },[dispatch])

  return (
    <div className={styles.container}>
      <button className={styles.btnNew} onClick={() => {history.push("/animal/novo")}} data-testid="new-animal-btn">Novo animal</button>

      {animals ? 
      <AnimalsTable animals={animals}/> 
      : <div data-testid="table">Nenhum animal encontrado na base de dados</div>}
      
    </div>
  );
}
