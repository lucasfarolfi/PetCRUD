import { useDispatch } from 'react-redux'
//import { deleteAnimal } from '../../redux/actions'
import {useHistory} from 'react-router-dom'
import { deleteAnimal } from '../../redux-toolkit/animals/animalsSlice'

export const convertDate = (date) =>{
    const newDate = date.split("-")
    return `${newDate[2]}/${newDate[1]}/${newDate[0]}`
}

export default function TableLine({id, date, name, type, weight}){

    let dispatch = useDispatch()
    let history = useHistory()

    const handleDeleteAnimal = (id) =>{
        if(window.confirm("Você deseja mesmo deletar esse usuário ?")){
          dispatch(deleteAnimal(id))
        }
    }

    return(<tr key={id} data-testid="table-line">
        <td>{convertDate(date)}</td>
        <td>{name}</td>
        <td>{type}</td>
        <td>{weight} Kg</td>
        <td><button onClick={() =>{history.push(`/animal/${id}/editar`)}}>Alterar</button></td>
        <td><button onClick={() =>{handleDeleteAnimal(id)}}>Excluir</button></td>
      </tr>)
}