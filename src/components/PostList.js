import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Button } from 'semantic-ui-react';

import { fetchPosts, deletePost, fetchUser } from '../actions';
import { getRandomNumber } from '../utils';

import './styles.css';

class PostList extends React.Component {

  componentDidMount() {
    if (!this.props.user && this.props.userId) {
      this.props.fetchUser(this.props.userId);
    }
    this.props.fetchPosts(this.props.userId);
  }

  componentDidUpdate(prevProps) {
    console.log('props', prevProps.userId, this.props.userId);
    if (prevProps.userId !== this.props.userId && !isNaN(this.props.userId)) {
      this.props.fetchPosts(this.props.userId);
    }
  }

  renderPost = (post) => (
    <Card key={`post-${post.id}-${getRandomNumber()}`}>
      <Card.Content>
        <Card.Header>{ post.title }</Card.Header>
        <Card.Description>
          { post.body }
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button inverted color="green" as={Link} to={`/users/${post.userId}/posts/${post.id}`}>
            View
          </Button>
          <Button inverted color="red" as="a" onClick={() => this.props.deletePost(post.id)}>
            Delete
          </Button>
        </div>
      </Card.Content>
    </Card>
  )

  render() {
    const { user } = this.props;
    return (
      <div className="PostList">
        <h2>{ user ? `${user.name}'s #1 Posts` : 'All Posts' }</h2>
        { user &&
          <Button fluid inverted as={Link} color="green" to={`/users/${user.id}/posts/new`}>
            Create New Post
          </Button> }
        { this.props.posts.map(this.renderPost) }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const userId = Number(ownProps.match.params.userId);
  const user = state.users.find(u => u.id === userId);
  const posts = userId ? state.posts.filter(p => p.userId === userId) : state.posts;
  return { posts, user, userId };
};

export default connect(
  mapStateToProps,
  { fetchPosts, deletePost, fetchUser }
)(PostList);
