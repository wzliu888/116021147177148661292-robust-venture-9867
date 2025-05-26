import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForNewValue, setWaitingForNewValue] = useState(false)

  const inputNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num)
      setWaitingForNewValue(false)
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

    setWaitingForNewValue(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue
      case '-':
        return firstValue - secondValue
      case '×':
        return firstValue * secondValue
      case '÷':
        return firstValue / secondValue
      case '=':
        return secondValue
      default:
        return secondValue
    }
  }

  const performCalculation = () => {
    const inputValue = parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForNewValue(true)
    }
  }

  const clear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForNewValue(false)
  }

  const Button = ({ onClick, className = '', children }: {
    onClick: () => void
    className?: string
    children: React.ReactNode
  }) => (
    <button
      onClick={onClick}
      className={`h-16 text-xl font-semibold rounded-lg border border-gray-300 hover:bg-gray-100 active:bg-gray-200 transition-colors ${
        className
      }`}
    >
      {children}
    </button>
  )

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Simple Calculator</h1>
        
        <div className="mb-4">
          <input
            type="text"
            value={display}
            readOnly
            className="w-full h-16 text-right text-2xl font-mono px-4 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none"
          />
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          <Button onClick={clear} className="col-span-2 bg-red-100 hover:bg-red-200 text-red-700">
            Clear
          </Button>
          <Button onClick={() => inputOperation('÷')} className="bg-blue-100 hover:bg-blue-200 text-blue-700">
            ÷
          </Button>
          <Button onClick={() => inputOperation('×')} className="bg-blue-100 hover:bg-blue-200 text-blue-700">
            ×
          </Button>
          
          <Button onClick={() => inputNumber('7')}>7</Button>
          <Button onClick={() => inputNumber('8')}>8</Button>
          <Button onClick={() => inputNumber('9')}>9</Button>
          <Button onClick={() => inputOperation('-')} className="bg-blue-100 hover:bg-blue-200 text-blue-700">
            -
          </Button>
          
          <Button onClick={() => inputNumber('4')}>4</Button>
          <Button onClick={() => inputNumber('5')}>5</Button>
          <Button onClick={() => inputNumber('6')}>6</Button>
          <Button onClick={() => inputOperation('+')} className="bg-blue-100 hover:bg-blue-200 text-blue-700">
            +
          </Button>
          
          <Button onClick={() => inputNumber('1')}>1</Button>
          <Button onClick={() => inputNumber('2')}>2</Button>
          <Button onClick={() => inputNumber('3')}>3</Button>
          <Button onClick={performCalculation} className="row-span-2 bg-green-100 hover:bg-green-200 text-green-700">
            =
          </Button>
          
          <Button onClick={() => inputNumber('0')} className="col-span-2">0</Button>
          <Button onClick={() => inputNumber('.')}>.</Button>
        </div>
      </div>
    </div>
  )
}
