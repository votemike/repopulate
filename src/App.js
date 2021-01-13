import {useEffect, useState} from 'react';
import Person from "./components/Person";
import {getMaxAncestorGenerations, peopleAreRelated} from "./utils/utils";

import './App.css';

const scenarios = {
  1: {males: 2, females: 1, depth: 2, depthLabel: 'grandchild'},
  2: {males: 3, females: 1, depth: 3, depthLabel: 'great-grandchild'},
  3: {males: 2, females: 2, depth: 3, depthLabel: 'great-grandchild'}
};

async function getInitialPeople(setPeople, scenario) {
  const results = await Promise.all([
    fetch(`https://randomuser.me/api/?gender=female&results=${scenarios[scenario].females}&inc=name&nat=us,dk,fr,gb`).then((response) => response.json()),
    fetch(`https://randomuser.me/api/?gender=male&results=${scenarios[scenario].males}&inc=name&nat=us,dk,fr,gb`).then((response) => response.json())
  ]);

  const girls = results[0].results.map((person) => {
    return {name: person.name.first, sex: 'female'}
  });
  const boys = results[1].results.map((person) => {
    return {name: person.name.first, sex: 'male'}
  });
  const allPeople = girls.concat(boys);
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

async function makeNewPeople(newPeople) {
  const results = await fetch(`https://randomuser.me/api/?results=${newPeople.length}&inc=name,gender&nat=us,dk,fr,gb`).then((response) => response.json());
  return newPeople.map((parents, index) => {
    const person = results.results[index];
    return {
      name: person.name.first,
      sex: person.gender,
      mother: parents.mother,
      father: parents.father,
    }
  });
}

async function reproduce(people, setPeople, scenario, setScenario) {
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
        return false;
      }
      const personMaxAncestors = getMaxAncestorGenerations(person.name, people);
      const matesMaxAncestors = getMaxAncestorGenerations(person.mate, people);
      console.log(personMaxAncestors, matesMaxAncestors, scenarios[scenario].depth);
      if (Math.max(personMaxAncestors, matesMaxAncestors) + 1 >= scenarios[scenario].depth) {
        if (scenario >= scenarios.length) {
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
        return false;
      }
      newPeople.push({mother: person.name, father: person.mate});
    }
    return true;
  });
  if (newPeople.length > 0) {
    const newBorns = await makeNewPeople(newPeople);
    setPeople(people.concat(newBorns));
  }

}

function App() {
  const [people, setPeople] = useState([]);
  const [scenario, setScenario] = useState(1);

  useEffect(() => {
    getInitialPeople(setPeople, scenario);
  }, [scenario]);

  return (
    <div>
      The Event has left only {scenarios[scenario].males + scenarios[scenario].females} people alive. Give the woman
      a {scenarios[scenario].depthLabel} without inbreeding.
      <ul>
        {people.map((person) => (
          <Person {...person} key={person.name} setPeople={setPeople} people={people}
                  selectMate={selectMate}/>
        ))}
      </ul>
      <button onClick={() => reproduce(people, setPeople, scenario, setScenario)}>
        Reproduce
      </button>
    </div>
  );
}

export default App;
