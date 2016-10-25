var fs = require('fs');
var people = [];
var salt_col=0;
var sugar_col=0
var country_col=0;
var d="";
var r=0;
var Netherlands_combine=0;
var Canada_combine=0;
var UK_combine=0;
var Australia_combine=0;
var France_combine=0;
var Germany_combine=0;
var Spain_combine=0;
var SA_combine=0;
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
  if(people[i][country_col]=="Netherlands"){
    if((people[i][sugar_col]!="")&&(people[i][salt_col]!="")){
    Netherlands_combine+=parseFloat(people[i][sugar_col])+parseFloat(people[i][salt_col]);
  }
  }
  else if(people[i][country_col]=="Canada"){
    if((people[i][sugar_col]!="")&&(people[i][salt_col]!="")){
    Canada_combine+=parseFloat(people[i][sugar_col])+parseFloat(people[i][salt_col]);
  }
  }
  else if(people[i][country_col]=="United Kingdom"){
    if((people[i][sugar_col]!="")&&(people[i][salt_col]!="")){
    UK_combine+=parseFloat(people[i][sugar_col])+parseFloat(people[i][salt_col]);
  }
  }
  else if(people[i][country_col]=="Australia"){
    if((people[i][sugar_col]!="")&&(people[i][salt_col]!="")){
    Australia_combine+=parseFloat(people[i][sugar_col])+parseFloat(people[i][salt_col]);
  }
  }
  else if(people[i][country_col]=="France"){
    if((people[i][sugar_col]!="")&&(people[i][salt_col]!="")){
    France_combine+=parseFloat(people[i][sugar_col])+parseFloat(people[i][salt_col]);
  }
  }
  else if(people[i][country_col]=="Germany"){
    if((people[i][sugar_col]!="")&&(people[i][salt_col]!="")){
    Germany_combine+=parseFloat(people[i][sugar_col])+parseFloat(people[i][salt_col]);
  }
  }
  else if(people[i][country_col]=="Spain"){
    if((people[i][sugar_col]!="")&&(people[i][salt_col]!="")){
      Spain_combine+=parseFloat(people[i][sugar_col])+parseFloat(people[i][salt_col]);
    }
  }
  else if(people[i][country_col]=="South Africa"){
    if((people[i][sugar_col]!="")&&(people[i][salt_col]!="")){
    SA_combine+=parseFloat(people[i][sugar_col])+parseFloat(people[i][salt_col]);
  }
  }
}
console.log("Netherlands"+"  "+Netherlands_combine);
console.log("Canada"+"  "+Canada_combine);
console.log("United Kingdom"+"  "+UK_combine);
console.log("Australia"+"  "+Australia_combine);
console.log("France"+"  "+France_combine);
console.log("Germany"+"  "+Germany_combine);
console.log("Spain"+"  "+Spain_combine);
console.log("South Africa"+"  "+SA_combine);
