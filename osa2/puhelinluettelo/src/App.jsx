import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personfilter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('')

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
    })
  }, [])

  const personsToShow = persons.filter(person =>
  person.name.toLowerCase().includes(personfilter.toLowerCase())
  )

  const addPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(person => person.name === newName)

    const personObject = {
      name: newName, 
      number: newNumber,
    }

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(existingPerson.id, personObject)
          .then(response => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : response))
            setNewName('')
            setNewNumber('')
            setMessage(`Updated ${personObject.name}`)
            setMessageType('success')
            setTimeout(() => {
              setMessage(null)
              setMessageType('')
            }, 5000)
          })
          .catch(() => {
            setMessage(`Failed to update ${personObject.name}`)
            setMessageType('error')
            setTimeout(() => {
              setMessage(null)
              setMessageType('')
            }, 5000)
          })
      }
    } else {
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setMessage(`Added ${personObject.name}`)
        setMessageType('success')
        setTimeout(() => {
          setMessage(null)
          setMessageType('')
        }, 5000)
      })
      .catch(() => {
        setMessage(`Failed to add ${personObject.name}`)
        setMessageType('error')
        setTimeout(() => {
          setMessage(null)
          setMessageType('')
        }, 5000)
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleDelete = (person) => {
  if (window.confirm(`Delete ${person.name}?`)) {
    personService.delete_person(person.id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== person.id))
        setMessage(`Deleted ${person.name}`)
        setMessageType('success_delete')
        setTimeout(() => {
          setMessage(null)
          setMessageType('')
        }, 5000)
      })
      .catch(() => {
        setMessage(`Information of ${person.name} has already been removed from server`)
        setMessageType('error')
        setTimeout(() => {
          setMessage(null)
          setMessageType('')
        }, 5000)
        setPersons(persons.filter(p => p.id !== person.id))
      })
    }
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType} />
      <Filter personfilter={personfilter} handleFilterChange={handleFilterChange}/>
      <h3>Add a new</h3>
        <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        />
      <h3>Numbers</h3>
        <Persons 
        persons={personsToShow} 
        handleDelete={handleDelete}
        />
    </div>
  )

}

export default App
