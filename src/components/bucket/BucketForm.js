import React from 'react';

export const BucketForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <input
        className="BucketInput"
        type="text"
        value={props.currentBucket}
        onChange={props.handleInputChange}
      />
    </form>
  )
}

BucketForm.propTypes = {
  currentBucket: React.PropTypes.string.isRequired,
  handleInputChange: React.PropTypes.func.isRequired,
  handleSubmit: React.PropTypes.func.isRequired
}
