import React from 'react'

const Home = React.createClass({
  render () {
    let input;
    const {addTodo, searchTerm, handleSearchTermChange} = this.props;
    return (
        <div className="text-center">
          <input ref={(node) => input = node } type="text" name="todo" placeholder='Add an event...'/>
          <button className="btn btn-primary btn-sm" onClick={() => {
            addTodo(input.value);
            input.value = '';
          }} type="submit">add
          </button>
          <div>
            <input type="text"
                   onChange={handleSearchTermChange}
                    placeholder='search ...'/>
          </div>
        </div>
    )
  }
});

export default Home;