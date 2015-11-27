import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute } from "react-router";

import App from "./App";
import Start from "./screens/Start";
import NotFound from "./screens/NotFound";


const router = (
	<Router>
		<Route path="/" component={App}>
			<IndexRoute component={Start}/>
			<Route path="*" component={NotFound}/>
		</Route>
	</Router>
);


ReactDOM.render(router, document.getElementById("app"));
