// Things to add later.... Showing parents, Ages, aging, birth odds, death, random ages, random death, pretty version
// Level 1 - 2 Men, 1 Woman, Give the woman a grandchild without inbreeding, no age, no death, garunteed birth
// Level 2 - 3 Men, 1 Woman, Give the woman a great-grandchild without inbreeding, no age, no death, garunteed birth
// Level 3 - 2 Men, 2 Women, Give anyone a great-grandchild without inbreeding, set start age, set death, garunteed birth

import './App.css';
import React, {useEffect, useState} from 'react';

import Person from "./components/Person";
import Chromosomes from "./components/Chromosomes";

async function getInitialPeople(setPeople) {
  const initialMales = 2;
  const initialFemales = 1;
  const results = await Promise.all([
    fetch(`https://randomuser.me/api/?gender=female&results=${initialFemales}&inc=name&nat=us,dk,fr,gb`).then((response) => response.json()),
    fetch(`https://randomuser.me/api/?gender=male&results=${initialMales}&inc=name&nat=us,dk,fr,gb`).then((response) => response.json())
  ]);

  const girls = results[0].results.map((person) => {
    return {name: `${person.name.first} ${person.name.last}`, age: Math.floor((Math.random() * 65)), sex: 'female'}
  });
  const boys = results[1].results.map((person) => {
    return {name: `${person.name.first} ${person.name.last}`, age: Math.floor((Math.random() * 65)), sex: 'male'}
  });
  const allPeople = girls.concat(boys).map((person) => {
    const name = person.name.replace(' ', '');
    person.chromosomes = {
      1: {a: `${name}1a`, b: `${name}1b`},
      2: {a: `${name}2a`, b: `${name}2b`},
      3: {a: `${name}3a`, b: `${name}3b`},
      4: {a: `${name}4a`, b: `${name}4b`},
      5: {a: `${name}5a`, b: `${name}5b`},
      6: {a: `${name}6a`, b: `${name}6b`},
      7: {a: `${name}7a`, b: `${name}7b`},
      8: {a: `${name}8a`, b: `${name}8b`},
      9: {a: `${name}9a`, b: `${name}9b`},
      10: {a: `${name}10a`, b: `${name}10b`},
      11: {a: `${name}11a`, b: `${name}11b`},
      12: {a: `${name}12a`, b: `${name}12b`},
      13: {a: `${name}13a`, b: `${name}13b`},
      14: {a: `${name}14a`, b: `${name}14b`},
      15: {a: `${name}15a`, b: `${name}15b`},
      16: {a: `${name}16a`, b: `${name}16b`},
      17: {a: `${name}17a`, b: `${name}17b`},
      18: {a: `${name}18a`, b: `${name}18b`},
      19: {a: `${name}19a`, b: `${name}19b`},
      20: {a: `${name}20a`, b: `${name}20b`},
      21: {a: `${name}21a`, b: `${name}21b`},
      22: {a: `${name}22a`, b: `${name}22b`},
      23: {a: `${name}23a`, b: `${name}23b`},
    }
    return person;
  });
  setPeople(allPeople);
}

function figureOutChanceOfBaby(femaleAge, maleAge) {
  let chance = Math.random() * 0.1 + 0.9; // 0.9 -> 1.0
  if (femaleAge > 55) {
    chance = chance * 0.1
  } else if (femaleAge > 45) {
    chance = chance * 0.4
  } else if (femaleAge > 35) {
    chance = chance * 0.75
  }
  if (maleAge > 65) {
    chance = chance * 0.4;
  } else if (maleAge > 40) {
    chance = chance * 0.75
  }

  return chance
}

function generateChromosome(chromosome, mother, father) {
  return {
    a: Math.random() < 0.5 ? mother.chromosomes[chromosome].a : mother.chromosomes[chromosome].b,
    b: Math.random() < 0.5 ? father.chromosomes[chromosome].a : father.chromosomes[chromosome].b
  };
}

