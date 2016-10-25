var fs = require('fs');//include fs module
var lineReader=require('readline').createInterface({
  input: fs.createReadStream('FoodFacts.csv'),
  output: fs.createWriteStream('StackedBarChart.json')
})//creating interface between input and output file
var json=[],salt_values=[0,0,0,0,0,0,0,0],sugar_values=[0,0,0,0,0,0,0,0],headers=[],country_arr=["Netherlands","Canada","United Kingdom","Australia","France","Germany","Spain","South Africa"];//creating arrays required
var first=0,country_col=0,sugar_col=0,salt_col=0;
lineReader.on('line',function (line){
  if(first==0)
  {
    headers=line.split(',');//stores column names in header array
    first ++;
    for(var i=0;i<headers.length;i++){
      if(headers[i]=="countries")
      country_col=i;//identifies country column
      else if(headers[i]=="sugars_100g")
      sugar_col=i;//identifies sugar column
      else if(headers[i]=="salt_100g")
      salt_col=i;//identifies salt column
    }
  }
  else{
    var currentLineData = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);//stores current line values in currentLineData
    for(var i=0;i<country_arr.length;i++){
      if(currentLineData[country_col]==country_arr[i]){
        if((currentLineData[sugar_col]!="")&&(currentLineData[salt_col]!="")){
          sugar_values[i]+=parseFloat(currentLineData[sugar_col]);//adding sugar contents to sugar_values array
          salt_values[i]+=parseFloat(currentLineData[salt_col]);//adding sugar contents to salt_values array
        }
      }
    }
  }
});
lineReader.on('close',function(line){
  for(var i=0;i<country_arr.length;i++){
    json.push({
      "Country_Name":country_arr[i],
      "Sugar_Content":sugar_values[i],
      "Salt_Content":salt_values[i]
    });
  }
  var jso=JSON.stringify(json);
  fs.appendFile('StackedBarChart.json',jso,function(err) {});
})
