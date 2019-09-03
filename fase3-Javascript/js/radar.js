/**
 * ---------------------------------------
 * This demo was created using amCharts 4.
 * 
 * For more information visit:
 * https://www.amcharts.com/
 * 
 * Documentation is available at:
 * https://www.amcharts.com/docs/v4/
 * ---------------------------------------
 */

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

/* Create chart instance */
var chart = am4core.create("chartdiv", am4charts.RadarChart);

/* Add data */

fetch('http://localhost:3000/api/radar/positivos').then(function(response) {
    return response.text();
    }).then(function(text) {
        var objects = JSON.parse(text)
        var uber = []
        var cabify = []     
        for (let index = 0; index < objects.length; index++) {        
            if(objects[index].app.trim() === "uber"){ 
                uber.push(objects[index])
            }else{
                cabify.push(objects[index])
            }  
        }
        var data = []
        for (let index = 0; index < uber.length; index++) { 
            for (let index2 = 0; index2 < cabify.length; index2++) {
                if(uber[index].ubicacion.trim() === cabify[index2].ubicacion.trim()){ 
                    data.push( {"ubicacion" : uber[index].ubicacion , "uber": uber[index].positivos, "cabify": cabify[index2].positivos })  
                }
            }           
        }
        console.log(data)
        chart.data = data

        /* Create axes */
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "ubicacion";

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.axisFills.template.fill = chart.colors.getIndex(2);
        valueAxis.renderer.axisFills.template.fillOpacity = 0.05;

        /* Create and configure series */
        var series = chart.series.push(new am4charts.RadarSeries());
        series.dataFields.valueY = "cabify";
        series.dataFields.categoryX = "ubicacion";
        series.name = "a";
        series.strokeWidth = 1;
        series.fillOpacity = 0.1;
        
        var series2 = chart.series.push(new am4charts.RadarSeries());
        series2.dataFields.valueY = "uber";
        series2.dataFields.categoryX = "ubicacion";
        series2.name = "b";
        series2.strokeWidth = 1;
        series2.stroke = am4core.color("#0066CC");
        series2.fill = am4core.color("red");
        series2.fillOpacity = 0.1;

    });




