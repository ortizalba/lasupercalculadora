import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// Funciones personalizadas
const customSqrt = (x) => Math.pow(x, 0.5);
const customTan = (x) => Math.tan(x);
const customSin = (x) => Math.sin(x);
const customCos = (x) => Math.cos(x);
const customLog = (x) => Math.log(x);
const customLog10 = (x) => Math.log10(x);
const customPi = () => Math.PI;
const customE = () => Math.E;

function App() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        const cursorPosition = inputRef.current.selectionStart;

        if (e.key === 'ArrowLeft' && cursorPosition > 0) {
          inputRef.current.selectionStart = cursorPosition - 1;
          inputRef.current.selectionEnd = cursorPosition - 1;
        }

        if (e.key === 'ArrowRight' && cursorPosition < expression.length) {
          inputRef.current.selectionStart = cursorPosition + 1;
          inputRef.current.selectionEnd = cursorPosition + 1;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [expression]);

  const handleButtonClick = (value) => {
    setExpression((prev) => prev + value);
  };

  const handleAddition = () => {
    setExpression((prev) => prev + '+');
  };

  const handleSubtraction = () => {
    setExpression((prev) => prev + '-');
  };

  const handleMultiplication = () => {
    setExpression((prev) => prev + '*');
  };

  const handleDivision = () => {
    setExpression((prev) => prev + '/');
  };

  const handlePower = () => {
    setExpression((prev) => prev + '**');
  };

  const handleOpenParenthesis = () => {
    setExpression((prev) => prev + '(');
  };

  const handleCloseParenthesis = () => {
    setExpression((prev) => prev + ')');
  };

  const handleDelete = () => {
    setExpression((prev) => prev.slice(0, -1));
  };

  const handleCalculate = () => {
    try {
      const calculatedResult = eval(expression);
      setResult(calculatedResult);
      setHistory((prev) => [...prev, { expression, result: calculatedResult }]);
    } catch (error) {
      setResult('Error');
    }
  };

  useEffect(() => {
    handleSpecialCalculations();
  }, [expression]);

  const handleSpecialCalculations = () => {
    try {
      const calculatedResult = eval(expression);
      setResult(calculatedResult);
    } catch (error) {
      setResult('Error en la función especial');
    }
  };

  // Funciones personalizadas en lugar de Math.sqrt, Math.tan, etc.
  const handSqrt = () => {
    setExpression((prev) => `Sqrt(${prev})`);
  };

  const handTan = () => {
    setExpression((prev) => `Tan(${prev})`);
  };

  const handSin = () => {
    setExpression((prev) => `Sin(${prev})`);
  };

  const handCos = () => {
    setExpression((prev) => `Cos(${prev})`);
  };

  const handLog = () => {
    setExpression((prev) => `Log(${prev})`);
  };

  const handLog10 = () => {
    setExpression((prev) => `Log10(${prev})`);
  };

  const handPi = () => {
    setExpression((prev) => `${prev}π`);
  };

  const handE = () => {
    setExpression((prev) => `${prev}e`);
  };

  return (
    <div className="kawaii-container">
      <h1 className="kawaii-title">Calculadora</h1>
      <div>
        <input
          className="kawaii-input"
          type="text"
          value={expression}
          ref={inputRef}
          onChange={() => {}}
        />
        
      </div>
      <div className="kawaii-buttons">
        <button onClick={() => handleButtonClick('0')}>0</button>
        <button onClick={() => handleButtonClick('1')}>1</button>
        <button onClick={() => handleButtonClick('2')}>2</button>
        <button onClick={() => handleButtonClick('3')}>3</button>
        <button onClick={() => handleButtonClick('4')}>4</button>
        <button onClick={() => handleButtonClick('5')}>5</button>
        <button onClick={() => handleButtonClick('6')}>6</button>
        <button onClick={() => handleButtonClick('7')}>7</button>
        <button onClick={() => handleButtonClick('8')}>8</button>
        <button onClick={() => handleButtonClick('9')}>9</button>
        <br />
        <button onClick={() => handleButtonClick('.')}>.</button>
        <button onClick={handleAddition}>+</button>
        <button onClick={handleSubtraction}>-</button>
        <button onClick={handleDivision}>/</button>
        <button onClick={handleMultiplication}>*</button>
        <button onClick={handlePower}>^</button>
        <button onClick={handleOpenParenthesis}>(</button>
        <button onClick={handleCloseParenthesis}>)</button>
        <br />
        <button onClick={handSqrt}>√</button>
        <button onClick={handTan}>tan</button>
        <button onClick={handSin}>sen</button>
        <button onClick={handCos}>cos</button>
        <button onClick={handLog}>In</button>
        <button onClick={handLog10}>log</button>
        <br />
        <button onClick={handPi}>π</button>
        <button onClick={handE}>e</button>
        <button onClick={handleDelete}>borrar</button>
        <button onClick={handleCalculate}>calcular</button>
      </div>
      <div>
        <h2>Resultado: {result}</h2>
      </div>
      <div>
        <h2 className="kawaii-history">Historial</h2>
        <table className="kawaii-table">
          <thead>
            <tr>
              <th>Expresión</th>
              <th>Resultado</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr key={index}>
                <td>{item.expression}</td>
                <td>{item.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;





