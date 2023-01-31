import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { useFetch1 } from "./useFetch.js";
import { Flash } from "./flash.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));

const Kontekst = React.createContext();
const FlashKontekst = React.createContext();

const ADRESA = "";
const ADRESA1 = "http://localhost:3000";

function Soba() {
  return (
    <main id="soba">
      <Navbar/>
      <div className="soba-div">
        <aside className="lijevi-stupac">

        </aside>
        <div className="srednji-stupac">
          <Poruke/>
          <UnosPoruke/>
        </div>
        <aside className="desni-stupac">
          <Lista/>
        </aside>
      </div>
    </main>
  )
}

function Lista() {
  const [brojLjudi, setBrojLjudi] = React.useState(169);
  return (
    <div className="lista">
      <div className="lista-nav">
        <div className="lista-gumb">
          <div className="lista-gumb-el">
            <div className="lista-gumb-el1"></div>
            <div className="lista-gumb-el2"></div>
          </div>
        </div>

        <div className="lista-brojac">
          <div className="lista-brojac-el">U Sobi</div>
          <div className="lista-brojac-el1">{brojLjudi}</div>
        </div>
      </div>
      <div className="lista-popis">
        <Osoba/>
      </div>
    </div>
  )
}

function Osoba() {
  const [spol, setSpol] = React.useState("muski");
  const [ime, setIme] = React.useState("igor igorovic");
  const [fraza, setFraza] = React.useState("");

  return (
    <div className="osoba">
      <div className="poruka-div-ikona">
        <img alt="avatar" src="1.jpg" className={spol === "muski" ? "slika spol-muski" : "slika spol-zenski"}/>
      </div>
      <div className="poruka-div-ime">
        <p className="p-ime">{ime}</p>
        {fraza !== fraza.trim() ? <p className="p-fraza">{fraza}</p> : null}
      </div>
    </div>
  )
}

function Poruke() {
  return (
    <div className="soba-poruke">
      <Poruka parna={true}/>
    </div>
  )
}

function Poruka({parna=false}) {
  const [klasa, setKlasa] = React.useState("poruka poruka-neparna");
  const [timeStamp, setTimeStamp] = React.useState([25,1,14,20]);
  const [userName, setUserName] = React.useState("Sky2345678");
  const [spol, setSpol] = React.useState("muski");
  const [poruka, setPoruka] = React.useState("ovo je neka glupost koju je budala sa foruma napisala.\nNastavak budalastina... Donedavno visoki FBI-ajev dužnosnik 54-godišnji Charles McGonigal, uhićen je u New Yorku zbog primanja mita i veza s ruskim oligarhom i poznatim Putinovim saveznikom Olegom Deripaskom, protiv kojeg su Sjedinjene Američke Države uvele sankcije. Prošle godine Deripaska je kazneno optužen za kršenje tih sankcija. Donedavno visoki FBI-ajev dužnosnik 54-godišnji Charles McGonigal, uhićen je u New Yorku zbog primanja mita i veza s ruskim oligarhom i poznatim Putinovim saveznikom Olegom Deripaskom, protiv kojeg su Sjedinjene Američke Države uvele sankcije. Prošle godine Deripaska je kazneno optužen za kršenje tih sankcija. Donedavno visoki FBI-ajev dužnosnik 54-godišnji Charles McGonigal, uhićen je u New Yorku zbog primanja mita i veza s ruskim oligarhom i poznatim Putinovim saveznikom Olegom Deripaskom, protiv kojeg su Sjedinjene Američke Države uvele sankcije. Prošle godine Deripaska je kazneno optužen za kršenje tih sankcija. ");


  React.useEffect(()=>{
    if (parna) {
      setKlasa("poruka poruka-parna");
    } else {
      setKlasa("poruka poruka-neparna");
    }
  }, [parna]);

  function ispisiVrijeme() {
    let rez = "";
    if (timeStamp[0] < 10) {
      rez += "0" + timeStamp[0];
    } else {
      rez += timeStamp[0];
    }
    rez += "/";
    if (timeStamp[1] < 10) {
      rez += "0" + timeStamp[1];
    } else {
      rez += timeStamp[1];
    }
    rez += " " + timeStamp[2] + ":";
    if (timeStamp[3] < 10) {
      rez += "0" + timeStamp[3];
    } else {
      rez += timeStamp[3];
    }
    return rez;
  }
  return (
    <div className={klasa}>
      <div className="poruka-div-ikona">
        <img alt="avatar" src="1.jpg" className={spol === "muski" ? "slika spol-muski" : "slika spol-zenski"}/>
      </div>
      <div className="poruka-div-tekst">
        <p className="username">{userName}</p>
        <p className="poruka-tekst">{poruka}</p>
      </div>
      <div className="poruka-div-time">
        <p>{ispisiVrijeme()}</p>
      </div>
    </div>
  )
}

