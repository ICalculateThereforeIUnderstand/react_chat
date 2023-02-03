import React from 'react';
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
      <Navbar menuKlik={menuKlik1}/>
      <div className="soba-div">
        <aside className={klasa1}>

        </aside>
        <div className={klasa2}>
          <Poruke/>
          <UnosPoruke soba={soba} menuKlik={menuKlik2}/>
        </div>
        <aside className={klasa3}>
          <Lista menuKlik={menuKlik2}/>
        </aside>
      </div>

      <div className="soba-div1">
        <aside className={klasa4}>
          <p>manji ekran</p>
        </aside>
        <div className={klasa5}>
          <Poruke/>
          <UnosPoruke soba={soba} menuKlik={menuKlik2}/>
        </div>
        <aside className={klasa6}>
          <Lista menuKlik={menuKlik2} />
        </aside>
      </div>

      <div className="soba-div2">
        <aside className={klasa7}>
          <p>najmanji ekran</p>
        </aside>
        <div className={klasa8}>
          <Poruke/>
          <UnosPoruke soba={soba} menuKlik={menuKlik2}/>
        </div>
        <aside className={klasa9}>
          <Lista menuKlik={menuKlik2} />
        </aside>
      </div>
    </main>
  )
}

function Lista({menuKlik=()=>{return false}}) {
  const [brojLjudi, setBrojLjudi] = React.useState(169);
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

function UnosPoruke({soba="", menuKlik=()=>{return false}}) {
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

