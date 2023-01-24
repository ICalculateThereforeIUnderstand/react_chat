import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { useFetch1 } from "./useFetch.js";
import { Flash } from "./flash.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));

const ADRESA = "http://localhost:3000";
const ADRESA1 = "";

export const FlashKontekst = React.createContext();

function App() {
  const [flashPoruke, setFlashPoruke] = React.useState([]);
  
  function postaviFlashPoruku(poruka, tip="danger") {
    setFlashPoruke((prev)=>{prev.unshift({id:(new Date()).getTime() + "-" + Math.random(), poruka:poruka, tip:tip}); return [...prev];});
  }
  
  return (
    <FlashKontekst.Provider value={[flashPoruke, setFlashPoruke, postaviFlashPoruku]}>
      <Router>
        <Routes>
          <Route path={ADRESA1+"/"} element={<Unos/>} />
          <Route path={ADRESA1+"/unos"} element={<Unos/>} />
          <Route path={ADRESA1+"/zapis"} element={<Zapis/>} />
        </Routes>
      </Router>
    </FlashKontekst.Provider>
  )
}

function Zapis() {
  const [zapisIme, setZapisIme] = React.useState("");
  const [br, setBr] = React.useState(0);
  const [flashPoruke, setFlashPoruke, postaviFlashPoruku] = React.useContext(FlashKontekst);
  const [id, setId] = React.useState(null);
  const [tip, setTip] = React.useState(null);

  const [loading, error, value] = useFetch1(ADRESA + '/file_ime', 
  {
    method: 'POST',
    body: JSON.stringify({
      "fileIme": zapisIme
    }),
    headers: {
      'Content-type': 'application/json'
    }
  }, [br]);

  React.useEffect(()=>{
    //postaviFlashPoruku("Ovo je pokusna poruka", "success");
    console.log("loading: " + loading);
    console.log("error: " + error);
    console.log("value:");
    console.log(value);

    if (!loading) {
      if (error === undefined) {
        if (value !== undefined && value !== null) {
          if (value.error) {
            postaviFlashPoruku(value.errorCode, "danger");
            setTip(null);
            setId(null);
          } else {
            postaviFlashPoruku("Zapis je pronaden - " + value.value.id, "success");
            setTip(value.value.tip);
            setId(value.value.id);
          }
        }
      } else {
        postaviFlashPoruku(error, "danger");
      }
      
    }
  }, [loading, error, value]);

  function imeFun(e) {
    setZapisIme(e.target.value);
  }

  function submitaj() {
    console.log("Requestas ime: " + zapisIme);
    if (zapisIme !== zapisIme.trim()) {
      postaviFlashPoruku("Ilegalno ime", "danger");
      return false;
    } else {
      let slovo = false;
      for (let i = 0; i < zapisIme.length; i++) {
        if (zapisIme[i].match(/[a-z]/i)) {
          slovo = true;
        }
        if (zapisIme[i] === " ") {
          postaviFlashPoruku("Ime mora biti jedna rijec", "danger");
          return false;
        }
      }
      if (!slovo) {
        postaviFlashPoruku("Ime mora imati barem jedno slovo", "danger");
        return false;
      }
    }

    setBr((prev)=>{return (prev+1)});
  }

  return (
  <main className="main1">
    <div className="flash-cont">
      {flashPoruke.map((el)=>{return <Flash key={el.id} id={el.id} setFlashPoruke={setFlashPoruke} tip={el.tip} poruka={el.poruka}/>})}
    </div>
    <div className="forma1">
      <form>
        <label htmlFor="input0">Ime:</label><br/>
        <input type="text" onChange={imeFun} value={zapisIme} id="input0" placeholder="upisite ime zapisa"/>
       <br/>
       <Gumb tekst="submitaj" height="60px" width="120px" fun={submitaj}/>
      </form>
    </div>
    <div className="ploca1">
      {tip === "jpg" || tip === "jpeg" || tip === "png" || tip === "svg" ? <img alt="slika" src={ADRESA+"/api/slika/"+id+"/"+zapisIme+"."+tip} className="slika"/> : null}
      {tip === "pdf" ? <embed src={ADRESA+"/api/slika/"+id+"/"+zapisIme+"."+tip} width="500" height="375" type="application/pdf"></embed> : null}
      {tip === "wav" ? <audio className="audio-el" controls> <source src={ADRESA+"/api/slika/"+id+"/"+zapisIme+"."+tip} type="audio/wav"/></audio> : null}
      {tip === "mp3" ? <audio className="audio-el" controls> <source src={ADRESA+"/api/slika/"+id+"/"+zapisIme+"."+tip} type="audio/mpeg"/></audio> : null}
      {tip === "mp4" ? <video className="slika" controls><source src={ADRESA+"/api/slika/"+id+"/"+zapisIme+"."+tip} type="video/mp4"/></video> : null}
    </div>
  </main>
  )
}

