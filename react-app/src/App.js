import React, {useState, useEffect} from 'react'
import './App.css';

function App() {
  const [funcShow, setFuncShow] = useState(true)
  const [classShow, setClassShow] = useState(true)
  return (
    <div className="container">
      <h1>Hello World</h1>
      <input type="button" value="remove func" onClick={function() {
        setFuncShow(false)
      }} />
      <input type="button" value="remove class" onClick={function() {
        setClassShow(false)
      }} />
      {funcShow ? <FuncComp initNumber={2} /> : null}
      {classShow ? <ClassComp initNumber={2} /> : null}
    </div>
  );
}

const funcStyle = 'color:blue';
let funcId = 0;
function FuncComp(props) {
  const [number, setNumber] = useState(props.initNumber);
  const [date, setDate] = useState((new Date()).toString())
  
  // 최초 한번만 실행
  useEffect(function() {
      console.log('%cfunc => useEffect (componentDidMount) '+(++funcId), funcStyle)
      document.title = number
      // 다시 실행될 때(정리작업 clean up)
      return function() {
        console.log('%cfunc => useEffect return (componentWillUnmount) '+(++funcId), funcStyle)
      }
    }, [])

  // side Effect
  useEffect(function() {
    console.log('%cfunc => A useEffect (componentDidMount & componentDidUpdate) '+(++funcId), funcStyle)
    document.title = number
    // 다시 실행될 때(정리작업 clean up)
    return function() {
      console.log('%cfunc => A useEffect return (componentWillUnmount) '+(++funcId), funcStyle)
    }
  }, [number])

  // 여러개 가능
  useEffect(function() {
    console.log('%cfunc => B useEffect (componentDidMount & componentDidUpdate) '+(++funcId), funcStyle)
    document.title = date
    // 다시 실행될 때(정리작업 clean up)
    return function() {
      console.log('%cfunc => B useEffect return (componentWillUnmount) '+(++funcId), funcStyle)
    }
  }, [date])
  
  console.log('%cfunc => render '+(++funcId), funcStyle)
  return (
    <div className='container'>
      <h2>function style component</h2>
      <p>Number: {number}</p>
      <p>Date: {date}</p>
      <input type="button" value="random" onClick={
        function(){
          setNumber(Math.random())
        }
      }></input>
      <input type="button" value="date" onClick={
        function(){
          setDate((new Date()).toString())
        }
      }></input>
    </div>
  )
}

const classStyle = 'color:red';
class ClassComp extends React.Component{
  state = {
    number: this.props.initNumber,
    date: (new Date()).toString()
  }
  UNSAFE_componentWillMount() {
    console.log('%cclass => UNSAFE_componentWillMount', classStyle);
  }
  componentDidMount(){
    console.log('%cclass => componentDidMount', classStyle);
  }
  shouldComponentUpdate(nextProps, nextState){
    console.log('%cclass => shouldComponentUpdate', classStyle);
    return true
  }
  UNSAFE_componentWillUpdate(nextProps, nextState){
    console.log('%cclass => UNSAFE_componentWillUpdate', classStyle);
  }
  componentDidUpdate(nextProps, nextState){
    console.log('%cclass => componentDidUpdate', classStyle);
  }
  componentWillUnmount(){
    console.log('%cclass => componentWillUnmount', classStyle);
  }
  render(){
    console.log('%cclass => render', classStyle);
    return (
      <div className='container'>
        <h2>class style component</h2>
        <p>Number: {this.state.number}</p>
        <p>Date: {this.state.date}</p>
        <input type="button" value="random" onClick={
          function(){
            this.setState({number:Math.random()})
          }.bind(this)
        }></input>
        <input type="button" value="date" onClick={
          function(){
            this.setState({date:(new Date()).toString()})
          }.bind(this)
        }></input>
      </div>
    )
  }
}

export default App;
