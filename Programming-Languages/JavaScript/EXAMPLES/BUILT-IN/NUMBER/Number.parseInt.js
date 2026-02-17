console.log (
    Number.parseInt('1e123',10),      // 1
    Number.parseInt('Infinity'),      // NaN
    Number.parseInt('1/0'),           // 1
    Number.parseInt('13.03',10),      // 13
    Number.parseInt('13.03',16),      // 19 (1_ * 16 + 3_ * 1)
    Number.NaN
);