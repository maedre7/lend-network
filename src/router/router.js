import React from 'react';
import {HashRouter, Route, Switch, withRouter} from 'react-router-dom';
import Intro from '../components/intro';
import SideMenu from '../components/sideMenu';
import View from '../components/view';
import Form from '../components/form';
import Dashboard from '../components/dashboard';
import Faucet from '../components/faucet';
import Wallet from '../components/wallet';
import Modal from '../components/result';

const renderHeader = (path) => {
	switch(path){
		case '/offers':
			return 'Latest Loan Offers';
		case '/requests':
			return 'Latest Loan Requests';
		case '/create_offer':
			return 'New Loan Offer';
		case '/create_request':
			return 'New Loan Request';
		case '/dashboard/offers':
			return 'Dashboard';
		case '/dashboard/requests':
			return 'Dashboard';	
		case '/wallet':
			return 'Wallet';
		case '/faucet':
			return 'Faucet';				
	}
}

const Layout = (props) => {
	const path = props.location.pathname;
	return(
		<div id="main_container">
			{path !== '/' && <SideMenu />}
			<div>
				{path !== '/' && <div id="global_header_container">
					<span id="global_header_text">{renderHeader(path)}</span>
				</div>}
				{path === '/' ? <Route path="/" component={Intro} exact={true} /> :
					<div id="sub_container">
						<Modal />
						<Switch>
				      <Route path="/offers" component={View} />
				      <Route path="/requests" render={(props) => <View mode={true} {...props} />} />
				      <Route path="/create_request" render={() => <Form mode={true} key={"request"} />} />
				      <Route path="/create_offer" render={() => <Form key={"offer"} />} />
				      <Route path="/faucet" component={Faucet} />
				      <Route path="/dashboard/:mode" render={(props) => <Dashboard key={props.match.params.mode} {...props} />} />
				      <Route path="/wallet" component={Wallet} />
				    </Switch>
		    	</div>
				}
			</div>
		</div>
	);
}

const App = withRouter(Layout);

const AppRouter = () => (
  <HashRouter>
  	<App />
  </HashRouter>
);

export default AppRouter;