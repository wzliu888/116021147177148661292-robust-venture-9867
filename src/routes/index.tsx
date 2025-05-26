import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num)
      setWaitingForOperand(false)
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

    setWaitingForOperand(true)
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
      setWaitingForOperand(true)
    }
  }

  const clearAll = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const clearEntry = () => {
    setDisplay('0')
  }

  const ButtonRow = ({ children }: { children: React.ReactNode }) => (
    <div className="flex gap-2">{children}</div>
  )

  const Button = ({ onClick, className, children }: { onClick: () => void; className?: string; children: React.ReactNode }) => (
    <button
      onClick={onClick}
      className={`h-16 px-4 font-semibold rounded-lg transition-colors ${
        className || 'bg-gray-200 hover:bg-gray-300 text-gray-800'
      }`}
    >
      {children}
    </button>
  )

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xs">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Calculator</h1>
        
        <div className="bg-gray-900 rounded-lg p-4 mb-4">
          <div className="text-right text-white text-3xl font-mono overflow-hidden">
            {display}
          </div>
        </div>

        <div className="grid gap-2">
          <ButtonRow>
            <Button onClick={clearAll} className="bg-red-500 hover:bg-red-600 text-white flex-1">AC</Button>
            <Button onClick={clearEntry} className="bg-orange-500 hover:bg-orange-600 text-white flex-1">C</Button>
            <Button onClick={() => inputOperation('÷')} className="bg-blue-500 hover:bg-blue-600 text-white flex-1">÷</Button>
          </ButtonRow>
          
          <ButtonRow>
            <Button onClick={() => inputNumber('7')} className="flex-1">7</Button>
            <Button onClick={() => inputNumber('8')} className="flex-1">8</Button>
            <Button onClick={() => inputNumber('9')} className="flex-1">9</Button>
            <Button onClick={() => inputOperation('×')} className="bg-blue-500 hover:bg-blue-600 text-white flex-1">×</Button>
          </ButtonRow>
          
          <ButtonRow>
            <Button onClick={() => inputNumber('4')} className="flex-1">4</Button>
            <Button onClick={() => inputNumber('5')} className="flex-1">5</Button>
            <Button onClick={() => inputNumber('6')} className="flex-1">6</Button>
            <Button onClick={() => inputOperation('-')} className="bg-blue-500 hover:bg-blue-600 text-white flex-1">-</Button>
          </ButtonRow>
          
          <ButtonRow>
            <Button onClick={() => inputNumber('1')} className="flex-1">1</Button>
            <Button onClick={() => inputNumber('2')} className="flex-1">2</Button>
            <Button onClick={() => inputNumber('3')} className="flex-1">3</Button>
            <Button onClick={() => inputOperation('+')} className="bg-blue-500 hover:bg-blue-600 text-white flex-1">+</Button>
          </ButtonRow>
          
          <ButtonRow>
            <Button onClick={() => inputNumber('0')} className="flex-[2_2_0%] mr-2">0</Button>
            <Button onClick={() => inputNumber('.')} className="flex-1">.</Button>
            <Button onClick={performCalculation} className="bg-green-500 hover:bg-green-600 text-white flex-1">=</Button>
          </ButtonRow>
        </div>
      </div>
    </div>
  )
}
