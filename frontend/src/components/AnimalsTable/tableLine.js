import {useHistory} from 'react-router-dom'

export const convertDate = (date) =>{
    const newDate = date.split("-")
    return `${newDate[2]}/${newDate[1]}/${newDate[0]}`
}

export default function TableLine({animal, handleDelete}){
  let history = useHistory()

    if(animal && animal.id){
      return(<tr key={animal.id} data-testid="table-line">
        <td>{convertDate(animal.date)}</td>
        <td>{animal.name}</td>
        <td>{animal.type}</td>
        <td>{animal.weight} Kg</td>
        <td><button onClick={() =>{history.push(`/animal/${animal.id}/editar`)}}>Alterar</button></td>
        <td><button onClick={() =>{handleDelete(animal.id)}}>Excluir</button></td>
      </tr>)
    }
    else{
      return <tr><td>Não foi possível exibir o projeto</td></tr>
    }
}