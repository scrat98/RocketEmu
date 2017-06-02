/******************************* Velocity *******************************************************/
var VelocityConfig = {
    data: {
       datasets: [{
          pointRadius: 0,
          pointHitRadius: 3,
          fill: false,
          backgroundColor: window.chartColors.red,
          borderColor: window.chartColors.red,
          data: []
          }],
    },
    options: {
                responsive: true,
                maintainAspectRatio: true,
                title:{
                    display:true,
                    text:'V(t)',
                    fontSize: 30
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Time (s)',
                            fontSize: 20
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Speed (m/s)',
                            fontSize: 20
                        }
                    }]
                },

                pan: {
                  enabled: true,
                  mode: 'xy'
                },

                zoom: {
                  enabled: true,
                  mode: 'xy'
                }
    }         
};

function VelocityInit(){
    var ctx = document.getElementById("Velocity").getContext("2d");
    window.velocity = Chart.Scatter(ctx, VelocityConfig);
    Reset(window.velocity);
}

function VelocityUpdate(){
    window.velocity.config.data.datasets[0].data.push({x : curT.toFixed(1), y : curV.toFixed(1) });
    window.velocity.update();
};

/******************************* Accelerate *******************************************************/
var AccelerateConfig = {
    data: {
       datasets: [{
          pointRadius: 0,
          pointHitRadius: 3,
          fill: false,
          backgroundColor: window.chartColors.red,
          borderColor: window.chartColors.red,
          data: []
          }],
    },
    options: {
                responsive: true,
                maintainAspectRatio: true,
                title:{
                    display:true,
                    text:'a(t)',
                    fontSize: 30
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Time (s)',
                            fontSize: 20
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Accelerate (m/s2)',
                            fontSize: 20
                        }
                    }]
                },

                pan: {
                  enabled: true,
                  mode: 'xy'
                },

                zoom: {
                  enabled: true,
                  mode: 'xy'
                }
    }         
};

function AccelerateInit(){
    var ctx = document.getElementById("Accelerate").getContext("2d");
    window.accelerate = Chart.Scatter(ctx, AccelerateConfig);
    Reset(window.accelerate);
}

function AccelerateUpdate(){
    window.accelerate.config.data.datasets[0].data.push({x : curT.toFixed(1), y : curA.toFixed(1) });
    window.accelerate.update();
};

/******************************* Height *******************************************************/
var HeightConfig = {
    data: {
       datasets: [{
          pointRadius: 0,
          pointHitRadius: 3,
          fill: false,
          backgroundColor: window.chartColors.red,
          borderColor: window.chartColors.red,
          data: []
          }],
    },
    options: {
                responsive: true,
                maintainAspectRatio: true,
                title:{
                    display:true,
                    text:'H(t)',
                    fontSize: 30
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Time (s)',
                            fontSize: 20
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Height (m)',
                            fontSize: 20
                        }
                    }]
                },

                pan: {
                  enabled: true,
                  mode: 'xy'
                },

                zoom: {
                  enabled: true,
                  mode: 'xy'
                }
    }         
};

function HeightInit(){
    var ctx = document.getElementById("Height").getContext("2d");
    window.height = Chart.Scatter(ctx, HeightConfig);
    Reset(window.height);
}

function HeightUpdate(){
    window.height.config.data.datasets[0].data.push({x : curT.toFixed(1), y : curH.toFixed(1) });
    window.height.update();
};

/******************************* Fuel *******************************************************/
var FuelConfig = {
    data: {
       datasets: [{
          pointRadius: 0,
          pointHitRadius: 3,
          fill: false,
          backgroundColor: window.chartColors.red,
          borderColor: window.chartColors.red,
          data: []
          }],
    },
    options: {
                responsive: true,
                maintainAspectRatio: true,
                title:{
                    display:true,
                    text:'Fuel(t)',
                    fontSize: 30
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Time (s)',
                            fontSize: 20
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Fuel (tons)',
                            fontSize: 20
                        }
                    }]
                },

                pan: {
                  enabled: true,
                  mode: 'xy'
                },

                zoom: {
                  enabled: true,
                  mode: 'xy'
                }
    }         
};

function FuelInit(){
    var ctx = document.getElementById("Fuel").getContext("2d");
    window.fuel = Chart.Scatter(ctx, FuelConfig);
    Reset(window.fuel);
}

function FuelUpdate(){
    window.fuel.config.data.datasets[0].data.push({x : curT.toFixed(1), y : curFuel.toFixed(1) });
    window.fuel.update();
};

/*************************** help functions **************************************************/
function PointVisUpdate(graph){
  if(graph.config.data.datasets[0].pointRadius == 0)
    PointOn(graph.config);
  else 
    PointOff(graph.config);

  graph.update();
};

function PointOn(config){
    config.data.datasets[0].pointRadius = 3;
    config.data.datasets[0].pointHitRadius = 3;
};

function PointOff(config){
    config.data.datasets[0].pointRadius = 0;
    config.data.datasets[0].pointHitRadius = 3;
};

function Reset(graph){
    graph.data.datasets[0].data = [];
    PointOff(graph.config);
    graph.update();
};

function ChartsScaleUpdate(){
   window.velocity.config.options.scales.xAxes["0"].ticks.min = curChart.config.options.scales.xAxes["0"].ticks.min;
   window.velocity.config.options.scales.xAxes["0"].ticks.max = curChart.config.options.scales.xAxes["0"].ticks.max;

   if(curChart != window.velocity) 
   {
      delete window.velocity.config.options.scales.yAxes["0"].ticks.min;
      delete window.velocity.config.options.scales.yAxes["0"].ticks.max;
   }
   window.velocity.update();


   window.accelerate.config.options.scales.xAxes["0"].ticks.min = curChart.config.options.scales.xAxes["0"].ticks.min;
   window.accelerate.config.options.scales.xAxes["0"].ticks.max = curChart.config.options.scales.xAxes["0"].ticks.max;
   if(curChart != window.accelerate) 
   {
      delete window.accelerate.config.options.scales.yAxes["0"].ticks.min;
      delete window.accelerate.config.options.scales.yAxes["0"].ticks.max;
   }
   window.accelerate.update();


   window.height.config.options.scales.xAxes["0"].ticks.min = curChart.config.options.scales.xAxes["0"].ticks.min;
   window.height.config.options.scales.xAxes["0"].ticks.max = curChart.config.options.scales.xAxes["0"].ticks.max;
   if(curChart != window.height) 
   {
      delete window.height.config.options.scales.yAxes["0"].ticks.min;
      delete window.height.config.options.scales.yAxes["0"].ticks.max;
   }
   window.height.update();


   window.fuel.config.options.scales.xAxes["0"].ticks.min = curChart.config.options.scales.xAxes["0"].ticks.min;
   window.fuel.config.options.scales.xAxes["0"].ticks.max = curChart.config.options.scales.xAxes["0"].ticks.max;
   if(curChart != window.fuel) 
   {
      delete window.fuel.config.options.scales.yAxes["0"].ticks.min;
      delete window.fuel.config.options.scales.yAxes["0"].ticks.max;
   }
   window.fuel.update();
};