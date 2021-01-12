import React from 'react';

const Chromosomes = ({people}) => {
  const chromosomes = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
    10: [],
    11: [],
    12: [],
    13: [],
    14: [],
    15: [],
    16: [],
    17: [],
    18: [],
    19: [],
    20: [],
    21: [],
    22: [],
    23: [],
  };
  people.forEach((person) => {
    for (const [key, value] of Object.entries(person.chromosomes)) {
      chromosomes[key].push(value.a);
      chromosomes[key].push(value.b);
      chromosomes[key] = [...new Set(chromosomes[key])];
    }
  });

  return <table>
    <thead><tr>
      <th>1</th>
      <th>2</th>
      <th>3</th>
      <th>4</th>
      <th>5</th>
      <th>6</th>
      <th>7</th>
      <th>8</th>
      <th>9</th>
      <th>10</th>
      <th>11</th>
      <th>12</th>
      <th>13</th>
      <th>14</th>
      <th>15</th>
      <th>16</th>
      <th>17</th>
      <th>18</th>
      <th>19</th>
      <th>20</th>
      <th>21</th>
      <th>22</th>
      <th>23</th>
    </tr></thead>
    <tbody><tr>
      <td><ul>{chromosomes[1].map((name) => (<li key={name}>{name}</li>))}</ul></td>
      <td><ul>{chromosomes[2].map((name) => (<li key={name}>{name}</li>))}</ul></td>
      <td><ul>{chromosomes[3].map((name) => (<li key={name}>{name}</li>))}</ul></td>
      <td><ul>{chromosomes[4].map((name) => (<li key={name}>{name}</li>))}</ul></td>
      <td><ul>{chromosomes[5].map((name) => (<li key={name}>{name}</li>))}</ul></td>
      <td><ul>{chromosomes[6].map((name) => (<li key={name}>{name}</li>))}</ul></td>
      <td><ul>{chromosomes[7].map((name) => (<li key={name}>{name}</li>))}</ul></td>
      <td><ul>{chromosomes[8].map((name) => (<li key={name}>{name}</li>))}</ul></td>
      <td><ul>{chromosomes[9].map((name) => (<li key={name}>{name}</li>))}</ul></td>
      <td><ul>{chromosomes[10].map((name) => (<li key={name}>{name}</li>))}</ul></td>
      <td><ul>{chromosomes[11].map((name) => (<li key={name}>{name}</li>))}</ul></td>
      <td><ul>{chromosomes[12].map((name) => (<li key={name}>{name}</li>))}</ul></td>
      <td><ul>{chromosomes[13].map((name) => (<li key={name}>{name}</li>))}</ul></td>
      <td><ul>{chromosomes[14].map((name) => (<li key={name}>{name}</li>))}</ul></td>
      <td><ul>{chromosomes[15].map((name) => (<li key={name}>{name}</li>))}</ul></td>
      <td><ul>{chromosomes[16].map((name) => (<li key={name}>{name}</li>))}</ul></td>
      <td><ul>{chromosomes[17].map((name) => (<li key={name}>{name}</li>))}</ul></td>
      <td><ul>{chromosomes[18].map((name) => (<li key={name}>{name}</li>))}</ul></td>
      <td><ul>{chromosomes[19].map((name) => (<li key={name}>{name}</li>))}</ul></td>
      <td><ul>{chromosomes[20].map((name) => (<li key={name}>{name}</li>))}</ul></td>
      <td><ul>{chromosomes[21].map((name) => (<li key={name}>{name}</li>))}</ul></td>
      <td><ul>{chromosomes[22].map((name) => (<li key={name}>{name}</li>))}</ul></td>
      <td><ul>{chromosomes[23].map((name) => (<li key={name}>{name}</li>))}</ul></td>
    </tr></tbody>
  </table>;
};

export default Chromosomes
