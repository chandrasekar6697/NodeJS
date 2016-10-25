var fs = require('fs');
var people = [];
var json=[];
var salt_col=0;
var sugar_col=0
var country_col=0;
var d="";
var r=0;
var country_arr=["Netherlands","Canada","United Kingdom","Australia","France","Germany","Spain","South Africa"];
var combine_values=[0,0,0,0,0,0,0,0];
var fileContents = fs.readFileSync('FoodFacts.csv');
var lines = fileContents.toString().split('\n');

for (var i = 0; i < lines.length; i++) {
   people.push(lines[i].toString().split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/));
}
function find_col(d){
  var x=0;
  while(1){
      if(people[r][x]==d)
      break;
    x++;
  }
  return x;
}
salt_col=find_col("salt_100g");
sugar_col=find_col("sugars_100g");
country_col=find_col("countries");
for(var i=0;i<lines.length;i++){
  for(var i=0;i<8;i++){
    if(people[i][country_col]==country_arr[i]){
      if((people[i][sugar_col]!="")&&(people[i][salt_col]!="")){
      combine_values[i]+=parseFloat(people[i][sugar_col])+parseFloat(people[i][salt_col]);
    }
  }
  json.push({
    "Country_Name":people[i][country_col],
    "Combination":combine_values[i]
  });
}
  }
  for(var k=0;k<8;k++){
console.log(country_arr[k]+"  "+combine_values[k]);
  }
