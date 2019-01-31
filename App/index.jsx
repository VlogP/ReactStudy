import React from 'react';
import ReactDOM from 'react-dom';
import{Provider,connect}from 'react-redux';
import {createStore, applyMiddleware,compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import {put, call,takeEvery} from 'redux-saga/effects';


// Reducer
const initialState = {
  Name:'',
  Password:'',
  error: true,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUESTED_DOG':
      return {
        url: '',
        loading: true,
        error: false,
      };
    case 'REQUESTED_DOG_SUCCEEDED':
      return {
        Name: action.Name,
        error: action.error
      };
    case 'REQUESTED_DOG_FAILED':
      return {
        error: true,
      };
    default:
      return state;
  }
};

// Action Creators
const requestDog = () => {
  return { type: 'REQUESTED_DOG' }
};

const requestDogSuccess = (data) => {
	console.log(data);
  return { type: 'REQUESTED_DOG_SUCCEEDED', error: data}
};

const requestDogError = () => {
  return { type: 'REQUESTED_DOG_FAILED' }
};


function validateAge(age){
  var myRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*[!-+.@#$%^&*]).{8,15}$/;
  var myArray = myRe.test(age);
    return myArray;
}
function validateName(name){
    return name.name.length<2;
}

// Sagas
function* watchFetchDog() {

  yield takeEvery('FETCHED_DOG', PasswordAsync);

}

function* PasswordAsync(e) {
  try {
    
    const data = yield call(validateName,{name:e.Name});
    
    yield put(requestDogSuccess(data));
  } catch (error) {
	  console.log(11);
    yield put(requestDogError());
  }
}

// Component
class App extends React.Component {
 
  render () {
    return (
      <form >
      <p>
          <label>Имя:</label><br />
          <input type="text" 
              onChange={this.props.fetchDog} style={this.props.error ? {borderColor:"red"}:{borderColor:"green"}} />
      </p>
      

      <input type="submit" value="Отправить" />
  </form>
    )
  }
}

// Store




const mapStateToProps = state => {
  return {
    url: state.url,
    loading: state.loading,
    error:state.error
  };
};

const mapDispatchToProps =dispatch =>{
  return{
  fetchDog: (Name) => dispatch({ type: "FETCHED_DOG",Name:Name.target.value })
  
  };
};


export default App=connect(mapStateToProps, mapDispatchToProps)(App); 





 const sagaMiddleware = createSagaMiddleware();

 const store = createStore(
   reducer,
   applyMiddleware(sagaMiddleware)
 );
 
 sagaMiddleware.run(watchFetchDog);

// Container component
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('content')
);