import styles from './style.module.css'
import { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
//import { loadAnimals } from '../../redux/actions'
import {useHistory} from 'react-router-dom'
import AnimalsTable from '../../components/AnimalsTable'
import { fetchAnimals, selectAllAnimals } from '../../redux-toolkit/animals/animalsSlice'

export const convertDate = (date) =>{
  const newDate = date.split("-")
  return `${newDate[2]}/${newDate[1]}/${newDate[0]}`
}

export default function App() {
  //Redux Toolkit
  const dispatch = useDispatch()
  const history = useHistory()
  const animals = useSelector(selectAllAnimals)
  const status = useSelector(state=>state.animals.status)

  useEffect(() =>{
    dispatch(fetchAnimals())
  },[dispatch])
  //Redux Thunk
/*
  let dispatch = useDispatch()
  let history = useHistory()

  const {animals} = useSelector(state => state.data)
  useEffect(() =>{
    dispatch(loadAnimals())
  },[dispatch])
*/
  return (
    <div className={styles.container}>
      <button className={styles.btnNew} onClick={() => {history.push("/animal/novo")}} data-testid="new-animal-btn">Novo animal</button>

      <AnimalsTable animals={animals}/>
      {status==="loading" ? <p>Carregando animais...</p> : null}
      {status==="failed" ? <p>Erro ao carregar a lista</p> : null}
    </div>
  );
}
