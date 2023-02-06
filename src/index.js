import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { useFetch1 } from "./useFetch.js";
import { Flash } from "./flash.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";
import { Predvorje } from "./predvorje.js";
import { Navbar } from "./navbar.js";
import { MenuIkona, Spinner } from "./razno.js";
import { Signout } from "./login.js";
import { UpdateAccount } from './updateAccount';

const root = ReactDOM.createRoot(document.getElementById('root'));

export const Kontekst = React.createContext();
export const FlashKontekst = React.createContext();

export const ADRESA = "";
export const ADRESA1 = "http://localhost:3000";

function Soba({soba=""}) {
  const [sw1, setSw1] = React.useState(true);
  const [sw2, setSw2] = React.useState(true);
  const [sw3, setSw3] = React.useState(false);
  const [sw4, setSw4] = React.useState(true);
  const [sw5, setSw5] = React.useState(false);
  const [sw6, setSw6] = React.useState(false);
  
  const [klasa1, setKlasa1] = React.useState("lijevi-stupac");
  const [klasa2, setKlasa2] = React.useState("srednji-stupac srednji-stupac-poz1");
  const [klasa3, setKlasa3] = React.useState("desni-stupac");
  const [klasa4, setKlasa4] = React.useState("lijevi-stupac");
  const [klasa5, setKlasa5] = React.useState("srednji-stupac srednji-stupac-poz1");
  const [klasa6, setKlasa6] = React.useState("desni-stupac");
  const [klasa7, setKlasa7] = React.useState("lijevi-stupac");
  const [klasa8, setKlasa8] = React.useState("srednji-stupac srednji-stupac-poz1");
  const [klasa9, setKlasa9] = React.useState("desni-stupac");
  const [br, setBr] = React.useState(1);
  const {kljuc} = React.useContext(Kontekst);
  const [users, setUsers] = React.useState([]);
  const [poruke, setPoruke] = React.useState([]);
  const [zadnjaPorukaID, setZadanjaPorukaID] = React.useState(-1);
  const [action, setAction] = React.useState("refresh");
  const [poruka, setPoruka] = React.useState("");
  const [signoutSw, setSignoutSw] = React.useState(false);
  const [updateAccountSw, setUpdateAccountSw] = React.useState(false);
  
  const [loading, error, value] = useFetch1(ADRESA1 + '/api/soba', 
  {
    method: 'POST',
    body: JSON.stringify({
      "token": kljuc,
      "akcija": action,
      "sobaID": 1,
      "zadnjaPoruka": zadnjaPorukaID,
      "poruka": poruka
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
        

        
      } else {
        
        
        console.log("sada cemo postaviti sobu...");
        if (br === 1) {  // inicijalno ucitavanje 
          setUsers(value.value.users);
          setPoruke(value.value.poruke);
        }
        if (action === "dodajPoruku") {
          console.log("upravo smo dodali poruku");
          setUsers(value.value.users);
          setPoruke((prev)=>{return [...prev, ...value.value.poruke]});
        }
      }
    }

  }, [loading, error, value]);

  React.useEffect(()=>{
    if (poruka !== "" && action === "dodajPoruku") {
      setBr((prev)=>{return (prev+1)});
    }
  }, [poruka]);

  React.useEffect(()=>{
    if (poruke.length > 0) {
      setZadanjaPorukaID(poruke[poruke.length-1].id);
    }
  }, [poruke]);

  React.useEffect(()=>{
    console.log("zadnja poruka ID je " + zadnjaPorukaID);
  }, [zadnjaPorukaID]);

  React.useEffect(()=>{
    if (sw1) {
      if (sw2) {
        setKlasa1("lijevi-stupac");
        setKlasa2("srednji-stupac srednji-stupac-poz1");
        setKlasa3("desni-stupac");
      } else {
        setKlasa1("lijevi-stupac");
        setKlasa2("srednji-stupac srednji-stupac-poz3");
        setKlasa3("desni-stupac nevidljiv");
      }
    } else {
      if (sw2) {
        setKlasa1("lijevi-stupac nevidljiv");
        setKlasa2("srednji-stupac srednji-stupac-poz2");
        setKlasa3("desni-stupac");
      } else {
        setKlasa1("lijevi-stupac nevidljiv");
        setKlasa2("srednji-stupac srednji-stupac-poz4");
        setKlasa3("desni-stupac nevidljiv");
      }
    }
  }, [sw1, sw2]);

  React.useEffect(()=>{
    if (sw3) {
      if (sw4) {
        setKlasa4("lijevi-stupac");
        setKlasa5("srednji-stupac srednji-stupac-poz2");
        setKlasa6("desni-stupac");
      } else {
        setKlasa4("lijevi-stupac");
        setKlasa5("srednji-stupac srednji-stupac-poz4");
        setKlasa6("desni-stupac nevidljiv");
      }
    } else {
      if (sw4) {
        setKlasa4("lijevi-stupac nevidljiv");
        setKlasa5("srednji-stupac srednji-stupac-poz2");
        setKlasa6("desni-stupac");
      } else {
        setKlasa4("lijevi-stupac nevidljiv");
        setKlasa5("srednji-stupac srednji-stupac-poz4");
        setKlasa6("desni-stupac nevidljiv");
      }
    }
  }, [sw3, sw4]);

  React.useEffect(()=>{
    if (sw5) {
      if (sw6) {
        setKlasa7("lijevi-stupac");
        setKlasa8("srednji-stupac srednji-stupac-poz4");
        setKlasa9("desni-stupac");
      } else {
        setKlasa7("lijevi-stupac");
        setKlasa8("srednji-stupac srednji-stupac-poz4");
        setKlasa9("desni-stupac nevidljiv");
      }
    } else {
      if (sw6) {
        setKlasa7("lijevi-stupac nevidljiv");
        setKlasa8("srednji-stupac srednji-stupac-poz4");
        setKlasa9("desni-stupac");
      } else {
        setKlasa7("lijevi-stupac nevidljiv");
        setKlasa8("srednji-stupac srednji-stupac-poz4");
        setKlasa9("desni-stupac nevidljiv");
      }
    }

  }, [sw5, sw6]);

  function menuKlik1() {
    console.log("Kliknuo si menu1 " + Math.random());
    //console.log(window.innerWidth);
    if (window.innerWidth > 1400) {
      setSw1((prev)=>{return !prev});
    } else if (window.innerWidth <= 1400 && window.innerWidth > 1000) {
      setSw3((prev)=>{return !prev});
    } else {
      setSw5((prev)=>{return !prev});
    }
  }

  function menuKlik2() {
    console.log("Kliknuo si menu2 " + Math.random());
    if (window.innerWidth > 1400) {
      setSw2((prev)=>{return !prev});
    } else if (window.innerWidth <= 1400 && window.innerWidth > 1000) {
      setSw4((prev)=>{return !prev});
    } else {
      setSw6((prev)=>{return !prev});
    }
  }

  return (
    <main id="soba">
      <Navbar updateAccount={setUpdateAccountSw} menuKlik={menuKlik1} signout={setSignoutSw} />
      {updateAccountSw ? <UpdateAccount zatvori={setUpdateAccountSw}/> : null}
      {signoutSw ? <Signout ponisti={setSignoutSw} /> : null}
      <div className="soba-div">
        <aside className={klasa1}>

        </aside>
        <div className={klasa2}>
          <Poruke poruke={poruke}/>
          <UnosPoruke setMessage={(por)=>{setPoruka(por); setAction("dodajPoruku")}} 
                    soba={soba} menuKlik={menuKlik2}/>
        </div>
        <aside className={klasa3}>
          <Lista users={users} menuKlik={menuKlik2}/>
        </aside>
      </div>

      <div className="soba-div1">
        <aside className={klasa4}>
          <p>manji ekran</p>
        </aside>
        <div className={klasa5}>
          <Poruke poruke={poruke}/>
          <UnosPoruke setMessage={(por)=>{setPoruka(por); setAction("dodajPoruku")}} 
                    soba={soba} menuKlik={menuKlik2}/>
        </div>
        <aside className={klasa6}>
          <Lista users={users} menuKlik={menuKlik2} />
        </aside>
      </div>

      <div className="soba-div2">
        <aside className={klasa7}>
          <p>najmanji ekran</p>
        </aside>
        <div className={klasa8}>
          <Poruke poruke={poruke} />
          <UnosPoruke setMessage={(por)=>{setPoruka(por); setAction("dodajPoruku")}} 
                    soba={soba} menuKlik={menuKlik2}/>
        </div>
        <aside className={klasa9}>
          <Lista users={users} menuKlik={menuKlik2} />
        </aside>
      </div>
    </main>
  )
}

