import { Switch, Route } from "react-router";
import Home from './Home'
import CreateAnimal from './Create'

export default function App(){
    return(
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/cadastrar" component={CreateAnimal} />
        </Switch>
    )
}