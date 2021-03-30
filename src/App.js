import React from 'react';
import { BrowserRouter as Router,Route} from 'react-router-dom';
import ContactPagination from './ContactPagination';
import GoogleMap from './GoogleMap';

class App extends React.Component {
    render(){
        return(
            <Router >
                <div>
                    <Route exact path="/" component={ContactPagination} />
                    <Route path="/GoogleMap/" component={GoogleMap} />
                </div>
            </Router>
        )
    }
}
export default App;