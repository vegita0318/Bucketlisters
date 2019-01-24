import React from 'react';
import { BucketItem } from './BucketItem';

export const BucketList = props => {
  return (
    <div>
      <ul>
        {props.bucket.map(bucket => <BucketItem handleToggle={props.handleToggle} key={bucket.id} {...bucket} handleRemove={props.handleRemove} />)}
      </ul>
    </div>
  )
}

BucketList.propTypes = {
  bucket: React.PropTypes.array.isRequired
}
