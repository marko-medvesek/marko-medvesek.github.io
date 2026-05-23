async function reload(){
      // create a new timestamp 
      var timestamp = new Date().getTime();  
      var queryString = "?t=" + timestamp;  

      document.getElementById('cam1').src = 'https://kamere.dars.si/kamere/Sentvid_Jug/cam4.jpg' + queryString;  
      document.getElementById('cam2').src = 'https://kamere.dars.si/kamere/Sentvid_Jug/cam5.jpg' + queryString;  
      document.getElementById('cam3').src = 'https://kamere.dars.si/kamere/Sentvid_Jug/cam6.jpg' + queryString;  
      document.getElementById('cam4').src = 'https://kamere.dars.si/kamere/Sentvid_Jug/cam9.jpg' + queryString;  
      document.getElementById('cam5').src = 'https://kamere.dars.si/kamere/Sentvid_Jug/cam8.jpg' + queryString;  
      document.getElementById('cam6').src = 'https://kamere.dars.si/kamere/Sentvid_Jug/cam10.jpg' + queryString;  
      document.getElementById('cam7').src = 'https://kamere.dars.si/kamere/ljubljana/K03_Kozarje_drog.jpg' + queryString;
      document.getElementById('cam8').src = 'https://kamere.dars.si/kamere/ljubljana/Kam20_pociva_Barje.jpg' + queryString;
      /*document.getElementById('cam9').src = 'https://kamere.dars.si/kamere/Kozina/Dilce_1.jpg' + queryString;
      document.getElementById('cam10').src = 'https://kamere.dars.si/kamere/Kozina/Portal_P3_Studenec.jpg' + queryString;
      //10
      document.getElementById('cam11').src = 'https://kamere.dars.si/kamere/msc2pics/Portal%20Unec%20smer%20KP.jpg' + queryString;
      document.getElementById('cam12').src = 'https://kamere.dars.si/kamere/msc2pics/Portal%20Unec%20smer%20LJ.jpg' + queryString;
      document.getElementById('cam13').src = 'https://kamere.dars.si/kamere/msc2pics/Kam15_IVANJE_SELO_LJ.jpg' + queryString;
      document.getElementById('cam14').src = 'https://kamere.dars.si/kamere/msc2pics/Kam9_IVANJE_SELO_KP.jpg' + queryString;
      document.getElementById('cam15').src = 'https://kamere.dars.si/kamere/msc2pics/kam7_Lom_KP.jpg' + queryString;
      document.getElementById('cam16').src = 'https://kamere.dars.si/kamere/msc2pics/Kam8_LOM_LJ.jpg' + queryString;
      document.getElementById('cam17').src = 'https://kamere.dars.si/kamere/Vrhnika/Stempetov_most_LJ.JPG' + queryString;
      document.getElementById('cam18').src = 'https://kamere.dars.si/kamere/Kozina/Stempetov_most_LJ.jpg' + queryString;
      document.getElementById('cam19').src = 'https://kamere.dars.si/kamere/Kozina/Stempetov_most_KP.jpg' + queryString;
      document.getElementById('cam20').src = 'https://kamere.dars.si/kamere/Vrhnika/Verd_KP.JPG' + queryString;
      //20
      document.getElementById('cam21').src = 'https://kamere.dars.si/kamere/Vrhnika/Sinja_gorica_LJ.JPG' + queryString;
      document.getElementById('cam22').src = 'https://kamere.dars.si/kamere/msc2pics/Cam21_SPEED_VHOD.jpg' + queryString;
      document.getElementById('cam23').src = 'https://kamere.dars.si/kamere/msc2pics/Cam22_SPEED_IZHOD.jpg' + queryString;
      document.getElementById('cam24').src = 'https://kamere.dars.si/kamere/Sentvid_Jug/cam11.jpg' + queryString;
      document.getElementById('cam25').src = 'https://kamere.dars.si/kamere/Sentvid_Jug/cam8.jpg' + queryString;
      document.getElementById('cam26').src = 'https://kamere.dars.si/kamere/Sentvid_Jug/cam6.jpg' + queryString;
      document.getElementById('cam27').src = 'https://kamere.dars.si/kamere/Sentvid_Jug/cam5.jpg' + queryString;
      document.getElementById('cam28').src = 'https://kamere.dars.si/kamere/Sentvid_Jug/cam12.jpg' + queryString;
      document.getElementById('cam29').src = 'https://kamere.dars.si/kamere/Sentvid_Jug/cam1.jpg' + queryString;
      document.getElementById('cam30').src = 'https://kamere.dars.si/kamere/Sentvid_Jug/cam3.jpg' + queryString; */
      //30
      console.log('reloaded');
      window.setTimeout(test, 990)
}
function test(){
  reload();
}

reload();

new SimpleLightbox({
  elements: '#portfolio a.portfolio-box'
}); 

