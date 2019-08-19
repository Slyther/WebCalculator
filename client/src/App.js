import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {
      num1: '',
      num2: '',
      result: 0,
      isNum2: false,
      isCompletelyDisabled: false,
      operator: '',
      topLabelText: ''
    };
  }

  handleChnge = (e, input) => {
    let { isNum2, num1, num2, operator, result, isCompletelyDisabled } = this.state;
    
    switch(input) {
      case 'exp':
      case 'divide':
      case 'multiply':
      case 'add':
      case 'substract':
        isNum2 = true;
        operator = input;
        break;
      case 'sqrt':
        isCompletelyDisabled = true;
        operator = input;
        break;
      case 'clear':
        isNum2 = false;
        isCompletelyDisabled = false;
        num1 = '';
        num2 = '';
        result = 0;
        operator = '';
        break;
      case 'submit':
        if(operator)
          this.submitEntry();
        return;
      case 'invert':
        console.log(input);
        if(isNum2) {
          num2 = `${Number(num2) * -1}`;
        } else {
          num1 = `${Number(num1) * -1}`;
        }
        break;
      default:
        if(isNum2) {
          num2 += input;
        } else {
          num1 += input;
        }
        break;
    }
    this.setState({ isNum2, isCompletelyDisabled, num1, num2, operator, result }, () => this.updateLabels());
  };

  submitEntry = () => {
    const { num1, num2, operator } = this.state;
    let number1 = Number(num1);
    let number2 = Number(num2);

    fetch(`http://localhost:5000/api/${operator}`, {
      method: "POST",
      headers: [
        ["Content-Type", "application/json"],
        ["Accept", "application/json"],
      ],
      body: JSON.stringify({ num1: number1, num2: number2 })
    }).then(response => response.json())
    .then(response => {
      if(typeof response.errorMsg !== 'undefined'){
        this.setState({result: response.errorMsg});
      } else {
        this.setState({result: response.result});
      }
    });
  };

  updateLabels = () => {
    const { num1, num2, operator } = this.state;
    let { topLabelText } = this.state;

    switch(operator) {
      case '':
        topLabelText = num1;
        break;
      case 'sqrt':
        topLabelText = `√(${num1})`;
        break;
      case 'exp':
        topLabelText = `${num1} ^ ${num2}`
        break;
      case 'divide':
        topLabelText = `${num1} / ${num2}`
        break;
      case 'multiply':
        topLabelText = `${num1} * ${num2}`
        break;
      case 'add':
        topLabelText = `${num1} + ${num2}`
        break;
      case 'substract':
        topLabelText = `${num1} - ${num2}`
        break;
      default:
        topLabelText = '';
        break;
    }

    this.setState({topLabelText});
  }

  render() {
    const { result, topLabelText, isNum2, isCompletelyDisabled } = this.state;
    const JSX = (
      <div className="calculator-container">
        <p className="top-label">{topLabelText}</p>
        <h3 className="main-label">{result}</h3>
        <div className="buttons-grid container">
          <div className="row">
            <div className={`col-xs-3 calcButton ${isNum2 ? 'disabled' : ''}`}  onClick={(e) => this.handleChnge(e, 'sqrt')}>√</div>
            <div className={`col-xs-3 calcButton ${isNum2 ? 'disabled' : ''}`}  onClick={(e) => this.handleChnge(e, 'exp')}>x<sup>2</sup></div>
            <div className="col-xs-3 calcButton"  onClick={(e) => this.handleChnge(e, 'clear')}>C</div>
            <div className={`col-xs-3 calcButton ${isNum2 ? 'disabled' : ''}`}  onClick={(e) => this.handleChnge(e, 'divide')}>÷</div>
          </div>
          <div className="row">
            <div className={`col-xs-3 calcButton number ${isCompletelyDisabled ? 'disabled' : ''}`}  onClick={(e) => this.handleChnge(e, '7')}>7</div>
            <div className={`col-xs-3 calcButton number ${isCompletelyDisabled ? 'disabled' : ''}`}  onClick={(e) => this.handleChnge(e, '8')}>8</div>
            <div className={`col-xs-3 calcButton number ${isCompletelyDisabled ? 'disabled' : ''}`}  onClick={(e) => this.handleChnge(e, '9')}>9</div>
            <div className={`col-xs-3 calcButton ${isNum2 ? 'disabled' : ''}`}  onClick={(e) => this.handleChnge(e, 'multiply')}>⨯</div>
          </div>
          <div className="row">
            <div className={`col-xs-3 calcButton number ${isCompletelyDisabled ? 'disabled' : ''}`}  onClick={(e) => this.handleChnge(e, '4')}>4</div>
            <div className={`col-xs-3 calcButton number ${isCompletelyDisabled ? 'disabled' : ''}`}  onClick={(e) => this.handleChnge(e, '5')}>5</div>
            <div className={`col-xs-3 calcButton number ${isCompletelyDisabled ? 'disabled' : ''}`}  onClick={(e) => this.handleChnge(e, '6')}>6</div>
            <div className={`col-xs-3 calcButton ${isNum2 ? 'disabled' : ''}`}  onClick={(e) => this.handleChnge(e, 'substract')}>-</div>
          </div>
          <div className="row">
            <div className={`col-xs-3 calcButton number ${isCompletelyDisabled ? 'disabled' : ''}`}  onClick={(e) => this.handleChnge(e, '1')}>1</div>
            <div className={`col-xs-3 calcButton number ${isCompletelyDisabled ? 'disabled' : ''}`}  onClick={(e) => this.handleChnge(e, '2')}>2</div>
            <div className={`col-xs-3 calcButton number ${isCompletelyDisabled ? 'disabled' : ''}`}  onClick={(e) => this.handleChnge(e, '3')}>3</div>
            <div className={`col-xs-3 calcButton ${isNum2 ? 'disabled' : ''}`}  onClick={(e) => this.handleChnge(e, 'add')}>+</div>
          </div>
          <div className="row">
            <div className="col-xs-3 calcButton"  onClick={(e) => this.handleChnge(e, 'invert')}>±</div>
            <div className={`col-xs-3 calcButton number ${isCompletelyDisabled ? 'disabled' : ''}`}  onClick={(e) => this.handleChnge(e, '0')}>0</div>
            <div className="col-xs-3 calcButton"  onClick={(e) => this.handleChnge(e, '.')}>.</div>
            <div className="col-xs-3 calcButton"  onClick={(e) => this.handleChnge(e, 'submit')}>=</div>
          </div>
        </div>
      </div>
    );
    return JSX;
  }
}

export default App;
