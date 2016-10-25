var fs = require('fs');
var lineReader=require('readline').createInterface({
  input: fs.createReadStream('FoodFacts.csv'),
  output: fs.createWriteStream('barchart.json')
})
var json=[];
var salt_values=[0,0,0,0,0,0,0,0];
var sugar_values=[0,0,0,0,0,0,0,0];
var headers=[];
var c=0;
var country_arr=["Netherlands","Canada","United Kingdom","Australia","France","Germany","Spain","South Africa"];
lineReader.on('line',function (line){
  if(c==0){
    headers=line.split(',');
    c++;
  }
  else{
    var currentLineData = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

    for(var i=0;i<8;i++){
      if(currentLineData[31]==country_arr[i]){
        if((currentLineData[102]!="")&&(currentLineData[116]!="")){
        sugar_values[i]+=parseFloat(currentLineData[102]);
        salt_values[i]+=parseFloat(currentLineData[116]);
      }
    }

  }
}

});
lineReader.on('close',function(line){
  for(var i=0;i<8;i++){
    json.push({
      "Country_Name":country_arr[i],
      "Sugar_Content":sugar_values[i],
      "Salt_Content":salt_values[i]
    });
  }
  var jso=JSON.stringify(json);
  fs.appendFile('barchart.json',jso,function(err) {});
})
