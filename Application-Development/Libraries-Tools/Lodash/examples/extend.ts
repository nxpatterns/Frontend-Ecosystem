import { each, extend } from 'lodash';

const somethingFromAPI = [
  { id: 1, whatever: 'foo' },
  { id: 2, whatever: 'bar' },
  { id: 3, whatever: 'bar' },
];

const missingParts = {
  editable: false,
  someProps: {
    clicked: false,
    size: 'normal',
  },
};

each(somethingFromAPI, (item) => {
  extend(item, missingParts);
});

const output = [
  {
    id: 1,
    whatever: 'foo',
    editable: false,
    someProps: { clicked: false, size: 'normal' },
  },
  {
    id: 2,
    whatever: 'bar',
    editable: false,
    someProps: { clicked: false, size: 'normal' },
  },
  {
    id: 3,
    whatever: 'bar',
    editable: false,
    someProps: { clicked: false, size: 'normal' },
  },
];
