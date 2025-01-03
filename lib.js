/*
Palidroma
Chiedere all’utente di inserire una parola
Creare una funzione per capire se la parola inserita è palindroma
*/
let btnSubmit = document.getElementById('btnVerificaParola');  // recupero il button submit
let msgVerifica = document.getElementById('msgVerifica'); // recupero lo span che visualizza il messaggio dell'esito della verifica
let message = ''; // stringa vuota nella quale concateno la stringa del return della funzione checkStrPalindrome

function checkStrPalindrome(str){
    let res = str.toLowerCase();
    let reg =/[0-9]/; // regex che matcha numeri da 0 a 9. 
    let testStr = reg.test(str);
    if(str.length === 0 || testStr === true){  // verifico se l'argomento non riceva una stringa vuota o un numero
      msgVerifica.style.color = 'red';
      return 'Hai inserito un valore non valido';
    }  
    if(res === res.split('').reverse().join('')){ // divido ogni lettera della parola in tanti item di un array -> poi inverto il loro ordine -> poi li unisco in una stringa e stabilisco la condizione con il parametro
      res = str+' è una parola palindroma';
      msgVerifica.style.color = 'green';  // il messaggio dell'esito della verifica è verde se la parola è palindroma
    }else{
      res = str+' non è una parola palindroma'; 
      msgVerifica.style.color = 'red';   // il messaggio dell'esito della verifica è rosso se la parola non è palindroma
    }
    return res;
  }

btnSubmit.addEventListener('click', (e)=>{
  let parola = document.forms[0].elements[0].value;
  e.preventDefault();
  message = checkStrPalindrome(parola);
  msgVerifica.innerHTML = message;
});

/*
Pari e Dispari
L’utente sceglie pari o dispari e inserisce un numero da 1 a 5. Generiamo un numero random (sempre da 1 a 5) per il computer (usando una funzione).
Sommiamo i due numeri
Stabiliamo se la somma dei due numeri è pari o dispari (usando una funzione) Dichiariamo chi ha vinto.
*/

let btnRandom = document.getElementById('btnRandom');
let btnVerifica = document.getElementById('btnVerificaVincitore');
let vincitore = document.getElementById('vincitore');
let nuovaPartita = document.getElementById('btnReset'); 
let cxlStorico = document.getElementById('cxlStorico');
let arrRisultati = [];
let arrVittoria = [];
let msg = '';
let tentativi = 0;
let vittoriaMia = 0;
let vittoriaComputer = 0;
const dati = {numeroMio : '', numeroComputer: '', scelta: {pari: false, dispari: false}}; // oggetto che inizializza i dati da inserire
const error = {numeroMio : '', numeroComputer: '', scelta: ''}; // oggetto che inizializza gli errori relativi ai campi da compilare

// funzione per generare un numero random tra 1 e 5
function generateRandomNumber(){
  return Math.ceil(Math.random() * 5);
}
// funzione per convalidare il valore da inserire negli input, cioè il mio numero ed il numero random
function convalidaNumeroMio(num){
  return (parseInt(num) > 0);
}
// funzione per effettuare la somma di 2 numeri
function sum(num1,num2){
  return num1 + num2;
}
// con il tasto btnRandom genero il numero random ma non prima di aver inserito il mio numero per rendere più valido il gioco
btnRandom.addEventListener('click', ()=>{
  dati.numeroMio = document.getElementById('mioNumero').value;
  error.numeroMio = convalidaNumeroMio(dati.numeroMio) ? '' : 'Devi inserire prima il tuo numero';
  document.getElementById('errorNumeroMio').innerHTML = '<strong>'+error.numeroMio+'</strong>';
  if(!error.numeroMio){
    document.getElementById('numeroRandom').value = generateRandomNumber();
  }
});
// con il tasto verifica convalido le scelte inserite negli input numeroMio e scelta (dispari/pari) ed anche la presenza del numero random.
// la convalida prevede l'attivazione dei messaggi di errore per ogni relativo campo da compilare.
btnVerifica.addEventListener('click', (e)=>{
  e.preventDefault();
  dati.scelta.pari = document.getElementById('pari');
  dati.scelta.dispari = document.getElementById('dispari');
  error.scelta = (dati.scelta.pari).checked || (dati.scelta.dispari).checked ? '' : 'Devi scegliere pari o dispari';
  document.getElementById('errorScelta').innerHTML = '<strong>'+error.scelta+'</strong>';
  dati.numeroMio = parseInt(document.getElementById('mioNumero').value);
  error.numeroMio = convalidaNumeroMio(dati.numeroMio) ? '' : 'Devi inserire il tuo numero';
  document.getElementById('errorNumeroMio').innerHTML = '<strong>'+error.numeroMio+'</strong>';
  dati.numeroComputer = parseInt(document.getElementById('numeroRandom').value);
  error.numeroComputer = convalidaNumeroMio(dati.numeroComputer) ? '' : 'Devi generare un numero random';
  document.getElementById('errorNumeroRandom').innerHTML = '<strong>'+error.numeroComputer+'</strong>';
  if(!error.numeroMio && !error.numeroComputer && !error.scelta){
    document.getElementById('somma').innerHTML = '<h4>'+sum(dati.numeroMio, dati.numeroComputer)+'</h4>';
    verificaVincitore();
  }
});
// funzione di convalida per stabilire chi è il vincitore dopo massimo 5 tentativi
function verificaVincitore(){ 
  let risultato = sum(dati.numeroMio, dati.numeroComputer);
  let userChoice = dati.scelta.pari.checked ? 'pari' : 'dispari';
  if(risultato %2 === 0 && userChoice === 'pari'){
    msg+='<strong class="text-success";">Hai vinto </strong>';
    arrRisultati.unshift(msg);
    tentativi++;
    vittoriaMia++;
  }else if(risultato %2 !== 0 && userChoice === 'dispari'){
    msg+='<strong class="text-success";">Hai vinto </strong>';
    arrRisultati.unshift(msg);
    tentativi++;
    vittoriaMia++;
  }else{
    msg+='<strong class="text-danger"">Ha vinto il computer </strong>';
    arrRisultati.unshift(msg);
    tentativi++;
    vittoriaComputer++;
  }
  if(tentativi < 5){
    vincitore.innerHTML = arrRisultati[0];
  }else if(tentativi > 5){  // se clicco più di 5 verifiche visualizzo il seguente messaggio e la funzione returna.
    vincitore.innerHTML = '<h4>Inizia una nuova partita</h4>';
    return;
  }else{
    let vittoria = vittoriaMia > vittoriaComputer ? '<h2 class="text-success">Hai vinto</h2>' : '<h2 class="text-danger">Hai perso</h2>';
    arrVittoria.unshift(vittoria);
    storico();
  }
}

