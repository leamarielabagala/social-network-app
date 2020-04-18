import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon } from 'semantic-ui-react';

import { getRandomNumber } from '../utils';

const UsersList = (props) => {

  const renderUser = (user) => (
    <Card as={Link} key={`user-${user.id}-${getRandomNumber()}`} to={`/users/${user.id}/posts`}>
      <Card.Content>
        <Card.Header>{ user.name }</Card.Header>
        <Card.Meta>
          <Icon name="briefcase" size="small" />&nbsp;
          { user.company.name }
        </Card.Meta>
      </Card.Content>
    </Card>
  );

  return (
    <div className="UsersList">
      <h2>Users</h2>
      { props.users.map(renderUser) }
    </div>
  );
}

export default UsersList;
