// Things to add later.... Showing parents, Ages, aging, birth odds, death, random ages, random death, pretty version
// Level 1 - 2 Men, 1 Woman, Give the woman a grandchild without inbreeding, no age, no death, garunteed birth
// Level 2 - 3 Men, 1 Woman, Give the woman a great-grandchild without inbreeding, no age, no death, garunteed birth
// Level 3 - 2 Men, 2 Women, Give anyone a great-great-grandchild without inbreeding, set start age, set death, garunteed birth
import {useEffect, useState} from 'react';
import Person from "./components/Person";
import {findPerson, getMaxAncestorGenerations, peopleAreRelated} from "./utils/utils";

const scenarios = {
  1: {males: 2, females: 1, depth: 2, depthLabel: 'grandchild'},
  2: {males: 3, females: 1, depth: 3, depthLabel: 'great-grandchild'},
  3: {males: 2, females: 2, depth: 4, depthLabel: 'great-great-grandchild'}
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
        const confirm = window.confirm('Well done! You won!');
        if (confirm) {
          setScenario(scenario+1);
        } else {
          setScenario(scenario+1);
        }
        return false;
      }
      const mate = findPerson(person.mate, people);
      newPeople.push({mother: person.name, father: mate.name});
    }
    return true;
  });
  if (newPeople.length > 0) {
    const newBorns = await makeNewPeople(newPeople);
    // console.log(newBorns);
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
