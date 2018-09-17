var sample = [
  {
    "numberSystem": {
      "number": 1
    }
  },
  {
    "numberSystem": {
      "number": 345
    }
  },
  {
    "numberSystem": {
      "number": 5467
    }
  },
  {
    "numberSystem": {}
  },
  {
    "numberSystem": {
      "number": 234
    }
  },
  {
    "numberSystem": {
      "number": 568
    }
  },
  {
    "numberSystem": {
      "number": 5638
    }
  },
  {
    "numberSystem": {
      "number": 2983
    }
  },
  {
    "numberSystem": {
      "number": 29
    }
  },
  {
    "numberSystem": {
      "number": 923
    }
  },
  {
    "numberSystem": {
      "number": null
    }
  },
  {
    "sampleWithMissingField": {}
  }
];

/*
* Function to validator if path if present in the object or not.
* @param Object<any> : The object to be tested
* @param Array<Array<string>> : Array containing string path
* @output boolean : Boolean indication presence of path in the operation object
*/
function pathValidator(operationObj, pathArray) {
  var pathAvailable = pathArray.reduce((accBol, iterPath) => {
          accBol = accBol && Object.prototype.hasOwnProperty.call(operationObj, iterPath);
          if (accBol) {
            operationObj = operationObj[iterPath];
          }
          return accBol;
      }, true);
  return pathAvailable;
}
/**
* Function to extract value present in nested path from the operation object
* @param Object<any> : The object to be tested
* @param Array<Array<string>> : Array containing string path
* @output element<any> : Array<element> Value present at nested path in the operation object
*/
function valueExtractor(operationObj, pathArray) {
    var pathAvailable = pathArray.reduce((accBol, iterPath) => {
          accBol = accBol && Object.prototype.hasOwnProperty.call(operationObj, iterPath);
          if (accBol) {
            operationObj = operationObj[iterPath];
          }
          return accBol;
      }, true);
    if(pathAvailable) {
    return operationObj;
  }
}
/*
* @param Array<Array> : Input Array
* @param path<String> : String path of traversal
* @output Object<any> : Object containig max number 
*/
function maxFinder(sampleArray, path) {
 var pathArray = path.split('.');
 return (sampleArray.filter(item => {
      return pathValidator(item, pathArray);
 })
 .reduce((maxNumber, iterObj) => {
  var iterObjVal = valueExtractor(iterObj,pathArray);
  if(maxNumber > iterObjVal) {
    return maxNumber;
  } else {
    return iterObjVal;
  }
 }, valueExtractor(sampleArray[0], pathArray)));
}

/*
* @param Array<Array> : Input Array
* @param path<String> : String path of traversal
* @output Object<any> : Object containig max number 
*/
function alsoMaxFinder(sampleArray, path) {
 var pathArray = path.split('.');
 return sampleArray.reduce((maxNumber, iterObj) => {
  var iterObjVal = valueExtractor(iterObj,pathArray);
  if(maxNumber > iterObjVal) {
    return maxNumber;
  } else {
    return iterObjVal;
  }
 }, valueExtractor(sampleArray[0], pathArray));
}

var maxValue = maxFinder(sample, "numberSystem.number");
console.log(maxValue);
var alsoMaxValue = maxFinder(sample, "numberSystem.number");
console.log(alsoMaxValue);



//Code to check pallindrome
var str1 = 'level';
var str2 = 'avinash';

var reverse = function (str) {
return str.split('').reverse().join('');
};

var equator = function(str1, str2) {
return str1 === str2;
};

var ispallindrome = function(rf,ef,str) {
var args = Array.prototype.slice.call(arguments);
console.log(args);
if (!args[1]) {
  return args[0](args[2]);
} else {
  return (args[1](args[0](args[2]), str));
}
};

var boundedReverse = _.partial(ispallindrome, reverse);
var boundedString1 = _.partial(boundedReverse, _ , str1);
console.log(boundedString1());
var boundedString2 = _.partial(boundedReverse, _ , str2);
console.log(boundedString2());

console.log(boundedString1(equator));
console.log(boundedString2(equator));
