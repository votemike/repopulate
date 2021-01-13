import {findPerson, getMaxAncestorGenerations, peopleAreRelated} from "./utils";

describe('findPerson', () => {
  test('Person is found', () => {
    const people = [
      {
        name: 'Foo',
        mother: 'Bar'
      },
      {
        name: 'Bar'
      }
    ];
    expect(findPerson('Foo', people)).toEqual({name: 'Foo', mother: 'Bar'});
  });
});

describe('getMaxAncestorGenerations', () => {
  test('0 ancestor generations', () => {
    const people = [
      {
        name: 'Foo'
      },
      {
        name: 'Bar'
      }
    ];
    expect(getMaxAncestorGenerations('Foo', people)).toEqual(0);
  });
  test('1 ancestor generation', () => {
    const people = [
      {
        name: 'Foo',
        mother: 'Bar'
      },
      {
        name: 'Bar'
      }
    ];
    expect(getMaxAncestorGenerations('Foo', people)).toEqual(1);
  });

  test('2 ancestor generations', () => {
    const people = [
      {
        name: 'Foo',
        mother: 'Bar'
      },
      {
        name: 'Bar',
        father: 'Qux'
      },
      {
        name: 'Qux'
      }
    ];
    expect(getMaxAncestorGenerations('Bar', people)).toEqual(1);
    expect(getMaxAncestorGenerations('Foo', people)).toEqual(2);
  });

  test('3 ancestor generations', () => {
    const people = [
      {
        name: 'Foo',
        mother: 'Bar',
        father: 'Baz',
      },
      {
        name: 'Bar',
        mother: 'Qux',
        father: 'Quux',
      },
      {
        name: 'Baz'
      },
      {
        name: 'Qux',
        mother: 'Grault'
      },
      {
        name: 'Quux'
      },
      {
        name: 'Grault'
      }
    ];
    expect(getMaxAncestorGenerations('Foo', people)).toEqual(3);
    const people2 = [
      {
        name: 'Foo',
        mother: 'Bar',
        father: 'Baz',
      },
      {
        name: 'Baz',
        father: 'Quux',
      },
      {
        name: 'Bar'
      },
      {
        name: 'Quux',
        father: 'Grault'
      },
      {
        name: 'Grault'
      }
    ];
    expect(getMaxAncestorGenerations('Foo', people2)).toEqual(3);
  });
});

describe('peopleAreRelated', () => {
  test('Handles no parent', () => {
    const people = [
      {
        name: 'Foo'
      },
      {
        name: 'Bar'
      }
    ];
    expect(peopleAreRelated('Foo', 'Bar', people)).toBe(false);
  });

  test('No relation', () => {
    const people = [
      {
        name: 'Foo',
        mother: 'Baz',
        father: 'Qux'
      },
      {
        name: 'Bar',
        mother: 'Quux',
        father: 'Quuz'
      },
      {
        name: 'Baz',
      },
      {
        name: 'Qux',
      },
      {
        name: 'Quux',
      },
      {
        name: 'Quuz',
      },
    ];
    expect(peopleAreRelated('Foo', 'Bar', people)).toBe(false);
  });

  test('Brother', () => {
    const people = [
      {
        name: 'Foo',
        mother: 'Baz',
        father: 'Qux'
      },
      {
        name: 'Bar',
        mother: 'Baz',
        father: 'Qux'
      },
      {
        name: 'Baz',
      },
      {
        name: 'Qux',
      },
    ];
    expect(peopleAreRelated('Foo', 'Bar', people)).toBe(true);
  });

  test('Half Brother', () => {
    const people = [
      {
        name: 'Foo',
        mother: 'Baz',
        father: 'Qux'
      },
      {
        name: 'Bar',
        mother: 'Baz',
        father: 'Quuz'
      },
      {
        name: 'Baz',
      },
      {
        name: 'Qux',
      },
      {
        name: 'Quuz',
      },
    ];
    expect(peopleAreRelated('Foo', 'Bar', people)).toBe(true);
  });

  test('Father', () => {
    const people = [
      {
        name: 'Foo',
        father: 'Baz'
      },
      {
        name: 'Baz',
      },
    ];
    expect(peopleAreRelated('Foo', 'Baz', people)).toBe(true);
  });

  test('GrandFather', () => {
    const people = [
      {
        name: 'Foo',
        mother: 'Bar',
        father: 'Qux'
      },
      {
        name: 'Bar',
        father: 'Quuz'
      },
      {
        name: 'Baz',
      },
      {
        name: 'Qux',
      },
      {
        name: 'Quuz',
      },
    ];
    expect(peopleAreRelated('Foo', 'Quuz', people)).toBe(true);
  });
});