function Lista({users=[], menuKlik=()=>{return false}}) {
  const [brojLjudi, setBrojLjudi] = React.useState(169);
  const [osobe, setOsobe] = React.useState([]);

  React.useEffect(()=>{
    setOsobe([...users]);
  }, [users]);

  return (
    <div className="lista">
      <div className="lista-nav">
        <div onClick={menuKlik} className="lista-gumb">
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
        {osobe.map((el)=>{return <Osoba key={el.id} name={el.name} spol={el.spol} slogan={el.slogan} /> })}
      </div>
    </div>
  )
}

function Osoba({name="neko ime", spol="musko", slogan="nesto pametno"}) {
  //const [spol, setSpol] = React.useState("musko");
  //const [name, setName] = React.useState("igor igorovic");
  //const [slogan, setSlogan] = React.useState("");

  return (
    <div className="osoba">
      <div className="poruka-div-ikona">
        <img alt="avatar" src="1.jpg" className={spol === "musko" ? "slika spol-muski" : "slika spol-zenski"}/>
      </div>
      <div className="poruka-div-ime">
        <p className="p-ime">{name}</p>
        <p className="p-fraza">{slogan}</p>
      </div>
    </div>
  )
}

function Poruke({poruke=[]}) {
  const [por, setPor] = React.useState([]);
  const r = React.useRef();

  React.useEffect(()=>{
    setPor([...poruke]);
  }, [poruke]);

  React.useEffect(()=>{
    r.current.scrollTo(0, r.current.scrollHeight);
  }, [por])

  return (
    <div ref={r} className="soba-poruke">
      {por.map((el, ind)=>{if (ind % 2 === 0) return <Poruka parna={true} key={el.id} name={el.name} gender={el.spol}
                message={el.poruka} time={el.created_at} />; 
                return <Poruka parna={false} key={el.id} name={el.name} gender={el.spol}
                message={el.poruka} time={el.created_at} />})}
    </div>
  )
}

