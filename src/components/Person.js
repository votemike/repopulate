import React from 'react';
import Pairer from "./Pairer";

const Person = ({ name, age, sex, mate, mother, father, setPeople, people, selectMate }) => (
  <li>
    <span style={{color: sex === 'male' ? 'blue' : 'pink'}}>{name}</span>{' '}
      - {age}
    {sex === 'female' && age >= 18 && <Pairer people={people} femaleName={name} mate={mate} selectMate={selectMate} setPeople={setPeople}/>}
    {mother && father && <ul><li>{mother}</li><li>{father}</li></ul>}
  </li>
);

export default Person
