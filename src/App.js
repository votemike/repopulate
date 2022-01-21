import {useEffect, useState} from 'react';
import Person from "./components/Person";
import {getMaxAncestorGenerations, peopleAreRelated} from "./utils/utils";

import './App.css';

const scenarios = {
  1: {males: 2, females: 1, depth: 2, depthLabel: 'grandchild'},
  2: {males: 3, females: 1, depth: 3, depthLabel: 'great-grandchild'},
  3: {males: 2, females: 2, depth: 3, depthLabel: 'great-grandchild'}
};

let unusedFemales = [
  {name: 'Ana', sex: 'female'},
  {name: 'Andrea', sex: 'female'},
  {name: 'Anita', sex: 'female'},
  {name: 'Elena', sex: 'female'},
  {name: 'Elizabeth', sex: 'female'},
  {name: 'Fatima', sex: 'female'},
  {name: 'Jean', sex: 'female'},
  {name: 'Maria', sex: 'female'},
  {name: 'Marie', sex: 'female'},
  {name: 'Martha', sex: 'female'},
  {name: 'Mary', sex: 'female'},
  {name: 'Natalya', sex: 'female'},
  {name: 'Nushi', sex: 'female'},
  {name: 'Olga', sex: 'female'},
  {name: 'Patricia', sex: 'female'},
  {name: 'Rita', sex: 'female'},
  {name: 'Rosa', sex: 'female'},
  {name: 'Sandra', sex: 'female'},
  {name: 'Sarah', sex: 'female'},
  {name: 'Svetlana', sex: 'female'},
  {name: 'Tatyana', sex: 'female'},
  {name: 'Yan', sex: 'female'},
];
let unusedMales = [
  {name: 'Abdul', sex: 'male'},
  {name: 'Ali', sex: 'male'},
  {name: 'Antonio', sex: 'male'},
  {name: 'Carlos', sex: 'male'},
  {name: 'David', sex: 'male'},
  {name: 'Daniel', sex: 'male'},
  {name: 'Francisco', sex: 'male'},
  {name: 'Hassan', sex: 'male'},
  {name: 'Ibrahim', sex: 'male'},
  {name: 'James', sex: 'male'},
  {name: 'John', sex: 'male'},
  {name: 'Jose', sex: 'male'},
  {name: 'Joseph', sex: 'male'},
  {name: 'Michael', sex: 'male'},
  {name: 'Mohammed', sex: 'male'},
  {name: 'Paul', sex: 'male'},
  {name: 'Pedro', sex: 'male'},
  {name: 'Peter', sex: 'male'},
  {name: 'Richard', sex: 'male'},
  {name: 'Robert', sex: 'male'},
  {name: 'Thomas', sex: 'male'},
  {name: 'William', sex: 'male'},
];

async function getInitialPeople(setPeople, scenario) {
  console.log(unusedMales, unusedFemales);
  // @TODO Randomise this
  const allPeople = unusedFemales
    .splice(0, scenarios[scenario].females)
    .concat(unusedMales.splice(0, scenarios[scenario].males));
  setPeople(allPeople);
}

function selectMate(name, mateName, people, setPeople) {
  const tempPeople = people.map(person => {
    if (name === person.name) {
      if (mateName === 'none') {
        return {...person, mate: undefined};
      }
      return {...person, mate: mateName};
    }
    return person;
  })
  setPeople(tempPeople);
}

function getFemale() {
  console.log(unusedFemales.length);

  if (unusedFemales.length <= 0) {
    alert('Run out of females');
  }

  return unusedFemales.shift();
}

function getMale() {
  console.log(unusedMales.length);
  if (unusedMales.length <= 0) {
    alert('Run out of males');
  }

  return unusedMales.shift();
}

function makeNewPeople(newPeople) {
  console.log(unusedMales, unusedFemales);
  return newPeople.map((parents) => {
    const person = Math.random() < 0.5 ? getFemale() : getMale();
    console.log(person);
    return {
      name: person.name,
      sex: person.sex,
      mother: parents.mother,
      father: parents.father,
    }
  });
}

async function reproduce(people, setPeople, scenario, setScenario, setNews) {
  let newPeople = [];
  await people.every(person => {
    if (person.mate) {
      if (peopleAreRelated(person.name, person.mate, people)) {
        const confirm = window.confirm(`${person.name} and ${person.mate} are related. Inbreeding is not allowed!`);
        if (confirm) {
          getInitialPeople(setPeople, scenario);
        } else {
          getInitialPeople(setPeople, scenario);
        }
        newPeople = [];
        setNews([]);
        return false;
      }
      const personMaxAncestors = getMaxAncestorGenerations(person.name, people);
      const matesMaxAncestors = getMaxAncestorGenerations(person.mate, people);

      if (Math.max(personMaxAncestors, matesMaxAncestors) + 1 >= scenarios[scenario].depth) {
        if (scenario >= Object.keys(scenarios).length) {
          const confirm = window.confirm('Well done! You won the game!');
          if (confirm) {
            setScenario(1);
          } else {
            setScenario(1);
          }
        } else {
          const confirm = window.confirm('Well done! On to the next level for you!');
          if (confirm) {
            setScenario(scenario + 1);
          } else {
            setScenario(scenario + 1);
          }
        }
        setNews([]);
        newPeople = [];
        return false;
      }
      newPeople.push({mother: person.name, father: person.mate});
    }
    return true;
  });
  if (newPeople.length > 0) {
    const newBorns = makeNewPeople(newPeople);
    setPeople(people.concat(newBorns));
    newBorns.forEach((newBorn) => {
      setNews(oldNews => [...oldNews, `${newBorn.name} was born to ${newBorn.mother} and ${newBorn.father}`]);
    });
  }
}

function App() {
  const [people, setPeople] = useState([]);
  const [news, setNews] = useState([]);
  const [scenario, setScenario] = useState(1);
  // const [showParents, setShowParents] = useState(false);
  const [showParents, setShowParents] = useState(true);

  useEffect(() => {
    getInitialPeople(setPeople, scenario);
  }, [scenario]);

  return (
    <div id="app">
      <section>
        <h2>Scenario</h2>
        The Event has left only {scenarios[scenario].males + scenarios[scenario].females} people alive.<br/>Give the woman
        a {scenarios[scenario].depthLabel} without inbreeding.
      </section>
      <section>
        {/*<div>*/}
        {/*  <label>Show Parents: <input type="checkbox" value={showParents} onClick={() => setShowParents(!showParents)}/></label>*/}
        {/*</div>*/}
        <h2>Humans</h2> {/*Add a settings icon here*/}
        <ul className='people'>
          {people.map((person) => (
            <Person {...person} key={person.name} setPeople={setPeople} people={people} showParents={showParents}
                    selectMate={selectMate}/>
          ))}
        </ul>
        <button onClick={() => reproduce(people, setPeople, scenario, setScenario, setNews)} style={{width: '100%'}}>
          Reproduce
        </button>
      </section>
      <section>
        <h2>Log</h2>
        <ul className='news'>
          {news.map((newsItem, index) => (
            <li key={index}>{newsItem}</li>
          ))}
        </ul>
      </section>

    </div>
  );
}

export default App;
