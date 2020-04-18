import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CreatePostForm from './CreatePostForm';
import { createPost } from '../actions';

class CreatePost extends React.Component {

  handleFormSubmit = async (value) => {
    const { user } = this.props;
    await this.props.createPost({ ...value, userId: user.id });
    this.props.history.push(`/users/${user.id}/posts`);
  }

  render() {
    const { user } = this.props;
    if (!user) return null;
    return (
      <div className="PostList">
        <h2>Create Post for { user.name }</h2>
        <CreatePostForm onSubmit={this.handleFormSubmit} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const userId = Number(ownProps.match.params.userId);
  return { user: state.users.find(u => u.id === userId) };
};

export default connect(
  mapStateToProps,
  { createPost }
)(withRouter(CreatePost));