function splitString(str) {
  let indexOfPlus = str.indexOf("+");
  let indexOfMinus = str.indexOf("-");

  let balance, change;

  if (indexOfPlus !== -1) {
    balance = str.substring(0, indexOfPlus);
    change = str.substring(indexOfPlus);
  } else if (indexOfMinus !== -1) {
    balance = str.substring(0, indexOfMinus);
    change = str.substring(indexOfMinus);
  } else {
    console.log(`String used ${str}`);
    throw new Error("String format not recognized");
  }

  return {
    balance: balance,
    change: change,
  };
}

module.exports = { splitString };
