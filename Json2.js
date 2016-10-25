var fs = require('fs');
var lineReader=require('readline').createInterface({
  input: fs.createReadStream('FoodFacts.csv'),
  output: fs.createWriteStream('MultiLineChart.json')
})
var json=[];
var headers=[];
var fat_value=0;
var carbohydrate_value=0;
var protein_value=0;
var North_Europe=[0,0,0];
var Central_Europe=[0,0,0];
var South_Europe=[0,0,0];
var first =0;
var country_col=0;
var contents=[];
lineReader.on('line',function (line){
  if(first==0){
    headers=line.split(',');
    first++;
    for(var i=0;i<headers.length;i++){
      if(headers[i]=="countries")
      country_col=i;
      else if(headers[i]=="fat_100g")
      contents[0]=i;
      else if(headers[i]=="carbohydrates_100g")
      contents[1]=i;
      else if(headers[i]=="proteins_100g")
      contents[2]=i;
    }
  }
  else{
    var currentLineData = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    if((currentLineData[country_col]=="United Kingdom")||(currentLineData[country_col]=="Denmark")||(currentLineData[country_col]=="Sweden")||(currentLineData[country_col]=="Norway")){
      for(var i=0;i<3;i++){
        if(currentLineData[contents[i]]!="")
        North_Europe[i]+=parseFloat(currentLineData[contents[i]]);
      }
    }
    else if((currentLineData[country_col]=="France")||(currentLineData[country_col]=="Belgium")||(currentLineData[country_col]=="Germany")||(currentLineData[country_col]=="Switzerland")||(currentLineData[country_col]=="Netherlands")){
      for(var i=0;i<3;i++){
        if(currentLineData[contents[i]]!="")
        Central_Europe[i]+=parseFloat(currentLineData[contents[i]]);
      }
      }

    else if((currentLineData[country_col]=="Portugal")||(currentLineData[country_col]=="Greece")||(currentLineData[country_col]=="Italy")||(currentLineData[country_col]=="Spain")||(currentLineData[country_col]=="Croatia")||(currentLineData[country_col]=="Albania")){
      for(var i=0;i<3;i++){
        if(currentLineData[contents[i]]!="")
        South_Europe[i]+=parseFloat(currentLineData[contents[i]]);
      }
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
  fs.appendFile('MultiLineChart.json',jso,function(err) {});
})
