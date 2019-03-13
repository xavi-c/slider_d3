const extCalculate = require('./calculate.js');

test('test calculate function', () => {
    expect(Number(extCalculate.calculate(10, 500, 3).toFixed(2))).toBe(201.06);
    expect(Number(extCalculate.calculate(10, 500, 4).toFixed(2))).toBe(157.74);
    expect(Number(extCalculate.calculate(10, 500, 5).toFixed(2))).toBe(131.90);
    expect(Number(extCalculate.calculate(10, 500, 6).toFixed(2))).toBe(114.80);
    expect(Number(extCalculate.calculate(10, 500, 7).toFixed(2))).toBe(102.70);
    expect(Number(extCalculate.calculate(10, 500, 8).toFixed(2))).toBe(93.72);
    expect(Number(extCalculate.calculate(10, 500, 9).toFixed(2))).toBe(86.82);
    expect(Number(extCalculate.calculate(10, 500, 10).toFixed(2))).toBe(81.37);
    expect(Number(extCalculate.calculate(10, 500, 11).toFixed(2))).toBe(76.98);
    expect(Number(extCalculate.calculate(10, 500, 12).toFixed(2))).toBe(73.38);

    expect(Number(extCalculate.calculate(10, 1500, 3).toFixed(2))).toBe(603.17);
    expect(Number(extCalculate.calculate(10, 1500, 4).toFixed(2))).toBe(473.21);
    expect(Number(extCalculate.calculate(10, 1500, 5).toFixed(2))).toBe(395.70);
    expect(Number(extCalculate.calculate(8, 1500, 6).toFixed(2))).toBe(324.47);
    expect(Number(extCalculate.calculate(8, 1500, 7).toFixed(2))).toBe(288.11);
    expect(Number(extCalculate.calculate(8, 1500, 8).toFixed(2))).toBe(261.02);
    expect(Number(extCalculate.calculate(6, 1500, 9).toFixed(2))).toBe(220.53);
    expect(Number(extCalculate.calculate(6, 1500, 10).toFixed(2))).toBe(203.80);
    expect(Number(extCalculate.calculate(6, 1500, 11).toFixed(2))).toBe(190.19);
    expect(Number(extCalculate.calculate(6, 1500, 12).toFixed(2))).toBe(178.92);
});