import React from 'react';

const Pairer = ({ people, selectMate, mate, femaleName, setPeople }) => (
  <select value={mate} onChange={(event) => selectMate(femaleName, event.target.value, people, setPeople)}>
    <option value='none'>- Choose Mate -</option>
    {people.map((person) => (
      person.sex === 'male' && <option key={`selector-${person.name}`} value={person.name}>{person.name}</option>
    ))}
  </select>
);

export default Pairer
