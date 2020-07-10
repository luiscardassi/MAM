function loadMain(o)
{
    var fr = new FileReader();
    fr.onload = function(e)
         {
             showDataFile(e, o);
         };
    fr.readAsText(o.files[0]);
  function showDataFile(e, o)
  {
      // document.getElementById("data").innerText = e.target.result;
      var txt = e.target.result;
      let msg = txt.split("\n");
      //alert(arr[3])
      var sipmsg = [];
      var rat = [];
      var pcscflist = [];
      var handover = [];
      msg.forEach((line, idx)=> {
        //alert(line)

          if(line.includes("SIPMSG")){
            sipmsg.push(line);
            sipmsg.push("\n")}

          if(line.includes("(IN_SERVICE)")){
            let rat1 = line.split(" ");
            //alert(Object.getOwnPropertyNames(rat1))
            if (rat1.includes("MobileDataRat=LTE")){
              rat.push("Mobile RAT = LTE");}
            rat.push('\n')
            }
          if(line.includes("(OUT_OF_SERVICE)")){
              rat.push("Mobile RAT = Out of Service")
              rat.push('\n')
            }
          if(line.includes("pcscfList:")){
              pcscflist.push(line);
              pcscflist.push('\n')
            }
          if(line.includes("LTE_TO_WLAN" || "WLAN_TO_LTE")){
              handover.push(line);
              handover.push('\n')
            }
          //var x = x.replace(","," ");
            //   rat.push("\n")}}
          });
          //var x = rat.toString();
          //var x = x.replace(',',' ');
      document.getElementById("SIPmsg").innerText = sipmsg;
      document.getElementById("pCSCF").innerText = pcscflist;
      document.getElementById("Handover").innerText = handover;
}}
function loadRadio(o)
{
    var fs = new FileReader();
    fs.onload = function(e)
         {
             showDataFile(e, o);
         };
    fs.readAsText(o.files[0]);
  function showDataFile(e, o)
  {
      // document.getElementById("data").innerText = e.target.result;
      var txt = e.target.result;
      let param = txt.split("\n");

      //alert(arr[3])
      var strengthL = [];
      var qualityL = [];
      var timestamp = [];
      var color = [];
      var color1 = [];
      param.forEach((line, idx)=> {
        //alert(line)
          if(line.includes("SignalStrength:")){
              let strength1 = line.split(" ");
              //alert(Object.getOwnPropertyNames(rat1))
              //if (strength1.includes("MobileDataRat=LTE")){
        //      alert(strength1[29])
              var x = parseFloat(strength1[29]);

              if (x < 200){
                  color.push('#00E396');
                  color1.push('#008FFB');
                  timestamp.push(strength1[1]);
                  strengthL.push(-(parseFloat(strength1[29])));
                  qualityL.push(-(parseFloat(strength1[30])));
                  }
              var x = parseFloat(strength1[25]);
              if (x < 255){
                  color.push('#de90c3');
                  color1.push('#dbb660');
                  timestamp.push(strength1[1]);
                  strengthL.push(parseFloat(strength1[25]));
                  qualityL.push(-(parseFloat(strength1[26])));
                  }
              }

          //var x = x.replace(","," ");
            //   rat.push("\n")}}
          });

      //alert(qualityL);
      //alert(timestamp);

      // document.getElementById("RSRP").innerText = strengthL;
      // document.getElementById("RSRQ").innerText = qualityL;
      // document.getElementById("timestamp") = timestamp;

      var myChart = document.getElementById('myChart').getContext('2d');
      var popChart = new Chart(myChart, {
        type:'line', //bar, horizontalBar, pie, line, doughnut, radar, polarArea
        data:{
          labels: timestamp,
          datasets:[{
            label:'Strength',
            data: strengthL,
            fill:false,
            backgroundColor:color,
            borderWidth:1,
            yAxisID: "y-axis-1",
            pointHoverRadius: 6,
            pointRadius: 5,
            borderColor:'#7d7d7d', hoverBorderWidth:4, hoverBorderColor:'#000', fontStyle:"bold" },
            {
            type:'line',
            label:'Quality',
            data: qualityL,
            fill:false,
            backgroundColor:color1,
            borderWidth:1,
            yAxisID: "y-axis-2",
            pointHoverRadius: 6,
            pointRadius: 5,
            borderColor:'#7d7d7d', hoverBorderWidth:4, hoverBorderColor:'#000', fontStyle:"bold" }
            ]
        },
        options:{
          title:{
            display:true,
            text:'Signal Intensity and Quality',
            fontSize:50,
            fontColor:'#000000',
            fontStyle:'bold',
            fontFamily:'Times',
          },
          scales: {
            yAxes: [{
              type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
              display: true,
              position: "left",
              id: "y-axis-1",
              scaleLabel: {
							         display: true,
                       labelString: 'Strength (dBm)'}
            }, {
              type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
              display: true,
              position: "right",
              id: "y-axis-2",
              scaleLabel: {
							         display: true,
                       labelString: 'Quality (dBm)'},
      // grid line settings
              gridLines: {
                drawOnChartArea: false, // only want the grid lines for one axis to show up
              },
              ticks: {
                beginAtZero: true,
                steps: 10,
                stepValue: 5,
                max: 0}
            }],
          //   xAxes: [{
          //     gridLines: {
          //       offsetGridLines: false,
          //     }
          //   }, {
          //     id: 'id1',
          //     type: 'linear',
          //     position: 'bottom',
          //     display: false,
          //   }],
          },
          legend:{
            position:'bottom'
          }
        }
      });
    }
}
