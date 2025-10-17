import { useState, useEffect, useRef } from 'react'
import './App.css'
import { content } from './utils/contentLoader'
import { Game2048 } from './components/Game2048'

interface Command {
  input: string
  output: string
  timestamp: Date
}

interface TerminalProps {
  onCommand: (command: string) => void
  history: Command[]
  currentInput: string
  onInputChange: (input: string) => void
  isTyping: boolean
  onTabComplete?: (input: string) => void
  onHistoryNavigate?: (direction: 'up' | 'down') => void
  inputRef: React.RefObject<HTMLInputElement | null>
}

function Terminal({ onCommand, history, currentInput, onInputChange, isTyping, onTabComplete, onHistoryNavigate, inputRef }: TerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      onCommand(currentInput)
      onInputChange('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      onCommand(currentInput)
      onInputChange('')
    } else if (e.key === 'Tab') {
      e.preventDefault()
      // Tab completion will be handled by the parent component
      onTabComplete?.(currentInput)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      onHistoryNavigate?.('up')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      onHistoryNavigate?.('down')
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      // Ctrl+L runs the clear command
      onCommand('clear')
    }
  }

  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  // Function to parse content and convert <a/> tags to clickable links
  const parseContent = (content: string): string => {
    // Replace <a href="url">text</a> with proper HTML links
    return content.replace(
      /<a\s+href="([^"]+)"\s*>\s*([^<]+)\s*<\/a>/gi,
      '<a href="$1" target="_blank" rel="noopener noreferrer" style="color: #00ff00; text-decoration: underline;">$2</a>'
    )
  }

  return (
    <div className="terminal" ref={terminalRef} onClick={handleTerminalClick}>
      <div className="terminal-body">
        {history.map((cmd, index) => (
          <div key={index} className="command-block">
            <div className="command-input">
              <span className="prompt">keuhdall@home:~$</span>
              <span className="command">{cmd.input}</span>
            </div>
            <div className="command-output" dangerouslySetInnerHTML={{ __html: parseContent(cmd.output) }} />
          </div>
        ))}
        <div className="current-line">
          <span className="prompt">keuhdall@home:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyPress={handleKeyPress}
            onKeyDown={handleKeyDown}
            className="command-input-field"
            disabled={isTyping}
            autoComplete="off"
            spellCheck="false"
            autoFocus
          />
          {isTyping && <span className="cursor">█</span>}
        </div>
      </div>
    </div>
  )
}

