let postdata = [];

function display() {
  postdata = [];
  display_leaf_apices();
  display_margin();
  display_bases();
  console.clear();
  senddata();
  // $.ajax({
  //   url: "/predict", // fix this to your liking
  //   type:"POST",
  //   data: {leaf_apices:leafapices},
  //   cache: false,
  //   processData:false,
  //   contentType:false,
  //   error: function(data){
  //     console.log("upload error" , data);
  //     console.log(data.getAllResponseHeaders());
  //   },
  //   success: function(data){
  //     object = JSON.parse(data);
  //     console.log(object);
  //   }
  // });
}

function display_leaf_apices() {
  var ele = document.getElementsByName("leaf_apicies");

  for (var i = 0; i < ele.length; i++) {
    if (ele[i].checked) {
      // document.getElementById("apicies").innerHTML="the value of "+ele[i].name+" is "+ele[i].value
      postdata.push({ leaf_apices: ele[i].value });
    }
  }
}

function display_margin() {
  var ele = document.getElementsByName("margin");
  for (var i = 0; i < ele.length; i++) {
    if (ele[i].checked) {
      // document.getElementById("leaf_margin").innerHTML="the value of "+ele[i].name+" is "+ele[i].value
      postdata.push({ leaf_margin: ele[i].value });
    }
  }
}

function display_bases() {
  var ele = document.getElementsByName("leaf_bases");
  for (var i = 0; i < ele.length; i++) {
    if (ele[i].checked) {
      // document.getElementById("bases").innerHTML="the value of "+ele[i].name+" is "+ele[i].value
      postdata.push({ leaf_bases: ele[i].value });
    }
  }
}

function senddata() {
  console.log(postdata);
  $.ajax({
    url: "/predict", // fix this to your liking
    type: "POST",
    data: JSON.stringify(postdata),
    contentType: "application/json",
    dataType: "json",
    error: function (data) {
      console.log("upload error", data);
      console.log(data.getAllResponseHeaders());
    },
    success: function (data) {
      console.log(data);

      var represent_data = "";

      Object.entries(data).forEach(([key, value]) => {
        let folderName = key;
        let imgsrc =
          `../static/` + value[Math.floor(Math.random() * value.length)];
        render_html_template = `
          
          <div class="col-lg-4">
            <div class="card" style="width: 18rem;">
            <img  src="${imgsrc}" class="card-img-top setimg" alt="...">
            <div class="card-body">
              <p class="c"ard-text">ClassName :${folderName} </p>
            </div>
            </div>
            </div>
            
           
         `;
        represent_data += render_html_template;
      });
      console.log(represent_data);
      $("#imgresult").html(represent_data);

      // index = Math.floor(Math.random() * data.length)

      // if(data.length == 0){
      //   $("#h3").html("NO IMAGE FOUND.")
      // }else{
      //   $("#h3").html("");
      // }

      // srctext = `../static/${data[index]}`;
      // $("#img_result").attr('src','');
      // $("#img_result").attr('src',srctext);
      // console.log(srctext)
    },
  });
}