function Poruka({parna=false, name="neko ime", gender="musko", message="neka poruka", time="vrijeme"}) {
  const [klasa, setKlasa] = React.useState("poruka poruka-neparna");
  const [timeStamp, setTimeStamp] = React.useState([25,1,14,20]);
  const [userName, setUserName] = React.useState("Sky2345678");
  const [spol, setSpol] = React.useState("muski");
  const [poruka, setPoruka] = React.useState("ovo je neka glupost");
  
  React.useEffect(()=>{
    setUserName(name);
    setSpol(gender);
    setPoruka(message);
    
    let polje = time.split("T");
    if (polje.length == 2) {
      let datum = polje[0].split("-");
      let vrijeme = polje[1].split(":");
      setTimeStamp([parseInt(datum[2]), parseInt(datum[1]), parseInt(vrijeme[0]), parseInt(vrijeme[1])]);
    }

  }, [name, gender, message, time]);

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
        <img alt="avatar" src="1.jpg" className={spol === "musko" ? "slika spol-muski" : "slika spol-zenski"}/>
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

function UnosPoruke({setMessage=()=>{return false}, soba="", menuKlik=()=>{return false}}) {
  const [poruka, setPoruka] = React.useState("   ");

  function fun(e) {
     if (e.target.value.length >= 3 && e.target.value.length < 1031) {
       setPoruka(e.target.value);
     } 
  }

  function klik() {
    setMessage(poruka.substring(3));
    setPoruka("   ");
  }

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
          <input onChange={fun} value={poruka} type="text" 
            id="input0" className="unos-poruke-input" autoComplete="off" />
        </form>
      </div>
      <div onClick={klik} className="unos-poruke-div-send">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="unos-poruke-avioncic bi bi-send-fill" viewBox="0 0 16 16">
          <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
        </svg>
      </div>
      <div className="naslov">
        <p>{soba}</p>
        <div className="naslov-el">
          <MenuIkona menuKlik={menuKlik}/>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [kljuc, setKljuc] = React.useState("");
  const [refreshKljuc, setRefreshKljuc] = React.useState("");
  const [flashPoruke, setFlashPoruke] = React.useState([]);
  const [odabranaSoba, setOdabranaSoba] = React.useState(null);
  const r = React.useRef();

  React.useEffect(()=>{
    console.log("nova odabrana soba je:");
    console.log(odabranaSoba);

  }, [odabranaSoba]);

  React.useEffect(()=>{
    let k = localStorage.getItem("kljuc");
    //console.log("lokalni storage je " + k);
    //console.log("kljuc je " + kljuc);
    if (k === null) {
      setKljuc("");
    } else {
      setKljuc(k);
    }
    k = localStorage.getItem("refreshKljuc");
    //console.log("lokalni storage refresha je " + k);
    //console.log("refresh kljuc je " + refreshKljuc);
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
            <Route path={ADRESA+"/"} element={<Predvorje odabirSobe={setOdabranaSoba}/>} />
            <Route path={ADRESA+"/soba"} element={<Soba soba={odabranaSoba}/>} />
            <Route path={ADRESA+"/spinner"} element={<Spinner/>} />
          </Routes>
        </Router>
      </FlashKontekst.Provider>
    </Kontekst.Provider>
  )
}

root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);

