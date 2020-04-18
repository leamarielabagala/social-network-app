import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Button, List } from 'semantic-ui-react';
import { fetchUser, fetchPost, fetchComments } from '../actions';

class ViewPost extends React.Component {
  
  componentDidMount() {
    if (!this.props.post) {
      this.props.fetchPost(this.props.postId);
    }
    if (!this.props.user) {
      this.props.fetchUser(this.props.userId);
    }
    this.props.fetchComments(this.props.postId);
  }

  render() {
    const { post, user, comments } = this.props;
    if (!post || !user) return null;
    return (
      <div className="PostList">
        <h2>{ user.name }'s Post</h2>
        <Card fluid key={`post-${post.id}`}>
          <Card.Content>
            <Card.Header>
              {post.title}
            </Card.Header><br/>
            <Card.Meta>Posted by {user.name}</Card.Meta>
          </Card.Content>
          <Card.Content>
            <Card.Description>
              { post.body }
            </Card.Description>
          </Card.Content>
          <Card.Content>
            <h4>Comments</h4>
            <List>
              { comments.map((c, i) => (
                <List.Item key={`comment-${i}`}>
                  <Card.Header>{ c.name }</Card.Header>
                  <Card.Meta>{ c.email }</Card.Meta>
                  <Card.Description>{ c.body }</Card.Description>
                  <br/>
                </List.Item>
                )) }
            </List>
          </Card.Content>
          <Card.Content extra>
            <Button fluid inverted color="red" as={Link} to={`/users/${post.userId}/posts`}>
              Back to { user.name }'s' Posts
            </Button>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const userId = Number(ownProps.match.params.userId);
  const postId = Number(ownProps.match.params.postId);
  const user = state.users.find(u => u.id === userId);
  const post = state.posts.find(p => p.id === postId);
  return { post, postId, user, userId, comments: state.comments };
};

export default connect(
  mapStateToProps,
  { fetchPost, fetchUser, fetchComments },
)(ViewPost);