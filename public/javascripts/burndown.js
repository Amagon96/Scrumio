$(document).ready(function(){
  var sprint = $("#myChart").data("sprint");
  var histories = $("#myChart").data("histories");
  var total_work = 0;
  var hours = [];
  var dates = [];
  console.log(sprint.start_date);
  dates.push(sprint.start_date);
  histories.forEach((item, index)=>{
    if(item.time_estimate){
      total_work += item.time_estimate;
    }else{
      total_work += 0;
    }
  });
  hours.push(total_work);
  histories.forEach((item, index)=>{
    if(item.time_did){
      total_work -= item.time_did.time
      hours.push(total_work);
      dates.push(item.time_did.date)
    }
  });
  dates.push(sprint.end_date);
  console.log(total_work);
  console.log(dates);
  console.log(hours);
  var ctx = document.getElementById('myChart').getContext('2d');
  var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
          labels: dates,
          datasets: [{
              label: "Trabajo",
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgb(255, 99, 132)',
              data: hours,
          }]
      },

      // Configuration options go here
      options: {}
  });
});
