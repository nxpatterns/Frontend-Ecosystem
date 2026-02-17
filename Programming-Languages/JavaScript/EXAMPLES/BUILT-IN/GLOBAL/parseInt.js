console.log (
    parseInt('1e123',10),      // 1
    parseInt('Infinity'),      // NaN
    parseInt('1/0'),           // 1
    parseInt('13.03',10),      // 13
    parseInt('13.03',16),      // 19 (1_ * 16 + 3_ * 1)
    parseInt(NaN),             // NaN
);