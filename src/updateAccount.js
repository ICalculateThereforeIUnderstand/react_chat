import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { FlashKontekst, Kontekst, ADRESA1 } from './index.js';
import { Spinner, Gumb } from './razno.js';
import { useFetch1 } from "./useFetch.js";
import { Flash } from "./flash.js";

export function UpdateAccount({zatvori=()=>{return false}}) {
    const [ime, setIme] = React.useState("");
    const [slogan, setSlogan] = React.useState("");
    const [spol, setSpol] = React.useState("musko");
    const [email, setEmail] = React.useState("");
    const [sw, setSw] = React.useState(false);
    const [sw1, setSw1] = React.useState(false);
    const [godine, setGodine] = React.useState(30);
    const {flashPoruke, setFlashPoruke, postaviFlashPoruku} = React.useContext(FlashKontekst);
    const {kljuc} = React.useContext(Kontekst);
    const [br, setBr] = React.useState(1);
    const [akcija, setAkcija] = React.useState("ucitaj");
    const r = React.useRef();
    const r1 = React.useRef();
    const [file, setFile] = React.useState(null);
    const [filePromjenjenSw, setFilePromjenjenSw] = React.useState(false);
    const [filePrisutanSw, setFilePrisutanSw] = React.useState(false);
    const [fileTip, setFileTip] = React.useState("");
 
    const [loading, error, value] = useFetch1(ADRESA1 + '/api/update_user1', 
    {
      method: 'POST',
      body: JSON.stringify({
        "token": kljuc,
        "akcija": akcija,
        "email": email,
        "spol": spol,
        "godine": godine,
        "slogan": slogan,
        "fileTip": fileTip,
        "file": ((p)=>{if (p) return file; return null})(filePromjenjenSw),
        "filePromjenjenSw": filePromjenjenSw    
      }),
      headers: {
        'Content-type': 'application/json'
      }
    }, [br]);

    React.useEffect(()=>{
      setBr((prev)=>{return (prev+1)});
    }, [kljuc]);

    React.useEffect(()=>{
        console.log("Loading: " + loading);
        console.log("Error: " + error);
        console.log("Value: ");
        console.log(value);
    
      if (!loading && error === undefined && value !== undefined) {
        if (value.error) {

        } else {
          if (akcija === "ucitaj") {
            setIme(value.value.name);
            setEmail(value.value.email);
            setSpol(value.value.spol); 
            setGodine(value.value.godine);
            setSlogan(value.value.slogan);
            if (value.value.file !== null) {
              setFile(value.value.file);
              //r1.current.src = "data:image/jpeg;base64," + value.value.file;
              r1.current.src = "data:image/" + value.value.fileTip + ";base64," + value.value.file;
              setFileTip(value.value.fileTip);
              setFilePrisutanSw(true);
              setFilePromjenjenSw(false);
            } else {
              setFile(null);
              setFilePrisutanSw(false);
              setFileTip("");
              setFilePromjenjenSw(false);
              r1.current.src = "nepoznati.jpg";
            }
          } else {
            postaviFlashPoruku("Unos podataka je uspio", "success");
            setTimeout(()=>{zatvori(false)}, 2000);
          }
            
        }
      }
    
    }, [loading, error, value]);

    function klik() {
      zatvori(false);
    }
  
    function fun(e) {
      setGodine(e.target.innerHTML);
    }

    function fun1() {
      console.log("Unijet cemo spol: " + spol);
      console.log("godine: " + godine);
      console.log("moto: " + slogan);
      let regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i;

      if (slogan.length > 128) {
        postaviFlashPoruku("Moto ne smije biti duzi od 128 znakova. Pokusajte ponovo.", "danger");
      } else if (!regex.test(email)) {
        postaviFlashPoruku("Niste upisali dobar email. Probajte ponovo", "danger");
      } else { 
        setAkcija("unos");
        setBr((prev)=>{return (prev+1)});
      }
    }

    function changePic(e) {
      let fileList = e.target.files;
      console.log(fileList);
      let v = fileList[0].name.split(".");
      let tip = v[v.length-1];
      console.log("tip je " + v[v.length-1]);
      
      if (tip !== "jpg" && tip !== "jpeg" && tip !== "png") {
        postaviFlashPoruku("Dopusteni su sljedeci formati: jpg, jpeg, png.", "danger");
      } else if (fileList[0].size < 16777200) {
        let reader = new FileReader();
        reader.readAsDataURL(fileList[0]);

        reader.onload = function() {
          setFilePromjenjenSw(true);
          setFilePrisutanSw(true);
          let rez = reader.result;
          r1.current.src = rez;
          console.log("String koji smo odsjekli:");
          console.log(rez.substring(0,100));
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
          setFileTip(v[v.length-1]);
        }
      } else {
        postaviFlashPoruku("Maksimalna velicina slike je 16MB.", "danger");
        e.target.value = "";
      }
    }

    function ukloniKnjigu(e) {
      e.stopPropagation();
      setFile(null);
      setFileTip("");
      setFilePromjenjenSw(true);
      setFilePrisutanSw(false);
      r1.current.src = "nepoznati.jpg";
    }
  
    return (
        <div className="popup-plast">
        <div className="popup-update-account">
          {loading ? <Spinner/> : null}
          <div className="flash-container">
            {flashPoruke.map((el)=>{return <Flash key={el.id} id={el.id} setFlashPoruke={setFlashPoruke} tip={el.tip} poruka={el.poruka}/>})}
          </div>

          <div className="el1">
            <div onClick={klik} className="lista-gumb">
              <div className="lista-gumb-el">
                <div className="lista-gumb-el1"></div>
                <div className="lista-gumb-el2"></div>
              </div>
            </div>

            <input ref={r} onChange={changePic} type="file" id="input1"
                  style={{display:"none"}}/>
            <div className="img-cont" onClick={()=>{r.current.click();}}>
              <img ref={r1} src="nepoznati.jpg" alt="slika" className="el1-slika"/>
              {filePrisutanSw ? 
                <div onClick={ukloniKnjigu} className="lista-gumb krizic">
                  <div className="lista-gumb-el">
                    <div className="lista-gumb-el1"></div>
                    <div className="lista-gumb-el2"></div>
                  </div> 
                </div> : null }
            </div>
            <p className="el1-ime">{ime}</p>
          </div>       
          
          <div className="lista-div">
            <label htmlFor="input0">Email:</label><br/>
            <input type="text" className="input1" onChange={(el)=>{setEmail(el.target.value)}} value={email} id="input0" placeholder="upisite email"/>
          </div> 

          <div className="lista-div">
            <label htmlFor="input0">Osobni moto:</label><br/>
            <input type="text" className="input1" onChange={(el)=>{setSlogan(el.target.value)}} value={slogan} id="input0" placeholder="upisite osobni moto"/>
          </div> 
          
          <div className="unos-cont">
  
            <div className="unos-el">
              <div className="naslov">Spol:</div>
              <div className="izbornik" onClick={()=>{setSw((prev)=>{return !prev})}} >
                <p>{spol}</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="#c4c4c4" className="strelica bi bi-caret-down-fill" viewBox="0 0 16 16">
                  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                </svg>
                {sw ?
                  <div className="menu">
                    <div onClick={()=>{setSpol("musko")}} className="menu-el">Musko</div>
                    <div onClick={()=>{setSpol("zensko")}} className="menu-el">Zensko</div>
                  </div> : null}
              </div>
            </div>
  
            <div className="unos-el">
              <div className="naslov">Godine:</div>
              <div className="izbornik" onClick={()=>{setSw1((prev)=>{return !prev})}} >
                <p>{godine}</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="#c4c4c4" className="strelica bi bi-caret-down-fill" viewBox="0 0 16 16">
                  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                </svg>
                {sw1 ?
                  <div className="menu1">
                    {Array.from({length: 82}, (x, i) => i+18).map((el)=>{return <div onClick={fun} className="menu-el" key={el}>{el}</div>})}
                  </div> : null}
              </div>
            </div>
          </div>
          <div className="gumb-cont">
            <Gumb fun={fun1} tekst="update" height="48px" width="70%" />
          </div>
        </div>
      </div>
    )
  }



