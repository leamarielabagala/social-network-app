import React from 'react';
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchUsers } from '../actions';
import UsersList from './UsersList';
import PostList from './PostList';
import ViewPost from './ViewPost';
import CreatePost from './CreatePost';

import './styles.css';

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    return (
      <div className="App">
        <UsersList users={this.props.users} />
        <main>
          <Switch>
            <Route exact path="/" component={PostList}/>
            <Route exact path="/users/:userId/posts" component={PostList}/>
            <Route path="/users/:userId/posts/new" component={CreatePost}/>
            <Route path="/users/:userId/posts/:postId" component={ViewPost}/>
          </Switch>
        </main>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return { users: state.users };
};

export default connect(
  mapStateToProps,
  { fetchUsers }
)(App);
