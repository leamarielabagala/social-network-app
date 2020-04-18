import React from 'react';
import { Input, Button, Card } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';

const CreatePostForm = props => {
  const { handleSubmit, pristine, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <Card.Content>
          <label>Title</label>
          <div>
            <Field
              name="title"
              component={Input}
              type="text"
              placeholder="Title"
              fluid
            />
          </div>
          <br/>
          <label>Description</label>
          <div>
            <Field
              name="body"
              component={Input}
              type="text"
              placeholder="Description"
              fluid
            />
          </div>
        </Card.Content>
        <Card.Content extra>
          <Button fluid inverted color="green" type="submit" disabled={pristine || submitting}>
            { submitting ? 'Submitting...' : 'Submit' }
          </Button>
        </Card.Content>
      </Card>
    </form>
  );
};

export default reduxForm({
  form: 'newPost',
})(CreatePostForm);
