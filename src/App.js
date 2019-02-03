import React, { Component, Fragment } from 'react';
import firebase from 'firebase';
import 'firebase/firestore';
import { firestore } from './plugins/firebase';
import Rebppt from 'material-ui/Reboot';
import List from 'material-ui/List';
import ListItem from 'material-ui/List/ListItem';
import ListItemText from 'material-ui/List/ListItemText';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Checkbox from 'material-ui/Checkbox';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      isLogin: false,
      inputValue: '',
      tasks: []
    };
    this.getTasksData = this.geetTasksData.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.getText = this.getText.bind(this);
    this.addTask = this.addTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
  }

  componentDidMount() {
    firebase.auth().onauthStateChanged(user => {
      if (user) {
        console.log('is login');
        this.setState({
          userId: user.uid,
          isLogin: true
        });
        this.getTasksData();
      } else {
        console.log('is not login');
      }
    });
  };

  getTasksData() {
    firestore.collection('tasks')
      .where('user_id', '==', this.state.userId)
      .orderBy('created_at')
      .get()
      .then(snapShot => {
        let tasks = [];
        snapShot.forEach(doc => {
          tasks.push({
            id: doc.id,
            text: doc.data().text
          });
        });
        this.setState({ tasks: tasks });
      });
  }

  login() {
    firebase.auth().signInAnonymously().then(e => {
      console.log(e);
      this.setState({
        isLogin: true,
        userId: firebase.auth().currentUse.uid
      });
    }).catch(error => {
      console.log(error.code);
      console.log(error.message);
    });
  };

  logout() {
    if (firebase.auth().currentUser == null) {
      return
    }

    firebase.auth().currentUser.delete()
      .then(() => {
        this.setState({
          isLogin: false,
          userId: '',
          inputValue: '',
          tasks: []
        });
      });
  };

  getText(e) {
    this.setState({
      inputValue: e.target.value
    });
  };

  addTask() {
      const inputValue = this.state.inputValue;
      if (inputValue === '') {
        return
      }
      firestore.collection('tasks').add({
        text: inputValue,
        created_at: new Date(),
        user_id: this.state.userId
      }).then(() => {
        this.getTasksData();
      });
      this.setState({
        inputValue: ''
      });
    };

    

  render() {
    return (
       <div>

       </div>
    );
  }
}

export default App;
