var fs = require('fs');
var people = [];
var fileContents = fs.readFileSync('FoodFacts.csv');
var lines = fileContents.toString().split('\n');
for (var i = 0; i < lines.length; i++) {
   people.push(lines[i].toString().split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/));
}
for (var i = 0; i < lines.length; i++) {
   for (var j = 0; j < 6; j++) {
       console.log(people[i][j]);
   }
   console.log('\n');
}
for(var i=0;i<lines.length;i++){
  for(var j=0;j<countries.length;j++){
    if(people[i][country_col]==countries[j]){
      combine+=people[i][salt_col]+people[i][sugar_col];
    }
  }
  console.log(combine);
}
