function getAncestorsNames(name, people) {
  let ancestorNames = [name];

  const person = findPerson(name, people);

  if (person.mother) {
    ancestorNames = ancestorNames.concat(getAncestorsNames(person.mother, people));
  }

  if (person.father) {
    ancestorNames = ancestorNames.concat(getAncestorsNames(person.father, people));
  }

  return ancestorNames;
}

export function getMaxAncestorGenerations(name, people) {
  const person = findPerson(name, people);
  const mothersAncestors = person.mother ? getMaxAncestorGenerations(person.mother, people) + 1 : 0;
  const fathersAncestors = person.father ? getMaxAncestorGenerations(person.father, people) + 1 : 0;

  return Math.max(mothersAncestors, fathersAncestors);
}

export function findPerson(name, people) {
  return people.find((person) => {
    return person.name === name;
  });
}

export function peopleAreRelated(name1, name2, people) {
  const personAncestors = getAncestorsNames(name1, people);
  const mateAncestors = getAncestorsNames(name2, people);
  const commonAncestors = personAncestors.filter(value => mateAncestors.includes(value));
  return commonAncestors.length > 0;
}
