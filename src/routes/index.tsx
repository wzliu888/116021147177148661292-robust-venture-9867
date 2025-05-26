import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForInput, setWaitingForInput] = useState(false)

  const inputNumber = (num: string) => {
    if (waitingForInput) {
      setDisplay(num)
      setWaitingForInput(false)
    } else {
      setDisplay(display === '0' ? num : display + num)
    }
  }

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForInput(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue
      case '-':
        return firstValue - secondValue
      case '*':
        return firstValue * secondValue
      case '/':
        return firstValue / secondValue
      default:
        return secondValue
    }
  }

  const performCalculation = () => {
    if (previousValue !== null && operation) {
      const inputValue = parseFloat(display)
      const newValue = calculate(previousValue, inputValue, operation)
      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForInput(true)
    }
  }

  const clear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForInput(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">Calculator</h1>
        
        <div className="mb-4">
          <input
            type="text"
            value={display}
            readOnly
            className="w-full text-right text-2xl p-3 border-2 border-gray-300 rounded bg-gray-50 font-mono"
          />
        </div>

        <div className="grid grid-cols-4 gap-2">
          <button onClick={clear} className="col-span-2 bg-red-500 hover:bg-red-600 text-white p-3 rounded font-semibold">Clear</button>
          <button onClick={() => inputOperation('/')} className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded font-semibold">÷</button>
          <button onClick={() => inputOperation('*')} className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded font-semibold">×</button>
          
          <button onClick={() => inputNumber('7')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-3 rounded font-semibold">7</button>
          <button onClick={() => inputNumber('8')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-3 rounded font-semibold">8</button>
          <button onClick={() => inputNumber('9')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-3 rounded font-semibold">9</button>
          <button onClick={() => inputOperation('-')} className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded font-semibold">−</button>
          
          <button onClick={() => inputNumber('4')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-3 rounded font-semibold">4</button>
          <button onClick={() => inputNumber('5')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-3 rounded font-semibold">5</button>
          <button onClick={() => inputNumber('6')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-3 rounded font-semibold">6</button>
          <button onClick={() => inputOperation('+')} className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded font-semibold">+</button>
          
          <button onClick={() => inputNumber('1')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-3 rounded font-semibold">1</button>
          <button onClick={() => inputNumber('2')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-3 rounded font-semibold">2</button>
          <button onClick={() => inputNumber('3')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-3 rounded font-semibold">3</button>
          <button onClick={performCalculation} className="row-span-2 bg-green-500 hover:bg-green-600 text-white p-3 rounded font-semibold">=</button>
          
          <button onClick={() => inputNumber('0')} className="col-span-2 bg-gray-200 hover:bg-gray-300 text-gray-800 p-3 rounded font-semibold">0</button>
          <button onClick={() => inputNumber('.')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-3 rounded font-semibold">.</button>
        </div>
      </div>
    </div>
  )
}