export function UpdateAccount1({zatvori=()=>{return false}}) {
  const [loading, setLoading] = React.useState(false);
  const [ime, setIme] = React.useState("Slobodan");
  const [slogan, setSlogan] = React.useState("neki slogan");
  const [spol, setSpol] = React.useState("musko");
  const [sw, setSw] = React.useState(true);
  const [sw1, setSw1] = React.useState(true);
  const [godine, setGodine] = React.useState(30);

  function klik() {
    zatvori(false);
  }

  function fun() {

  }

  return (
    <div className="popup-plast">
      <div className="popup-update">
        {loading ? <Spinner/> : null}
        <div className="el1">
          <div onClick={klik} className="lista-gumb">
            <div className="lista-gumb-el">
              <div className="lista-gumb-el1"></div>
              <div className="lista-gumb-el2"></div>
            </div>
          </div>
          <img src="nepoznati.jpg" alt="slika" className="el1-slika"/>
          <p className="el1-ime">{ime}</p>
        </div>
        
        <div className="lista-div">
          <label htmlFor="input0">Email:</label><br/>
          <input type="text" className="input1" onChange={(el)=>{setSlogan(el.target.value)}} value={slogan} id="input0" placeholder="upisite osobni moto"/>
        </div> 

        <div className="lista-div">
          <label htmlFor="input0">Osobni moto:</label><br/>
          <input type="text" className="input1" onChange={(el)=>{setSlogan(el.target.value)}} value={slogan} id="input0" placeholder="upisite osobni moto"/>
        </div> 
          
          <div className="unos-cont">
  
            <div className="unos-el">
              <div className="naslov">Spol:</div>
              <div className="izbornik" onClick={()=>{setSw((prev)=>{return !prev})}} >
                <p>{spol}</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="#c4c4c4" className="strelica bi bi-caret-down-fill" viewBox="0 0 16 16">
                  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                </svg>
                {sw ?
                  <div className="menu">
                    <div onClick={()=>{setSpol("musko")}} className="menu-el">Musko</div>
                    <div onClick={()=>{setSpol("zensko")}} className="menu-el">Zensko</div>
                  </div> : null}
              </div>
            </div>
  
            <div className="unos-el">
              <div className="naslov">Godine:</div>
              <div className="izbornik" onClick={()=>{setSw1((prev)=>{return !prev})}} >
                <p>{godine}</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="#c4c4c4" className="strelica bi bi-caret-down-fill" viewBox="0 0 16 16">
                  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                </svg>
                {sw1 ?
                  <div className="menu1">
                    {Array.from({length: 82}, (x, i) => i+18).map((el)=>{return <div onClick={fun} className="menu-el" key={el}>{el}</div>})}
                  </div> : null}
              </div>
            </div>
          </div>
      </div>    
    </div>
  )
}