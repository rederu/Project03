import React from "react";
import { Switch, Route} from "react-router-dom";

//import the components
import Main from "./components/main";
import Item from "./components/item";
import AddItem from "./components/addItem";
import Login from "./components/login";
import Register from "./components/register";
import NoMatch from "./components/notFound";
const Routes = () => (
   
        <Switch>
            <Route exact path="/"/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/main" component={Main} />
            <Route exact path="/additem" component={AddItem} /> 
            <Route exact path="/item/:id" component={Item} />   
            <Route component={NoMatch} />
        </Switch>
       
) 

export default Routes;