function UnosPoruke() {
  return (
    <div className="soba-unos-poruke">
      <div className="unos-poruke-div-smajl">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="unos-poruke-smajlic bi bi-emoji-smile" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
          <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"/>
        </svg>
      </div>

      <div className="unos-poruke-div-input">
        <form className="unos-poruke-forma">
          <input type="text" id="input0" className="unos-poruke-input"/>
        </form>
      </div>
      <div className="unos-poruke-div-send">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="unos-poruke-avioncic bi bi-send-fill" viewBox="0 0 16 16">
          <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
        </svg>
      </div>
    </div>
  )
}
function Navbar({signout=()=>{return false}, 
  signin=()=>{return false}, signup=()=>{return false}}) {
  const [sw, setSw] = React.useState(false);
  const [klasa, setKlasa] = React.useState("menu nevidljiv");
  const {kljuc} = React.useContext(Kontekst);

  React.useEffect(()=>{
    if (sw) {
      setKlasa("menu");
    } else {
      setKlasa("menu nevidljiv");
    }
  }, [sw])
  
  return (
    <div className="navbar">
      <img src="logo.jpg" alt="logo" className="logo" />
      <div className="user" onClick={()=>{setSw((prev)=>{return !prev})}}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="person-ikona bi bi-person" viewBox="0 0 16 16">
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
        </svg> 
      </div>
      <div className={klasa} onClick={()=>{setSw((prev)=>{return !prev})}}>
        {kljuc !== "" || false ? <>
          <div className="menu-el">
            <svg xmlns="http://www.w3.org/2000/svg" fill="#3bd8f7" className="menu-ikona bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
              <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
            </svg>
            <div className="menu-el1">Moj profil</div>
          </div>
          <div onClick={()=>{signout(true)}}className="menu-el">
            <svg xmlns="http://www.w3.org/2000/svg" fill="#3bd8f7" className="menu-ikona bi bi-arrow-right-square-fill" viewBox="0 0 16 16">
              <path d="M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v12zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1z"/>
            </svg>
            <div className="menu-el1">Odjavi se</div>
          </div>
        </> : <>
        
          <div className="menu-el" onClick={()=>{signin(true)}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="#3bd8f7" className="menu-ikona bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
              <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
            </svg>
            <div className="menu-el1">Sign in</div>
          </div>
          <div className="menu-el" onClick={()=>{signup(true)}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="#3bd8f7" className="menu-ikona bi bi-person-plus-fill" viewBox="0 0 16 16">
              <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
              <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
            </svg>
            <div className="menu-el1">Sign up</div>
          </div>
        </>}
      </div>
    </div>
  )
}

function pritisakGumba(ev) {
  if (ev.code === "KeyS") {
    console.log(window.innerWidth);
  }
}

function Signup({ponisti=()=>{return false}, switchaj=()=>{return false}}) {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [lozinka, setLozinka] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const {flashPoruke, setFlashPoruke, postaviFlashPoruku} = React.useContext(FlashKontekst);
  const [br, setBr] = React.useState(0);
  const {kljuc, setKljuc, refreshKljuc, setRefreshKljuc} = React.useContext(Kontekst);
  const r = React.useRef();

  const [loading, error, value] = useFetch1(ADRESA1 + '/api/signup', 
  {
    method: 'POST',
    body: JSON.stringify({
      "email": email,
      "username": username,
      "password": lozinka
    }),
    headers: {
      'Content-type': 'application/json'
    }
  }, [br]);

  React.useEffect(()=>{
    console.log("Loading: " + loading);
    console.log("Error: " + error);
    console.log("Value: ");
    console.log(value);

    if (!loading && error === undefined && value !== undefined) {
      if (value.error) {
        if (value.errorCode === "Vec postoji korisnik sa ovim imenom.") {
          postaviFlashPoruku("Vec postoji korisnik sa ovim imenom. Pokusajte ponovo.", "danger");
        } else if (value.errorCode === "Vec postoji korisnik sa ovim emailom.") {
          postaviFlashPoruku("Vec postoji korisnik sa ovim emailom. Probajte sa drugim.", "danger");
        } else {
          postaviFlashPoruku("Dogodila se pogreska. Pokusajte ponovo.", "danger");
        }
      } else {
        localStorage.setItem("kljuc", value.value.token);
        localStorage.setItem("refreshKljuc", value.value.refreshToken);
        setKljuc(value.value.token);
        setRefreshKljuc(value.value.refreshToken);
        clearTimeout(r.current);
        r.current = setTimeout(()=>{
          postaviFlashPoruku("Upravo ste kreirali novi account. Sada vas preusmjeravam.", "success");
        }, 200);
        setTimeout(()=>{ponisti(false)}, 2000);
      }
    }

  }, [loading, error, value]);

  function fun() {
    let regex = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
    regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i;
    //console.log("pokrenuo " + Math.random());

    if (lozinka.length < 6) {
      postaviFlashPoruku("Lozinka mora imati barem 6 znakova", "danger");
      return;
    } else if (lozinka !== confirm) {
      postaviFlashPoruku("Lozinka i njena potvrda nisu identicne.", "danger");
      return;
    } else {
      let swBroj = false;
      let swSlovo = false;
      let swBlank = false;
      for (let i = 0; i < lozinka.length; i++) {
        let znak = lozinka[i];
        if (znak == " ") {
          swBlank = true;
          break;
        } 
        switch (znak) {
          case "0":
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
          case "9":
            swBroj = true;
        }
        if (znak >= "a" && znak <= "z")  swSlovo = true;
        if (znak >= "A" && znak <= "Z")  swSlovo = true;
      }

      if (swBlank) {
        postaviFlashPoruku("Lozinka ne smije imati prazan znak", "danger");
        return;
      }
      if (!swSlovo) {
        postaviFlashPoruku("Lozinka mora imati bar jedno slovo", "danger");
        return;
      }
      if (!swBroj) {
        postaviFlashPoruku("Lozinka mora imati bar jedan broj", "danger");
        return;
      }
      if (!regex.test(email)) {
        postaviFlashPoruku("Niste upisali dobar email. Probajte ponovo", "danger");
        return;
      }

      if (username.trim() !== username) {
        postaviFlashPoruku("Ne mozete koristiti razmak na pocetku ili kraju stringa. Probajte ponovo", "danger");
        return;
      } else {
        let slovo = false;
        for (let i = 0; i < username.length; i++) {
          if (username[i].match(/[a-z]/i)) slovo = true;
          if (username[i] === " ") {
            postaviFlashPoruku("Korisnicko ime mora biti jedna rijec. Probajte ponovo", "danger");
            return;
          }
        }
        if (!slovo) {
          postaviFlashPoruku("Korisnicko ime mora imati barem jedno slovo. Probajte ponovo", "danger");
          return;
        }
      }
    }
    setBr((prev)=>{return (prev+1)});
  }

  return (
    <div className="popup-plast">
      <div className="popup-signup">
        {loading ? <Spinner/> : null}
        <div className="flash-container">
          {flashPoruke.map((el)=>{return <Flash key={el.id} id={el.id} setFlashPoruke={setFlashPoruke} tip={el.tip} poruka={el.poruka}/>})}
        </div>
        <div onClick={()=>{ponisti(false)}} className="lista-gumb">
          <div className="lista-gumb-el">
            <div className="lista-gumb-el1"></div>
            <div className="lista-gumb-el2"></div>
          </div>
        </div>
        <div className="lista-naslov">Sign up</div>
        <div className="lista-div">
          <label htmlFor="input0">Korisnicko ime:</label><br/>
          <input type="text" className="input1" onChange={(el)=>{setUsername(el.target.value)}} value={username} id="input0" placeholder="upisite korisnicko ime"/>
        </div>  

        <div className="lista-div">
          <label htmlFor="input0">Korisnikov email:</label><br/>
          <input type="text" className="input1" onChange={(el)=>{setEmail(el.target.value)}} value={email} id="input0" placeholder="upisite korisnikov email"/>
        </div>

        <div className="lista-div">
          <label htmlFor="input0">Lozinka:</label><br/>
          <input type="password" className="input1" onChange={(el)=>{setLozinka(el.target.value)}} value={lozinka} id="input0" placeholder="upisite lozinku"/>
        </div> 

        <div className="lista-div">
          <label htmlFor="input0">Potvrdite Lozinku:</label><br/>
          <input type="password" className="input1" onChange={(el)=>{setConfirm(el.target.value)}} value={confirm} id="input0" placeholder="upisite ponovo lozinku"/>
        </div> 
          
        <div className="lista-div1">
          <div className="user" onClick={switchaj}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="person-ikona bi bi-person" viewBox="0 0 16 16">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
            </svg> 
          </div>
          <Gumb fun={fun} tekst="prijava" height="48px" width="70%" />
        </div>
        
      </div>
    </div>
  )
}

function Signout({ponisti=()=>{return false}}) {
  const [sw, setSw] = React.useState(false);
  const [br, setBr] = React.useState(0);
  const {kljuc, setKljuc, refreshKljuc, setRefreshKljuc} = React.useContext(Kontekst);
  const {flashPoruke, setFlashPoruke, postaviFlashPoruku} = React.useContext(FlashKontekst);

  const [loading, error, value] = useFetch1(ADRESA1 + '/api/signout', 
  {
    method: 'POST',
    body: JSON.stringify({
      "token": kljuc
    }),
    headers: {
      'Content-type': 'application/json'
    }
  }, [br]);

  React.useEffect(()=>{
    console.log("Loading: " + loading);
    console.log("Error: " + error);
    console.log("Value: ");
    console.log(value);

    if (!loading && error === undefined && value !== undefined) {
      if (value.error) {
        postaviFlashPoruku("Signout nije bio uspijesan. Pokusajte ponovo.", "danger");
        setTimeout(()=>{ponisti(false)}, 2000);
      } else {
        localStorage.setItem("kljuc", "");
        localStorage.setItem("refreshKljuc", "");
        setKljuc("");
        setRefreshKljuc("");
        postaviFlashPoruku("Upravo ste se odjavili. Sada vas preusmjeravam.", "success");
        setTimeout(()=>{ponisti(false)}, 2000);
      }
    }

  }, [loading, error, value]);

  function fun(e) {
    if (e === "yes") {
      setSw(true);
      setBr((prev)=>{return (prev+1)});
    } else {
      ponisti(false);
    }
  }

  return (
    <div className="popup-plast">
      <div className="popup-signout">
        {sw ? <>
          <div className="naslov">You are currently signing out. Please wait...</div>
          <Spinner/>
        </> :
           <>
             <div className="naslov">You are about to leave. Are you sure?</div>
             <div className="gumbi">
               <Gumb fun={()=>{fun("no")}} tekst="No" height="30px" width="60px" />
               <Gumb fun={()=>{fun("yes")}} tekst="Yes" height="30px" width="60px" />
             </div>
           </>}
      </div>
    </div>
  )
}

function Signin({ponisti=()=>{return false}, switchaj=()=>{return false}}) {
  const [login, setLogin] = React.useState("");
  const [lozinka, setLozinka] = React.useState("");
  const {flashPoruke, setFlashPoruke, postaviFlashPoruku} = React.useContext(FlashKontekst);
  const [br, setBr] = React.useState(0);
  const {kljuc, setKljuc, refreshKljuc, setRefreshKljuc} = React.useContext(Kontekst);
  const r = React.useRef();

  const [loading, error, value] = useFetch1(ADRESA1 + '/api/signin', 
  {
    method: 'POST',
    body: JSON.stringify({
      "login": login,
      "password": lozinka
    }),
    headers: {
      'Content-type': 'application/json'
    }
  }, [br]);


  React.useEffect(()=>{
    console.log("Loading: " + loading);
    console.log("Error: " + error);
    console.log("Value: ");
    console.log(value);

    if (!loading && error === undefined && value !== undefined) {
      if (value.error) {
        if (value.errorCode === "Username i password kombinacija nije ispravna") {
          postaviFlashPoruku("Login/password kombinacija nije ispravna. Pokusajte ponovo.", "danger");
        } else {
          postaviFlashPoruku("Dogodila se pogreska. Pokusajte ponovo.", "danger");
        }
      } else {
        localStorage.setItem("kljuc", value.value.token);
        localStorage.setItem("refreshKljuc", value.value.refreshToken);
        setKljuc(value.value.token);
        setRefreshKljuc(value.value.refreshToken);
        clearTimeout(r.current);
        r.current = setTimeout(()=>{
          postaviFlashPoruku("111Upravo ste se ulogirali. Sada vas preusmjeravam.", "success");
        }, 200);
        setTimeout(()=>{ponisti(false)}, 2000);
      }
    }

  }, [loading, error, value]);

  function fun() {
    if (lozinka.length < 6) {
      postaviFlashPoruku("Lozinka mora imati barem 6 znakova", "danger");
      return;
    } else {
      let swBroj = false;
      let swSlovo = false;
      let swBlank = false;
      for (let i = 0; i < lozinka.length; i++) {
        let znak = lozinka[i];
        if (znak == " ") {
          swBlank = true;
          break;
        } 
        switch (znak) {
          case "0":
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
          case "9":
            swBroj = true;
        }
        if (znak >= "a" && znak <= "z")  swSlovo = true;
        if (znak >= "A" && znak <= "Z")  swSlovo = true;
      }

      if (swBlank) {
        postaviFlashPoruku("Lozinka ne smije imati prazan znak", "danger");
        return;
      }
      if (!swSlovo) {
        postaviFlashPoruku("Lozinka mora imati bar jedno slovo", "danger");
        return;
      }
      if (!swBroj) {
        postaviFlashPoruku("Lozinka mora imati bar jedan broj", "danger");
        return;
      }
      if (login === "") {
        postaviFlashPoruku("Ime/email ne moze biti prazno", "danger");
        return;
      } else {
        for (let i = 0; i < login.length; i++) {
          if (login[i] === " ") {
            postaviFlashPoruku("Ime/email ne moze sadrzavati razmak", "danger");
            return;
          }
        }
      }
    }

    setBr((prev)=>{return (prev+1)});
  }

  return (
    <div className="popup-plast">
      <div className="popup-signin">
        {loading ? <Spinner/> : null}
        <div className="flash-container">
          {flashPoruke.map((el)=>{return <Flash key={el.id} id={el.id} setFlashPoruke={setFlashPoruke} tip={el.tip} poruka={el.poruka}/>})}
        </div>
        <div className="lista-naslov">Sign in</div>
        <div onClick={()=>{ponisti(false)}} className="lista-gumb">
          <div className="lista-gumb-el">
            <div className="lista-gumb-el1"></div>
            <div className="lista-gumb-el2"></div>
          </div>
        </div>

        <div className="lista-div">
          <label htmlFor="input0">Korisnicko ime / email:</label><br/>
          <input type="text" className="input1" onChange={(el)=>{setLogin(el.target.value)}} value={login} id="input0" placeholder="upisite korisnicko ime ili email"/>
        </div>  

        <div className="lista-div">
          <label htmlFor="input0">Lozinka:</label><br/>
          <input type="text" className="input1" onChange={(el)=>{setLozinka(el.target.value)}} value={lozinka} id="input0" placeholder="upisite lozinku"/>
        </div> 
        
        <div className="lista-div1">
          <div className="user" onClick={switchaj}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="person-ikona bi bi-person" viewBox="0 0 16 16">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
            </svg> 
          </div>
          <Gumb fun={fun} tekst="prijava" height="48px" width="70%" />
        </div>
      </div>
    </div>
  )
}

function Gumb({tekst="nesto", fun=()=>{return true}, 
    height="50px", width="80px"}) {
  const r = React.useRef();
  const r1 = React.useRef();
  const [gumbKlasa, setGumbKlasa] = React.useState("gumb gumb-nekliknuti")

  React.useEffect(()=>{
    return ()=>{clearTimeout(r1.current)};
  }, []);

  function klik() {
    console.log("Upravo si kliknuo na gumb " + Math.random());
    fun();
    setGumbKlasa("gumb gumb-kliknuti");
    r1.current = setTimeout(()=>{
      setGumbKlasa("gumb gumb-nekliknuti");
    }, 200);
  }

  return (
    <div ref={r} style={{"height":height, "width":width}} onClick={klik} className={gumbKlasa}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="gumb-ikona bi bi-box-arrow-in-right" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
        <path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
      </svg>
      <div>{tekst}</div>
    </div>
  )
}

function Predvorje({predvorje=false}) {
  const [sobe, setSobe] = React.useState([{ime:"Glavna soba", brojLjudi:171},
  {ime:"VIP soba", brojLjudi:17},{ime:"Chill", brojLjudi:5},
  {ime:"NEON", brojLjudi:0}]);
  const {kljuc, setKljuc} = React.useContext(Kontekst);
  const [signinSw, setSigninSw] = React.useState(false);
  const [signupSw, setSignupSw] = React.useState(true);
  const [signoutSw, setSignoutSw] = React.useState(false);
  const r = React.useRef();

  React.useEffect(()=>{
    document.addEventListener("keydown", (e) => {pritisakGumba(e)});
    clearTimeout(r.current);
    if (kljuc === "" && false) {
      r.current = setTimeout(()=>{
        setSigninSw(true);
        setSignupSw(false);
      }, 2000);
    }
  }, []);

  function switchaj() {
    if (signinSw && !signupSw) {
      setSigninSw(false);
      setSignupSw(true);
    } else if (!signinSw && signupSw) {
      setSigninSw(true);
      setSignupSw(false);
    }
  }

  return (
    <main className="predvorje">
      <Navbar signout={setSignoutSw} signin={setSigninSw}  signup={setSignupSw}/>
      {signoutSw ? <Signout ponisti={setSignoutSw}/> : null}
      {signinSw ? <Signin ponisti={setSigninSw} switchaj={switchaj}/> : null}
      {signupSw ? <Signup ponisti={setSignupSw} switchaj={switchaj}/> : null}
      <div className="predvorje-div">
        {sobe.map((el,i)=>{return <Kartica key={i} ime={el.ime} brojLjudi={el.brojLjudi}/>})}
      </div>
    </main> 
  )
}

function Kartica({ime="neko ime", brojLjudi=0}) {
  return (
    <div className="kartica">
      <div className="kartica-ikona">
        <svg xmlns="http://www.w3.org/2000/svg" fill="#3bd8f7" className="ikona bi bi-globe-americas" viewBox="0 0 16 16">
          <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM2.04 4.326c.325 1.329 2.532 2.54 3.717 3.19.48.263.793.434.743.484-.08.08-.162.158-.242.234-.416.396-.787.749-.758 1.266.035.634.618.824 1.214 1.017.577.188 1.168.38 1.286.983.082.417-.075.988-.22 1.52-.215.782-.406 1.48.22 1.48 1.5-.5 3.798-3.186 4-5 .138-1.243-2-2-3.5-2.5-.478-.16-.755.081-.99.284-.172.15-.322.279-.51.216-.445-.148-2.5-2-1.5-2.5.78-.39.952-.171 1.227.182.078.099.163.208.273.318.609.304.662-.132.723-.633.039-.322.081-.671.277-.867.434-.434 1.265-.791 2.028-1.12.712-.306 1.365-.587 1.579-.88A7 7 0 1 1 2.04 4.327Z"/>
        </svg>
      </div>
      <div className="kartica-naziv">{ime}</div>
      <div className="kartica-div">
        <div className="kartica-div-broj">{brojLjudi}</div>
        <div className="kartica-div-ikona">
          <svg xmlns="http://www.w3.org/2000/svg" fill="#777" className="ikona1 bi bi-people-fill" viewBox="0 0 16 16">
            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
          </svg>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [kljuc, setKljuc] = React.useState("");
  const [refreshKljuc, setRefreshKljuc] = React.useState("");
  const [flashPoruke, setFlashPoruke] = React.useState([]);
  const r = React.useRef();

  React.useEffect(()=>{
    let k = localStorage.getItem("kljuc");
    console.log("lokalni storage je " + k);
    console.log("kljuc je " + kljuc);
    if (k === null) {
      setKljuc("");
    } else {
      setKljuc(k);
    }
    k = localStorage.getItem("refreshKljuc");
    console.log("lokalni storage je " + k);
    console.log("refresh kljuc je " + refreshKljuc);
    if (k === null) {
      setRefreshKljuc("");
    } else {
      setRefreshKljuc(k);
    }
  }, []);

  function postaviFlashPoruku(poruka, tip="danger") {
    clearTimeout(r.current);
    r.current = setTimeout(()=>{
      setFlashPoruke((prev)=>{prev.unshift({id:(new Date()).getTime()+" " + Math.random(), poruka:poruka, tip:tip}); return [...prev];});
    }, 100);
  }

  return (
    <Kontekst.Provider value={{kljuc, setKljuc, refreshKljuc, setRefreshKljuc}}>
      <FlashKontekst.Provider value={{flashPoruke, setFlashPoruke, postaviFlashPoruku}}>
        <Router>
          <Routes>
            <Route path={ADRESA+"/"} element={<Predvorje/>} />
            <Route path={ADRESA+"/soba"} element={<Soba/>} />
            <Route path={ADRESA+"/spinner"} element={<Spinner/>} />
          </Routes>
        </Router>
      </FlashKontekst.Provider>
    </Kontekst.Provider>
  )
}

function Spinner({kut=90}) {
  const [rez, setRez] = React.useState("");

  React.useEffect(()=>{

    let s = Math.pow(2, 0.5) * Math.sin(3.14159/180*kut/2);
    let c = Math.pow(2, 0.5) * Math.cos(3.14159/180*kut/2)
    let fak = 1.03;
    setRez("polygon(" + 50*fak*(1-s) + "% " + 50*fak*(1-c) + "%, " + "50% 50%, " + 50*fak*(1+s) + "% " + 50*fak*(1-c) + "%)");

  }, [kut]);

  React.useEffect(()=>{
    console.log("rez je " + rez);
  }, [rez])

  return (
    <div className="spinner">
      <div style={{"clipPath":rez}} className="spinner-el">
      </div>
      <div className="spinner-el1"></div>
    </div>
  )
}

root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);

