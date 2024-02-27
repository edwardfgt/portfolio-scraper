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
    //regex to check if string is a valid number (if string returned isn't standard format)
  } else if (/^[\$]?[\d,]+(\.\d+)?$/.test(str)) {
    balance = str;
    change = "No Change";
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