function App() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [history, setHistory] = useState<Command[]>([
    {
      input: 'welcome',
      output: content.welcome,
      timestamp: new Date()
    }
  ])
  const [currentInput, setCurrentInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [gameActive, setGameActive] = useState(false)

  // Ensure input is focused when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  // Available commands and files for autocompletion
  const availableCommands = [
    'help', 'about', 'skills', 'projects', 'experience', 'contact',
    'clear', 'whoami', 'date', 'uptime', 'ls', 'cat', 'echo', 'welcome', '2048'
  ]
  
  const availableFiles = [
    'about.txt', 'skills.txt', 'projects.txt', 
    'experience.txt', 'contact.txt'
  ]

  // Command history navigation
  const navigateHistory = (direction: 'up' | 'down') => {
    if (commandHistory.length === 0) return

    let newIndex = historyIndex

    if (direction === 'up') {
      // Go up in history (older commands)
      if (historyIndex === -1) {
        newIndex = commandHistory.length - 1
      } else if (historyIndex > 0) {
        newIndex = historyIndex - 1
      }
    } else {
      // Go down in history (newer commands)
      if (historyIndex < commandHistory.length - 1) {
        newIndex = historyIndex + 1
      } else {
        newIndex = -1
        setCurrentInput('')
        setHistoryIndex(newIndex)
        return
      }
    }

    setHistoryIndex(newIndex)
    setCurrentInput(commandHistory[newIndex])
  }

  // Tab completion function
  const handleTabComplete = (input: string) => {
    const parts = input.trim().split(' ')
    const lastPart = parts[parts.length - 1]
    
    if (parts.length === 1) {
      // Command completion
      const matches = availableCommands.filter(cmd => 
        cmd.startsWith(lastPart.toLowerCase())
      )
      
      if (matches.length === 1) {
        // Single match - complete it
        setCurrentInput(matches[0])
      } else if (matches.length > 1) {
        // Multiple matches - show them
        const output = `Available completions:\n${matches.join('  ')}`
        setHistory(prev => [...prev, { 
          input: input, 
          output: output, 
          timestamp: new Date() 
        }])
      }
    } else if (parts[0] === 'cat' && parts.length === 2) {
      // File completion for cat command
      const matches = availableFiles.filter(file => 
        file.startsWith(lastPart)
      )
      
      if (matches.length === 1) {
        // Single match - complete it
        setCurrentInput(`cat ${matches[0]}`)
      } else if (matches.length > 1) {
        // Multiple matches - show them
        const output = `Available files:\n${matches.join('  ')}`
        setHistory(prev => [...prev, { 
          input: input, 
          output: output, 
          timestamp: new Date() 
        }])
      }
    }
  }

  const commands = {
    welcome: () => content.welcome,
    help: () => content.help,
    about: () => content.about,
    skills: () => content.skills,
    projects: () => content.projects,
    experience: () => content.experience,
    contact: () => content.contact,
    whoami: () => 'keuhdall',
    date: () => new Date().toString(),
    uptime: () => {
      const birthDate = new Date('1994-11-15T00:00:00Z')
      const now = new Date()
      const diffMs = now.getTime() - birthDate.getTime()
      
      const years = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365.25))
      const days = Math.floor((diffMs % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000)
      
      return `System uptime since birth (Nov 15, 1994 00:00):\n${years} years, ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`
    },
    ls: () => 'about.txt  skills.txt  projects.txt  experience.txt  contact.txt',
    cat: (args: string) => {
      if (args.includes('about.txt')) {
        return content.about
      } else if (args.includes('skills.txt')) {
        return content.skills
      } else if (args.includes('projects.txt')) {
        return content.projects
      } else if (args.includes('experience.txt')) {
        return content.experience
      } else if (args.includes('contact.txt')) {
        return content.contact
      }
      return 'File not found. Available files: about.txt, skills.txt, projects.txt, experience.txt, contact.txt'
    },
    echo: (args: string) => args,
    clear: () => '',
    '2048': () => {
      setGameActive(true)
      return 'Starting 2048 game...'
    },
  }

  const executeCommand = async (input: string) => {
    const trimmedInput = input.trim()
    if (!trimmedInput) return

    const [command, ...args] = trimmedInput.split(' ')
    const argsString = args.join(' ')

    // Add command to history immediately
    setHistory(prev => [...prev, { input: trimmedInput, output: '', timestamp: new Date() }])

    // Add to command history (excluding clear command)
    if (command !== 'clear') {
      setCommandHistory(prev => {
        // Don't add duplicate consecutive commands
        if (prev.length === 0 || prev[prev.length - 1] !== trimmedInput) {
          return [...prev, trimmedInput]
        }
        return prev
      })
    }

    if (command === 'clear') {
      setHistory([])
      setHistoryIndex(-1)
      // Refocus the input field after clearing
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus()
        }
      }, 100)
      return
    }

    // Reset history index when executing a new command
    setHistoryIndex(-1)

    setIsTyping(true)

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 500))

    let output = ''
    if (commands[command as keyof typeof commands]) {
      const commandFn = commands[command as keyof typeof commands]
      output = typeof commandFn === 'function' ? commandFn(argsString) : commandFn
    } else {
      output = `Command not found: ${command}. Type 'help' for available commands.`
    }

    // Update the last command with output
    setHistory(prev => {
      const newHistory = [...prev]
      newHistory[newHistory.length - 1].output = output
      return newHistory
    })

    setIsTyping(false)
    
    // Refocus the input field after command execution
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, 100)
  }

  if (gameActive) {
    return <Game2048 onExit={() => setGameActive(false)} />
  }

  return (
    <div className="app">
      <Terminal
        onCommand={executeCommand}
        history={history}
        currentInput={currentInput}
        onInputChange={setCurrentInput}
        isTyping={isTyping}
        onTabComplete={handleTabComplete}
        onHistoryNavigate={navigateHistory}
        inputRef={inputRef}
      />
    </div>
  )
}

export default App
