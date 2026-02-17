console.log(
  2.4673.toFixed(),      // 2
  2.4673.toFixed(1),     // 2,5
  2.4673.toFixed(2),     // 2,47

  -2.4673.toFixed(2),    // -2,47 number
  (-2.4673).toFixed(2),  // "-2,47" string

  //ATTENTION
  typeof (-2.4673.toFixed(2)),    // number
  typeof ((-2.4673).toFixed(2)),  // string
);