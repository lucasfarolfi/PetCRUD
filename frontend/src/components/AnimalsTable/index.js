import styles from './style.module.css'
import TableLine from './tableLine'
import { useDispatch } from 'react-redux'
//import { deleteAnimal } from '../../redux/actions'
import { deleteAnimal } from '../../redux-toolkit/animals/animalsSlice'

export default function AnimalsTable({animals}){
  let dispatch = useDispatch()

  const handleDeleteAnimal = (id) =>{
    if(window.confirm("Você deseja mesmo deletar esse usuário ?")){
      dispatch(deleteAnimal(id))
    }
  }
  
  if(animals && animals.length > 0){
    return (
      <table className={styles.table} cellSpacing="0" data-testid="animals-table">
      <thead>
        <tr>
          <th>Data de nascimento</th>
          <th>Nome</th>
          <th>Tipo</th>
          <th>Peso</th>
          <th>Alterar</th>
          <th>Excluir</th>
        </tr>
      </thead>
      
      <tbody>
        {
          animals.map((animal, idx) =>{
            return <TableLine key={animal.id} animal={animal} handleDelete={handleDeleteAnimal}/>
          })
        }
      </tbody>
    </table>
    )
  }
  else{
    return <div data-testid="erro-tabela">Não há animais a serem exibidos</div>
  }
  
}