function generateChromosomes(mothersName, fathersName, people) {
  const mother = people.find((p) => {
    return p.name === mothersName;
  });
  const father = people.find((p) => {
    return p.name === fathersName;
  });
  return {
    1: generateChromosome(1, mother, father),
    2: generateChromosome(2, mother, father),
    3: generateChromosome(3, mother, father),
    4: generateChromosome(4, mother, father),
    5: generateChromosome(5, mother, father),
    6: generateChromosome(6, mother, father),
    7: generateChromosome(7, mother, father),
    8: generateChromosome(8, mother, father),
    9: generateChromosome(9, mother, father),
    10: generateChromosome(10, mother, father),
    11: generateChromosome(11, mother, father),
    12: generateChromosome(12, mother, father),
    13: generateChromosome(13, mother, father),
    14: generateChromosome(14, mother, father),
    15: generateChromosome(15, mother, father),
    16: generateChromosome(16, mother, father),
    17: generateChromosome(17, mother, father),
    18: generateChromosome(18, mother, father),
    19: generateChromosome(19, mother, father),
    20: generateChromosome(20, mother, father),
    21: generateChromosome(21, mother, father),
    22: generateChromosome(22, mother, father),
    23: generateChromosome(23, mother, father),
  };
}

async function makeNewPeople(newPeople, people) {
  const results = await fetch(`https://randomuser.me/api/?results=${newPeople.length}&inc=name,gender&nat=us,dk,fr,gb`).then((response) => response.json());
  return newPeople.map((parents, index) => {
    return {
      name: `${results.results[index].name.first} ${results.results[index].name.last}`,
      age: 0,
      sex: results.results[index].gender,
      mother: parents.mother,
      father: parents.father,
      chromosomes: generateChromosomes(parents.mother, parents.father, people)
    }
  });
}

async function passOneYear(year, people, setPeople, setYear) {
  let newPeople = [];
  let tempPeople = await people.map(person => {
    if (person.mate) {
      const mate = people.find((p) => {
        return p.name === person.mate;
      });
      const chanceOfBaby = figureOutChanceOfBaby(person.age, mate.age);
      if (Math.random() < chanceOfBaby) {
        newPeople.push({mother: person.name, father: mate.name});
        if (Math.random() < (1 / 250)) {
          newPeople.push({mother: person.name, father: mate.name}); // twins
        }
      }
    }
    return {...person, age: person.age + 1}
  });
  tempPeople = await tempPeople.filter((person) => {
    // @TODO console log any chromosomes that don't exist in anyone else
    if (person.age > 85) {
      return Math.random() > 0.166;
    } else if (person.age > 75) {
      return Math.random() > 0.056;
    } else if (person.age > 65) {
      return Math.random() > 0.019;
    } else if (person.age > 55) {
      return Math.random() > 0.007;
    }
    return Math.random() > 0.001;
  }); // Kill some off
  tempPeople = await tempPeople.map(person => {
    if (person.mate) {
      const mate = tempPeople.find((p) => {
        return p.name === person.mate;
      });
      if (!mate) {
        person.mate = undefined;
      }
    }
    return person;
  });
  if (newPeople.length > 0) {
    const newBorns = await makeNewPeople(newPeople, people);
    console.log(newBorns);
    setPeople(tempPeople.concat(newBorns));
  } else {
    setPeople(tempPeople);
  }
  setYear(year + 1);
}

function selectMate(name, mateName, people, setPeople) {
  const tempPeople = people.map(person => {
    if (name === person.name) {
      if (mateName === 'none') {
        return {...person, mate: undefined}
      }
      return {...person, mate: mateName}
    }
    return {...person}
  })
  setPeople(tempPeople);
}

function App() {
  const [people, setPeople] = useState([]);
  const [year, setYear] = useState(0);

  useEffect(() => {
    getInitialPeople(setPeople);
  }, []);

  return (
    <div>
      Years after the event: {year}
      <Chromosomes people={people}/>
      <ul>
        {people.map((person) => (
          <Person {...person} key={person.name} setPeople={setPeople} people={people}
                  selectMate={selectMate}/>
        ))}
      </ul>
      <button onClick={() => passOneYear(year, people, setPeople, setYear)}>
        Pass one year
      </button>
    </div>
  );
}

export default App;
