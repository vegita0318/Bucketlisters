import React, { Component } from 'react';
import './App.css';
import { BucketForm, BucketList, Footer } from './components/bucket';
import { addBucket, generateId, findById, toggleBucket, updateBucket, removeBucket, filterBucket } from './lib/bucketHelpers';
import { pipe, partial } from './lib/utils';
import { loadBucket, createBucket, saveBucket, deleteBucket } from './lib/bucketService';

class App extends Component {
  constructor() {
    super();
    this.state = {
      bucket: [],
      currentBucket: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmptySubmit = this.handleEmptySubmit.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.showTempMessage = this.showTempMessage.bind(this);
  }

  static contextTypes = {
    route: React.PropTypes.string
  }

  componentDidMount() {
    loadBucket()
      .then(bucket => this.setState({bucket: bucket}))
  }

  handleInputChange(e) {
    this.setState({
      currentBucket: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const newId = generateId();
    const newBucket = { id: newId, name: this.state.currentBucket, isComplete: false };
    const updatedBucket = addBucket(this.state.bucket, newBucket);
    this.setState({
      bucket: updatedBucket,
      currentBucket: '',
      errorMessage: ''
    });
    createBucket(newBucket)
      .then(() => this.showTempMessage('Bucket added'));
  }

  showTempMessage(msg) {
    this.setState({
      message: msg
    });
    setTimeout(() => this.setState({message: ''}), 1000);
  }

  handleEmptySubmit(e) {
    e.preventDefault();
    this.setState({
      errorMessage: 'Please enter a valid bucket'
    });
  }

  handleToggle(id) {
    const getToggleBucket = pipe(findById, toggleBucket);
    const updated = getToggleBucket(id, this.state.bucket);
    const getUpdatedBucket = partial(updateBucket, this.state.bucket);
    const updatedBucket = getUpdatedBucket(updated);
    this.setState({
      bucket: updatedBucket
    });
    saveBucket(updated)
      .then(() => this.showTempMessage('Bucket updated in the server'));
  }

  handleRemove(id, e) {
    e.preventDefault();
    const updatedBucket = removeBucket(this.state.bucket, id);
    this.setState({
      bucket: updatedBucket
    });
    deleteBucket(id)
      .then(() => this.showTempMessage('Bucket removed from server'));
  }

  render() {
    const submitHandler = this.state.currentBucket ? this.handleSubmit : this.handleEmptySubmit;
    const displayBucket = filterBucket(this.state.bucket, this.context.route);

    return (
      <div className="App">
        <h1>Bucket List</h1>
        {this.state.errorMessage && <p className="error">{this.state.errorMessage}</p>}
        {this.state.message && <p className="success">{this.state.message}</p>}
        <BucketForm
          handleInputChange={this.handleInputChange}
          currentTodo={this.state.currentBucket}
          handleSubmit={submitHandler}
        />
      <BucketList
        handleToggle={this.handleToggle}
        bucket={displayBucket}
        handleRemove={this.handleRemove}
      />
      <Footer />
      </div>
    );
  }
}

export default App;
