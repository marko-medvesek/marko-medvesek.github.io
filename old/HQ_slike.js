function HQ(){
  Array.from(document.getElementsByClassName('fancybox')).forEach((img) => img.href = img.href.replace("_800x600",''));
}
console.log('Slike so zdej HQ.');
HQ();
