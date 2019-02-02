import { firebase } from '../firebase/'

const ref = firebaseDb.ref('todo');

// subscribe
function loadTodos() {
  return dispatch => {
    ref.off()
    ref.on('value',
      (snapshot) => {dispatch(loadTodosSuccess))},
      (error) => {dispatch(loadTodoError(error))}
    )
  }
}

function loadTodosSuccess(snapshot) {
  return {
    type: 'TODOS_RECEIVE_DATA',
    data: snapshot.val()
  }
}

function loadTodoError(error) {
  return {
    type: 'TODOS_RECEIVE_ERROR',
    message: error.message
  }
}


