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
        series.strokeWidth = 2;
        series.fillOpacity = 0.5;
        
        var series2 = chart.series.push(new am4charts.RadarSeries());
        series2.dataFields.valueY = "uber";
        series2.dataFields.categoryX = "ubicacion";
        series2.name = "b";
        series2.strokeWidth = 1;
        series2.stroke = am4core.color("green");
        series2.fill = am4core.color("red");
        series2.fillOpacity = 0.1;

    });



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



/* Create chart instance */
var chart2 = am4core.create("chartdiv2", am4charts.RadarChart);

/* Add data */

fetch('http://localhost:3000/api/radar/negativos').then(function(response) {
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
                    data.push( {"ubicacion" : uber[index].ubicacion , "uber": uber[index].negativos, "cabify": cabify[index2].negativos })  
                }
            }           
        }
        console.log(data)
        chart2.data = data

        /* Create axes */
        var categoryAxis = chart2.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "ubicacion";

        var valueAxis = chart2.yAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.axisFills.template.fill = chart.colors.getIndex(2);
        valueAxis.renderer.axisFills.template.fillOpacity = 0.05;

        /* Create and configure series */
        var series3 = chart2.series.push(new am4charts.RadarSeries());
        series3.dataFields.valueY = "cabify";
        series3.dataFields.categoryX = "ubicacion";
        series3.name = "a";
        series3.strokeWidth = 2;
        series3.fillOpacity = 0.5;
        
        var series4 = chart2.series.push(new am4charts.RadarSeries());
        series4.dataFields.valueY = "uber";
        series4.dataFields.categoryX = "ubicacion";
        series4.name = "b";
        series4.strokeWidth = 1;
        series4.stroke = am4core.color("green");
        series4.fill = am4core.color("red");
        series4.fillOpacity = 0.1;

    });








