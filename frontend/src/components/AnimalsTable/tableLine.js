import {useHistory} from 'react-router-dom'

export const convertDate = (date) =>{
    const newDate = date.split("-")
    return `${newDate[2]}/${newDate[1]}/${newDate[0]}`
}

export default function TableLine({id, date, name, type, weight, handleDelete}){
  let history = useHistory()

    if(id && date && name && type && weight){
      return(<tr key={id} data-testid="table-line">
        <td>{convertDate(date)}</td>
        <td>{name}</td>
        <td>{type}</td>
        <td>{weight} Kg</td>
        <td><button onClick={() =>{history.push(`/animal/${id}/editar`)}}>Alterar</button></td>
        <td><button onClick={() =>{handleDelete(id)}}>Excluir</button></td>
      </tr>)
    }
    else{
      return <tr><td>Não foi possível exibir o projeto</td></tr>
    }
}