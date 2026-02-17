var a = ['a','b','c','d','e','f','g','h'];
console.log(a.copyWithin(2));
// moving array from 0 if not given 2 places right (if positive)
//  [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h' ]
//     0 -  1 -  2 -  3  - 4 -  5 -  6 -  7
//              'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'
//  [ 'a', 'b', 'a', 'b', 'c', 'd', 'e', 'f' ]


b = ['a','b','c','d','e','f','g','h'];
console.log(b.copyWithin(2,1));
//  [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h' ]
//     0 -  1 -  2 -  3  - 4 -  5 -  6 -  7
//              'b', 'c', 'd', 'e', 'f', 'g', 'h'
//  [ 'a', 'b',                              ]
//  [ 'a', 'b', 'b', 'c', 'd', 'e', 'f', 'g' ]

c = ['a','b','c','d','e','f','g','h'];
console.log(c.copyWithin(3,0));
//  [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h' ]
//     0 -  1 -  2 -  3  - 4 -  5 -  6 -  7
//                   'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'
//  [ 'a', 'b', 'c',                         ]
//  [ 'a', 'b', 'c', 'a', 'b', 'c', 'd', 'e' ]

d = ['a','b','c','d','e','f','g','h'];
console.log(d.copyWithin(1,4));
//  [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h' ]
//     0 -  1 -  2 -  3  - 4 -  5 -  6 -  7
//         'e', 'f', 'g', 'h'
//  [ 'a',                     'f', 'g', 'h' ]
//  [ 'a', 'e', 'f', 'g', 'h', 'f', 'g', 'h' ]


e = ['a','b','c','d','e','f','g','h'];
console.log(e.copyWithin(1,4,5));
//  [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h' ]
//     0 -  1 -  2 -  3  - 4 -  5 -  6 -  7
//         'e',
//  [ 'a',      'c', 'd', 'e', 'f', 'g', 'h' ]
//  [ 'a', 'e', 'c', 'd', 'e', 'f', 'g', 'h' ]

f = ['a','b','c','d','e','f','g','h'];
console.log(f.copyWithin(4,2,5));
//  [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h' ]
//     0 -  1 -  2 -  3  - 4 -  5 -  6 -  7
//                        'c', 'd', 'e',
//  [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h' ]
//  [ 'a', 'b', 'c', 'd', 'c', 'd', 'e', 'h' ]