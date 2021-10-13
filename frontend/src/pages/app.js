import { Switch, Route } from "react-router";
import Home from './Home'
import NewAnimal from './Create'
import UpdateAnimal from "./Update";

export default function App(){
    return(
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/animal/novo" component={NewAnimal} />
            <Route exact path="/animal/:id/editar" component={UpdateAnimal} />
        </Switch>
    )
}