function Unos() {
  const [fileUcitanSw, setFileUcitanSw] = React.useState(false);
  const [file, setFile] = React.useState(null);
  const [fileIme, setFileIme] = React.useState("");
  const [fileTip, setFileTip] = React.useState("");
  const [pocetni, setPocetni] = React.useState("");
  const [br, setBr] = React.useState(0);
  const [flashPoruke, setFlashPoruke, postaviFlashPoruku] = React.useContext(FlashKontekst);

  const r = React.useRef();

  const [loading, error, value] = useFetch1(ADRESA + '/input_file', 
  {
    method: 'POST',
    body: JSON.stringify({
      "file": file,
      "fileTip": fileTip,
      "fileIme": fileIme
    }),
    headers: {
      'Content-type': 'application/json'
    }
  }, [br]);

  React.useEffect(()=>{
    //postaviFlashPoruku("Ovo je pokusna poruka", "success");
    console.log("loading: " + loading);
    console.log("error: " + error);
    console.log("value:");
    console.log(value);

    if (!loading) {
      if (error === undefined) {
        if (value !== undefined && value !== null) {
          if (value.error) {
            postaviFlashPoruku(value.errorCode, "danger");
          } else {
            postaviFlashPoruku(value.value, "success");
          }
        }
      } else {
        postaviFlashPoruku(error, "danger");
      }
      
    }
  }, [loading, error, value]);

  function changePic(e) {
    console.log("Promjena slike " + Math.random());
    console.log("val: " + e.target.value);
    let fileList = e.target.files;
    console.log(fileList);
    console.log(fileList[0].size);
    if (fileList[0].size < -2048) {
      e.target.value = "";
    } else if (fileList[0].size < 16777200) {
      let reader = new FileReader();
      reader.readAsDataURL(fileList[0]);

      reader.onload = function() {
        setFileUcitanSw(true);
        let rez = reader.result;
        setPocetni(rez);
        if (rez.length > 22 || true) {
          rez = rez.toString().replace(/^data:(.*,)?/, '');
          //rez = rez.substring(22);  // ovo je hack da uklonimo pocetni suvisni string
          // bez ovog hacka program ne funkcionira jer reader dodaje taj suvisni
          // string koji nije kompatibilan sa Base64.decode64 u ruby in railsu
        } else {
          rez = null;
        }
        setFile(rez);
        //console.log("ime filea " + fileList[0].name.split(".")[1]);
        let v = fileList[0].name.split(".");
        setFileTip(v[v.length-1]);
      }
    } else {
      e.target.value = "";
    }
  }

  function submitaj() {
    console.log("submitam:");
    console.log("ime: " + fileIme);
    console.log("tip: " + fileTip);
    console.log("file: " + file);
    console.log("pocetni string: " + pocetni);
    if (fileIme !== fileIme.trim()) {
      postaviFlashPoruku("Ilegalno ime", "danger");
      return false;
    } else {
      let slovo = false;
      for (let i = 0; i < fileIme.length; i++) {
        if (fileIme[i].match(/[a-z]/i)) {
          slovo = true;
        }
        if (fileIme[i] === " ") {
          postaviFlashPoruku("Ime mora biti jedna rijec", "danger");
          return false;
        }
      }
      if (!slovo) {
        postaviFlashPoruku("Ime mora imati barem jedno slovo", "danger");
        return false;
      }
    }

    if (file === null) {
      postaviFlashPoruku("Morate odabrati file za upload", "danger");
      return false;
    }
    
    if (fileTip === "") {
      postaviFlashPoruku("Tip filea mora biti vidljiv", "danger");
      return false;
    } else if (fileTip !== "jpg" && fileTip !== "jpeg" && fileTip !== "png" &&
         fileTip !== "pdf" && fileTip !== "svg" && fileTip !== "wav" &&
         fileTip !== "mp3" && fileTip !== "mp4") {
      postaviFlashPoruku("Tip filea moze biti jpg, jpeg, png, svg, pdf, wav, mp3 ili mp4", "danger");
      return false;
    }
    setBr((prev)=>{return (prev+1)});
  }

  function imeFun(e) {
    setFileIme(e.target.value);
  }

  return (
    <main className="main">
      <div className="ploca">
        <div className="flash-cont">
          {flashPoruke.map((el)=>{return <Flash key={el.id} id={el.id} setFlashPoruke={setFlashPoruke} tip={el.tip} poruka={el.poruka}/>})}
        </div>
        <form className="forma">
          <label htmlFor="input0">Ime:</label><br/>
          <input type="text" onChange={imeFun} value={fileIme} id="input0" placeholder="upisite ime zapisa"/>
          <br/>
          <input ref={r} onChange={changePic} type="file" id="input1"
                  style={{display:"none"}}/>
          <label className="label" htmlFor="idd" onClick={()=>{r.current.click();}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="ikona bi bi-file-earmark-arrow-down" viewBox="0 0 16 16">
              <path d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293V6.5z"/>
              <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
            </svg>
          </label>
          <Gumb tekst="submitaj" height="60px" width="120px" fun={submitaj}/>
        </form>
      </div>
    </main>
  )
}
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);

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

    /*r.current.classList.remove("gumb-nekliknuti");
    r.current.classList.add("gumb-kliknuti");*/
    /*r.current.style.backgroundColor = "red";*/
    //setBr((prev)=>{return prev+1});
    fun();
    setGumbKlasa("gumb gumb-kliknuti");
    r1.current = setTimeout(()=>{
      /*r.current.style.backgroundColor = "#d9e6fa";*/
      /*r.current.classList.remove("gumb-kliknuti");
      r.current.classList.add("gumb-nekliknuti");*/
      setGumbKlasa("gumb gumb-nekliknuti");
    }, 200);
  }

  return (
    <div ref={r} style={{"height":height, "width":width}} onClick={klik} className={gumbKlasa}>{tekst}</div>
  )
}