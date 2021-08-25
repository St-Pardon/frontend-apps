function rot13Encoder(str) {
    let alphabeth = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let rotResult;
    let result ='';
    for (let i = 0; i< str.length; i++){
      rotResult = alphabeth.indexOf(str[i]) + 13
      if(alphabeth.indexOf(str[i]) === -1){
        result += ''+str[i]+''
      } else if (rotResult >= 26){
        rotResult -= alphabeth.length
        result += ''+alphabeth[rotResult]+''
      }else {
        result += ''+alphabeth[rotResult]+''
      }
      
    }
    return result;
  }
  let readBtn = document.getElementById("read-btn");
  let createBtn = document.getElementById("create-btn");
  let output =  document.getElementById("output");
  let whatsapp = document.querySelector('.whatsapp');
  let sms = document.querySelector('.sms');
  let mail = document.querySelector('.mail');
  let copy = document.querySelector('.fa-copy');

  // let url = "https://"
  
  createBtn.addEventListener('click', () =>{
    let meme = rot13Encoder(document.getElementById('secret-message').value.toUpperCase());
    output.innerHTML = meme.toLowerCase();
    if(output.innerHTML == ''){
      output.className = 'none';
      
    }else{
    output.className = 'output-style';
    // whatsapp.setAttribute('href', `whatsapp://send?text=${meme}`)
    whatsapp.setAttribute('href', `https://wa.me/?text=${meme.toLowerCase()}`)
    sms.setAttribute('href', `sms:body=${meme.toLowerCase()}`)
    mail.setAttribute('href', `mailto:subject=secretmessage&body=${meme.toLowerCase()}`)
    };
  });
  
  copy.addEventListener('click', ()=>{
    let copyText = output.innerText
    navigator.clipboard.writeText(copyText.value)
    console.log(copyText)
    alert("Copied!")
  });