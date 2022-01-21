import React from 'react';
import Pairer from "./Pairer";
import './person.css';
import {ReactComponent as Avatar} from '../avatar.svg';

const Person = ({ name, sex, mate, mother, father, setPeople, people, selectMate, showParents }) => (
  <li className={sex}>
    <Avatar width="24px" height="24px" fill={sex === 'male' ? 'blue' : 'pink'}/>
    <span style={{color: sex === 'male' ? 'blue' : 'pink'}}>{name}</span>
    {sex === 'female' && <>{' '} - <Pairer people={people} femaleName={name} mate={mate} selectMate={selectMate} setPeople={setPeople}/></>}
    {showParents && mother && father && <ul><li>Mother - {mother}</li><li>Father - {father}</li></ul>}
  </li>
);

export default Person
