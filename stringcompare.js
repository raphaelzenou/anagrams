function stringCompare (string1, string2) {
    var sorted1 = string1.split("").sort().join(""),
        sorted2 = string2.split("").sort().join("");
    console.log(sorted1 === sorted2);
}

// stringCompare('aa','aa');
// stringCompare('ab','aa');
// stringCompare('ab','ba');