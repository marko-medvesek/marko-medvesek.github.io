function download(){
  let URL = document.getElementById('url').value;
  console.log(URL);

function forceDownload(url, fileName) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = function() {
      var urlCreator = window.URL || window.webkitURL;
      var imageUrl = urlCreator.createObjectURL(this.response);
      var tag = document.createElement('a');
      tag.href = imageUrl;
      tag.download = fileName;
      document.body.appendChild(tag);
      tag.click();
      document.body.removeChild(tag);
    }
    xhr.send();
  }
  
  function join(t, a, s) {
    function format(m) {
      let f = new Intl.DateTimeFormat('en', m);
      return f.format(t);
    }
    return a.map(format).join(s);
  }
  //forceDownload('https://kamere.dars.si/kamere/Sentvid_Jug/cam4.jpg?dt=1675803494012', s);
  var interval = setInterval(function () {
  var olddate = new Date; // specify value for SECONDS here
  var date = olddate.setSeconds(olddate.getSeconds()-4)
  var ura = new Date(date);
  var hours = ura.getHours();
  var minutes = "0" + ura.getMinutes();
  var seconds = "0" + ura.getSeconds();
  console.log(ura);
  let a = [{
    day: 'numeric'
  }, {
    month: 'short'
  }, {
    year: 'numeric'
  }];
  let s = join(new Date, a, '-') + ' ob ' + hours + '-' + minutes.substr(-2) + '-' + seconds.substr(-2) + '.jpg'
  forceDownload(URL, s);
  }, 1000);
}
  //https://kamere.dars.si/kamere/Sentvid_Jug/cam4.jpg
  //https://kamere.dars.si/kamere/Sentvid_Jug/cam13.jpg?dt=1675803430188
  //https://kamere.dars.si/kamere/Sentvid_Jug/cam5.jpg

