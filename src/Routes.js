import React from "react";
import { Route, Switch,Router  } from "react-router";

import index from "./components/index";
import contact from "./components/contact";
import about from "./components/about";
import blogsingle from "./components/blog-single"
import category from "./components/category";
import search from "./components/search";







class Routes extends React.Component {
    render() {
        return (
            <Switch>

                <Route exact path="/" component={index} />
                <Route exact path="/contact" component={contact} />
                <Route exact path="/about" component={about} />
                <Route exact path="/Blog-Single" component={blogsingle} />
                <Route  path="/category" component={category} />
				<Route  path="/search" component={search} />



                <Route
                    render={function () {
                        window.location.href="/";
                    }}
                />	      </Switch>


        );
    }
}

export default Routes;
