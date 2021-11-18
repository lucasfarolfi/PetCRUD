import styles from './style.module.css'
import TableLine from './tableLine'

export default function AnimalsTable({animals}){

    return (
        <table className={styles.table} cellSpacing="0" data-testid="animals-table">
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
              return <TableLine id={animal.id} date={animal.date} name={animal.name} type={animal.type} weight={animal.weight}/>
            })
          }
        </tbody>
      </table>
    )
}