var fs = require('fs');
var lineReader=require('readline').createInterface({
  input: fs.createReadStream('FoodFacts.csv'),
  output: fs.createWriteStream('stackedChart2.json')
})
var json=[];
var headers=[];
var fat_value=0;
var carbohydrate_value=0;
var protein_value=0;
var North_Europe=[0,0,0];
var Central_Europe=[0,0,0];
var South_Europe=[0,0,0];
var c=0;
var country_col=0;
var fat_col=0;
var protein_col=0;
var carbohydrate_col=0;
lineReader.on('line',function (line){
  if(c==0){
    headers=line.split(',');
    c++;
    for(var i=0;i<headers.length;i++){
      if(headers[i]=="countries")
      country_col=i;
      else if(headers[i]=="trans_fat_100g")
      fat_col=i;
      else if(headers[i]=="carbohydrates_100g")
      carbohydrate_col=i;
      else if(headers[i]=="proteins_100g")
      protein_col=i;
    }
  }
  else{
    var currentLineData = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    
    if((currentLineData[country_col]=="United Kingdom")||(currentLineData[country_col]=="Denmark")||(currentLineData[country_col]=="Sweden")||(currentLineData[country_col]=="Norway")){
      if(currentLineData[fat_col]!="")
      North_Europe[0]+=parseFloat(currentLineData[fat_col]);
      if(currentLineData[carbohydrate_col]!="")
      North_Europe[1]+=parseFloat(currentLineData[carbohydrate_col]);
      if(currentLineData[protein_col]!="")
      North_Europe[2]+=parseFloat(currentLineData[protein_col]);

    }
    else if((currentLineData[country_col]=="France")||(currentLineData[country_col]=="Belgium")||(currentLineData[country_col]=="Germany")||(currentLineData[country_col]=="Switzerland")||(currentLineData[country_col]=="Netherlands")){
if(currentLineData[fat_col]!="")
      Central_Europe[0]+=parseFloat(currentLineData[fat_col]);
      if(currentLineData[carbohydrate_col]!="")
      Central_Europe[1]+=parseFloat(currentLineData[carbohydrate_col]);
      if(currentLineData[protein_col]!="")
      Central_Europe[2]+=parseFloat(currentLineData[protein_col]);
    }
    else if((currentLineData[country_col]=="Portugal")||(currentLineData[country_col]=="Greece")||(currentLineData[country_col]=="Italy")||(currentLineData[country_col]=="Spain")||(currentLineData[country_col]=="Croatia")||(currentLineData[country_col]=="Albania")){
      if(currentLineData[fat_col]!="")
      South_Europe[0]+=parseFloat(currentLineData[fat_col]);
      if(currentLineData[carbohydrate_col]!="")
      South_Europe[1]+=parseFloat(currentLineData[carbohydrate_col]);
      if(currentLineData[protein_col]!="")
      South_Europe[2]+=parseFloat(currentLineData[protein_col]);
    }
  }

});
lineReader.on('close',function(line){
      json.push({
      "Region":"North_Europe",
      "Fat_Content":North_Europe[0],
      "Carbohydrate_Content":North_Europe[1],
      "Protein_Content":North_Europe[2],
    });
    json.push({
    "Region":"Central_Europe",
    "Fat_Content":Central_Europe[0],
    "Carbohydrate_Content":Central_Europe[1],
    "Protein_Content":Central_Europe[2],
  });
  json.push({
  "Region":"South_Europe",
  "Fat_Content":South_Europe[0],
  "Carbohydrate_Content":South_Europe[1],
  "Protein_Content":South_Europe[2],
});

  var jso=JSON.stringify(json);
  fs.appendFile('stackedChart2.json',jso,function(err) {});
})