function storico(){
  let newDiv = document.createElement('div');
  newDiv.style.backgroundColor = '#c9e2ef';
  newDiv.style.border = '2px solid grey';
  newDiv.innerHTML = arrVittoria;
  document.getElementById('storico').after(newDiv); // l'ultimo risultato viene visualizzato per primo 
}

nuovaPartita.addEventListener('click', (e)=>{
  e.preventDefault();
  let text = "Vuoi cominciare un'altra partita?";
  if(confirm(text) == true){
    arrRisultati.length = 0; // azzera array esistente
    arrVittoria.length = 0;  // devo svuotare l'array esistente altrimenti la visualizzazione non è corretta in quanto mi stampa più volte l'array ad ogni click
    //arrRisultati.splice(0, arrRisultati.length); // restituisce copia dell'array
    vincitore.innerHTML = "";
    vittoriaMia = 0;
    vittoriaComputer = 0;
    tentativi = 0;
    msg = '';
  }else{
    vincitore.style.display = 'block';
  }
});

cxlStorico.addEventListener('click', (e)=>{
    e.preventDefault();
    let text = 'Vuoi azzerare i risultati?';
    if(confirm(text) == true){
      location.reload();
    }else{
      vincitore.style.display = 'block';
    }
 });

// OPPURE (prima strategia molto basilare):
/*let btnRandom = document.getElementById('btnRandom');
let btnVerifica = document.getElementById('btnVerificaVincitore');
let pari = document.getElementById('pari');
let dispari = document.getElementById('dispari');
let vincitore = document.getElementById('vincitore');

function generateRandomNumber(){
  return Math.ceil(Math.random() * 5);
}
function sum(a,b){
  return a+b;
}
btnRandom.addEventListener('click', ()=>{
   if(document.getElementById('mioNumero').value !== ''){
      document.getElementById('numeroRandom').value = generateRandomNumber();
   }else{
    alert('Inserisci prima il tuo numero');
   }
});
btnVerifica.addEventListener('click', (e)=>{
  e.preventDefault();
  if(document.getElementById('mioNumero').value !== '' && document.getElementById('numeroRandom').value !== ''){
    let numeroComputer = parseInt(document.getElementById('numeroRandom').value);
    let mioNumero = parseInt(document.getElementById('mioNumero').value);
    document.getElementById('somma').innerHTML = sum(mioNumero, numeroComputer);
    verificaVincitore();
  }else{
    alert('Inserisci il tuo numero e poi genera un numero a random');
  }
});
function verificaVincitore(){
  let risultato =  document.getElementById('somma').innerHTML;
  let userChoice = pari.checked ? 'pari' : 'dispari';
  if(risultato %2 === 0 && userChoice === 'pari'){
    vincitore.innerHTML = '<h3>Hai vinto</h3>';
  }else if(risultato %2 !== 0 && userChoice === 'dispari'){
    vincitore.innerHTML = '<h3>Hai vinto</h3>';
  }else{
    vincitore.innerHTML = '<h3>Ha vinto il computer</h3>';
  }
}*/



