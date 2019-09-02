
$( document ).ready(function() {
am4core.useTheme(am4themes_moonrisekingdom);
am4core.useTheme(am4themes_animated);

var series1=crearChart("chart1");
var series2=crearChart("chart2");
var request = new XMLHttpRequest();
  request.open('GET', 'http://localhost:3000/wordcloud/positivas', true)
  request.onload = function() {
     var data= this.response;
  
    if (request.status >= 200 && request.status < 400) {
        series1.text = data;
    } else {
      console.log('error');
    }
  }
  request.send();

  var request2 = new XMLHttpRequest();
  request2.open('GET', 'http://localhost:3000/wordcloud/negativas', true)
  request2.onload = function() {
     var data= this.response;
  
    if (request2.status >= 200 && request2.status < 400) {
        series2.text = data;
    } else {
      console.log('error');
    }
  }
  request2.send();
});


function crearChart(name){
  var chart = am4core.create(name, am4plugins_wordCloud.WordCloud);
  var series = chart.series.push(new am4plugins_wordCloud.WordCloudSeries());
  
  series.accuracy = 4;
  series.step = 15;
  series.rotationThreshold = 0.5;
  series.maxCount = 300;
  series.minWordLength = 2;
  series.labels.template.tooltipText = "{word}: {value}";
  series.fontFamily = "Courier New";
  series.maxFontSize = am4core.percent(25);
return series
}