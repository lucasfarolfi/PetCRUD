import {useHistory} from 'react-router-dom'
import convertDate from '../../utils/convertDate'

export default function TableLine({animal, handleDelete}){
  let history = useHistory()

    if(animal && animal.id){
      return(<tr key={animal.id} data-testid="table-line">
        <td>{convertDate(animal.date)}</td>
        <td>{animal.name}</td>
        <td>{animal.type}</td>
        <td>{animal.weight} Kg</td>
        <td><button onClick={() =>{history.push(`/animal/${animal.id}/editar`)}}>Alterar</button></td>
        <td><button data-testid={`delete-button-${animal.id}`} onClick={() =>{handleDelete(animal.id)}}>Excluir</button></td>
      </tr>)
    }
    else{
      return <tr><td>Não foi possível exibir o projeto</td></tr>
    }
}