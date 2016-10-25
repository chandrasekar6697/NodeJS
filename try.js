var fs = require('fs');
var lineReader=require('readline').createInterface({
  input: fs.createReadStream('FoodFacts.csv'),
  output: fs.createWriteStream('barchart.json')
})
var json=[];
var combine_values=[0,0,0,0,0,0,0,0]
var headers=[];
var c=0;
var Netherlands_combine=0;
var Canada_combine=0;
var UK_combine=0;
var Australia_combine=0;
var France_combine=0;
var Germany_combine=0;
var Spain_combine=0;
var SA_combine=0;
var country_arr=["Netherlands","Canada","United Kingdom","Australia","France","Germany","Spain","South Africa"];
lineReader.on('line',function (line){
  if(c==0){
    headers=line.split(',');
    c++;
  }
  else{
    var currentLineData = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

     if(currentLineData[31]=="Netherlands"){
       if((currentLineData[102]!="")&&(currentLineData[116]!="")){
       Netherlands_combine+=parseFloat(currentLineData[102])+parseFloat(currentLineData[116]);
console.log(Netherlands_combine);
     }
     var jsonObj=[];
     jsonObj["Country_Name"]=currentLineData[31];
     jsonObj["Combination"]= Netherlands_combine;
     json.push(jsonObj);
   }
   else if(currentLineData[31]=="Canada"){
     if((currentLineData[102]!="")&&(currentLineData[116]!="")){
     Canada_combine+=parseFloat(currentLineData[102])+parseFloat(currentLineData[116]);
   }
   json.push({
     "Country_Name":currentLineData[31],
     "Combination":Canada_combine
   });
 }
 else if(currentLineData[31]=="United Kingdom"){
   if((currentLineData[102]!="")&&(currentLineData[116]!="")){
   UK_combine+=parseFloat(currentLineData[102])+parseFloat(currentLineData[116]);
 }
 json.push({
   "Country_Name":currentLineData[31],
   "Combination":UK_combine
 });
}
else if(currentLineData[31]=="Australia"){
  if((currentLineData[102]!="")&&(currentLineData[116]!="")){
  Australia_combine+=parseFloat(currentLineData[102])+parseFloat(currentLineData[116]);
}
json.push({
  "Country_Name":currentLineData[31],
  "Combination":Australia_combine
});
}
else if(currentLineData[31]=="France"){
  if((currentLineData[102]!="")&&(currentLineData[116]!="")){
  France_combine+=parseFloat(currentLineData[102])+parseFloat(currentLineData[116]);
}
json.push({
  "Country_Name":currentLineData[31],
  "Combination":France_combine
});
}
else if(currentLineData[31]=="Germany"){
  if((currentLineData[102]!="")&&(currentLineData[116]!="")){
  Germany_combine+=parseFloat(currentLineData[102])+parseFloat(currentLineData[116]);
}
json.push({
  "Country_Name":currentLineData[31],
  "Combination":Germany_combine
});
}

   else if(currentLineData[31]=="Spain"){
     if((currentLineData[102]!="")&&(currentLineData[116]!="")){
     Spain_combine+=parseFloat(currentLineData[102])+parseFloat(currentLineData[116]);
   }
   json.push({
     "Country_Name":currentLineData[31],
     "Combination":Spain_combine
   });
 }
 else if(currentLineData[31]=="South Africa"){
   if((currentLineData[102]!="")&&(currentLineData[116]!="")){
   SA_combine+=parseFloat(currentLineData[102])+parseFloat(currentLineData[116]);
 }
 json.push({
   "Country_Name":currentLineData[31],
   "Combination":SA_combine
 });
}

  }
})
var jso=JSON.stringify(json);
fs.appendFile('barchart.json',jso,function(err) {});
