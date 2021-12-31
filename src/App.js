import './App.css';
import React, { Component } from 'react';
import { CardList } from './components/card-list/card.list.component'
import { SeachBox } from './components/search-box/seach-box.component';

class App extends Component {

  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: '',
    };
  }

  /*
   A good rule of thumb is this: Use arrow functions on any class methods 
   you define and aren't part of Reac*/
  onSearchChange = e => {
    this.setState({ searchField: e.target.value });
  }

  //setState causes the call of render
  render() {
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchField.toLowerCase()));

    return (
      <div className="App">
        <h1>Monsters Rolodex</h1>
        <SeachBox 
          placeholder='search monsters' 
          handleChange={this.onSearchChange} />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }

  //This is a lifecycle method
  //the comparison of fetch again jQuery.ajax:
  //   https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(users => this.setState({ monsters: users }));
  }
}



//default export and named export. 
//see: https://stackoverflow.com/questions/36426521/what-does-export-default-do-in-jsx
export default App;
