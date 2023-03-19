import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { useFetch1 } from "./useFetch";
import { Flash, FlashTip } from "./flash";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";
import { Predvorje, SobaTip } from "./predvorje";
import { Navbar } from "./navbar";
import { MenuIkona, Spinner } from "./razno";
import { Signout } from "./login";
import { UpdateAccount } from './updateAccount';
import { RoomSignOut } from "./roomInOut";
import { EmojiIzbornik, emojiziraj, vratiEmojiKod } from "./emoji";

const root = ReactDOM.createRoot(document.getElementById('root') as Element);

type setMessageResourceProps = {
  file: null | string;
  fileTip: string;
}

type KontekstTip = {
  kljuc: string;
  setKljuc: React.Dispatch<React.SetStateAction<string>>;
  refreshKljuc: string;
  setRefreshKljuc: React.Dispatch<React.SetStateAction<string>>;
  sobaID: number;
  setSobaID: React.Dispatch<React.SetStateAction<number>>;
}

type FlashKontekstTip = {
  flashPoruke: FlashTip[];
  setFlashPoruke: React.Dispatch<React.SetStateAction<FlashTip[]>>;
  //pp: (poruka:string, tip?: "danger" | "success", kod?: null | string) => void;
  postaviFlashPoruku: (poruka:string, tip:"danger" | "success", kod: null | string) => void;
}

export const Kontekst = React.createContext({} as KontekstTip);
export const FlashKontekst = React.createContext({} as FlashKontekstTip);

//export const ADRESA = "/chat";  // za rute
export const ADRESA = "";  // za rute

export const ADRESA1 = "http://localhost:3000";
//export const ADRESA1 = "http://slobodansavic1.com:8084";  // rails backend

//export const ADRESA2 = "/chat";  // za linkove
export const ADRESA2 = "";  // za linkove

//export const ADRESA = "";
//export const ADRESA2 = "";

export const localStorageSw = false;

type SobaProps = {
  soba?: {ime: string, sobaID: number};
  setRoomOut: React.Dispatch<React.SetStateAction<number>>;
}

type usersTip = {
  id: number;
  name: string;
  spol: string;
  godine: number;
  slogan: string;
  id_slike: number | null;
}

type porukeTip = {
  id: number;
  poruka: string;
  id_materijala: number | null;
  id_korisnika: number;
  erase_id: number | null;
  created_at: string;
  name: string;
  spol: string;
  userID: number;
  id_slike: number | null;
  file: string | null;
  fileTip: string | null;
  viewerID: number;
}

function Soba({soba={ime:"", sobaID:-1}, setRoomOut=()=>{return false}}: SobaProps) {
  const [sw1, setSw1] = React.useState(true);
  const [sw2, setSw2] = React.useState(true);
  const [sw3, setSw3] = React.useState(false);
  const [sw4, setSw4] = React.useState(true);
  const [sw5, setSw5] = React.useState(false);
  const [sw6, setSw6] = React.useState(false);
  const [emojiSw, setEmojiSw] = React.useState(false);
  
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
  //const [br1, setBr1] = React.useState(0);
  const {kljuc, setKljuc} = React.useContext(Kontekst);
  const [users, setUsers] = React.useState<usersTip[]>([]);
  const [poruke, setPoruke] = React.useState<porukeTip[]>([]);
  const [zadnjaPorukaID, setZadanjaPorukaID] = React.useState(-3);
  const [action, setAction] = React.useState("refresh");
  const [poruka, setPoruka] = React.useState("");
  const [file, setFile] = React.useState<null | string>(null);
  const [fileTip, setFileTip] = React.useState("");
  const [signoutSw, setSignoutSw] = React.useState(false);
  const [updateAccountSw, setUpdateAccountSw] = React.useState(false);
  const [timeStamp, setTimeStamp] = React.useState(-1);
  const [eraseID, setEraseID] = React.useState(-1);
  const {flashPoruke, setFlashPoruke, postaviFlashPoruku} = React.useContext(FlashKontekst);

  const r = React.useRef<number | null>(null);
  const r1 = React.useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const refreshTime = 5000 * 1;

  const [loading, error, value] = useFetch1(ADRESA1 + '/api/soba', 
  {
    method: 'POST',
    body: JSON.stringify({
      "token": kljuc,
      "akcija": action,
      "sobaID": soba.sobaID,
      "zadnjaPoruka": zadnjaPorukaID,
      "poruka": poruka,
      "timeStamp": timeStamp,
      "file": file,
      "fileTip": fileTip,
      "eraseID": eraseID
    }),
    headers: {
      'Content-type': 'application/json'
    }
  }, [br]);

  React.useEffect(()=>{
    console.log("Loading1: " + loading);
    console.log("Error1: " + error);
    console.log("Value1: ");
    console.log(value);
  
    if (!loading && error === undefined && value !== undefined &&
         typeof value !== "boolean") {
      if (value.error) {
        if (value.errorCode === "Vas token je istekao") {
          setKljuc("");
          navigate(ADRESA2 + "/");
        } else if (value.errorCode === "poruka je starija od 120 sekundi") {
          postaviFlashPoruku("Ne mozes obrisati poruku stariju od 120 sec", "danger", "unosPoruke");
          console.log("postavio sam upozorenje");
          setAction("refresh");
        }
      } else {
        
        
        console.log("sada cemo postaviti sobu...");
        if (action === "refresh") {
          if (br === 1) {  // inicijalno ucitavanje 
            setUsers(value.value.users);
            let poljePoruka: porukeTip[] = value.value.poruke;
            let len = 0;
            if (Array.isArray(poljePoruka)) {
              len = poljePoruka.length;
            }
          
            setTimeStamp(value.value.timeStamp);
            if (len !== 0) {
              if (false) {
                setPoruke(poljePoruka);
              } else {
                let s = new Set(poljePoruka.map((el)=>{return el.erase_id}));
                setPoruke((prev)=>{
                  return poljePoruka.filter((el)=>{return (!s.has(el.id) && el.erase_id === null)});
                });
              }
              setZadanjaPorukaID(poljePoruka[len-1].id);
            }
            r.current = window.setInterval(()=>{
              console.log("Upravo pokrecem refresh " + Math.random());
              if (!loading && action === "refresh") {
                setBr((prev)=>{return (prev+1)});
              }
            }, refreshTime);
          } else if (value.value.updateSw) {
            setUsers(value.value.users);
            let poljePoruka: porukeTip[] = value.value.poruke;
            let len = 0;
            if (Array.isArray(poljePoruka)) {
              len = poljePoruka.length;
            }
          
            setTimeStamp(value.value.timeStamp);
            if (len !== 0) {
              //setPoruke((prev)=>{return [...prev, ...poljePoruka]});
              
              let s = new Set(poljePoruka.map((el)=>{return el.erase_id}));
          
              setPoruke((prev)=>{
                let s1 = new Set(prev.map((el)=>{return el.id}));
                return [...prev.filter((el)=>{return (!s.has(el.id) && el.erase_id === null)}), ...poljePoruka.filter((el)=>{return (!s.has(el.id) && !s1.has(el.id) && el.erase_id === null)})];
              });
              setZadanjaPorukaID(poljePoruka[len-1].id);
            }            
          } else {
            setTimeStamp(value.value.timeStamp);
          }
        } else if (action === "dodajPoruku") {
          setUsers(value.value.users);
          setTimeStamp(value.value.timeStamp);
          let poljePoruka: porukeTip[] = value.value.poruke;
          let len = 0;
          if (Array.isArray(poljePoruka)) {
            len = poljePoruka.length;
          }
          if (len !== 0) {
            //setPoruke((prev)=>{return [...prev, ...poljePoruka]});

            let s = new Set(poljePoruka.map((el)=>{return el.erase_id}));
            setPoruke((prev)=>{
              let s1 = new Set(prev.map((el)=>{return el.id}));
              return [...prev.filter((el)=>{return (!s.has(el.id) && el.erase_id === null)}), ...poljePoruka.filter((el)=>{return (!s.has(el.id) && !s1.has(el.id) && el.erase_id === null)})];
            });
            setZadanjaPorukaID(poljePoruka[len-1].id);
          }
          setAction("refresh");
        } else if (action === "obrisiPoruku") {
          setUsers(value.value.users);
          setTimeStamp(value.value.timeStamp);
          let poljePoruka: porukeTip[] = value.value.poruke;
          let len = 0;
          if (Array.isArray(poljePoruka)) {
            len = poljePoruka.length;
          }
          if (len !== 0) {
            //setPoruke((prev)=>{return [...prev, ...poljePoruka]});

            let s = new Set(poljePoruka.map((el)=>{return el.erase_id}));
            setPoruke((prev)=>{
              let s1 = new Set(prev.map((el)=>{return el.id}));
              return [...prev.filter((el)=>{return (!s.has(el.id) && el.erase_id === null)}), ...poljePoruka.filter((el)=>{return (!s.has(el.id) && !s1.has(el.id) && el.erase_id === null)})];
            });
            setZadanjaPorukaID(poljePoruka[len-1].id);
          }
          setAction("refresh");
        }
      }
    }

  }, [loading, error, value]);

  React.useEffect(()=>{
    console.log("timestamp:");
    console.log(timeStamp);
    console.log(zadnjaPorukaID);
    console.log("=======================");

  }, [timeStamp, zadnjaPorukaID]);

  React.useEffect(()=>{
    console.log("pokrenuli smo useeffect");
    return ()=>{
      if (r.current) clearInterval(r.current);
      console.log("Sada POKRECEMO signout proceduru. " + Math.random());
      setRoomOut((prev)=>{return (prev+1)});
    }
  }, []);

  React.useEffect(()=>{
    if (br !== 1 && action === "refresh") {
      if (r.current) clearInterval(r.current);
      r.current = window.setInterval(()=>{
        console.log("Upravo pokrecem refresh " + Math.random());
        console.log(loading + " / " + action);
        if (!loading && action === "refresh") {
          setBr((prev)=>{return (prev+1)});
        }
      }, refreshTime);
    } else if (action === "obrisiPoruku") {
      setBr((prev)=>{return (prev+1)});
    }
  }, [action]);

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
    if (window.innerWidth > 1400) {
      setSw1((prev)=>{return !prev});
    } else if (window.innerWidth <= 1400 && window.innerWidth > 1000) {
      setSw3((prev)=>{return !prev});
    } else {
      setSw5((prev)=>{return !prev});
    }
  }

  function menuKlik2() {
    if (window.innerWidth > 1400) {
      setSw2((prev)=>{return !prev});
    } else if (window.innerWidth <= 1400 && window.innerWidth > 1000) {
      setSw4((prev)=>{return !prev});
    } else {
      setSw6((prev)=>{return !prev});
    }
  }

  function emojiRefFun(arg:{[index:string]:string} | number | string, akcija:string) {
    if (r1.current !== null) {
      if (akcija === "add") {
        r1.current.classList.add(arg as string);
        //r1.current.innerHTML = "slobodan";
      } else if (akcija === "remove") {
        r1.current.classList.remove(arg as string);
      } else if (akcija === "postaviTekst") {
        r1.current.innerHTML = vratiEmojiKod(arg as string) as string;
      } else {
        //r1.current.style = arg;
        if (typeof arg !== "string" && typeof arg !== "number") {
          r1.current.style.left = arg.left;
          r1.current.style.top = arg.top;
        }
      }
    }
  }

  function setMessageResource(e: setMessageResourceProps) {
    setFile(e.file);
    setFileTip(e.fileTip);  
  }

  function eraseMessage(id: number) {
    console.log("Dao si nalog za brisanje poruke " + id);
    if (r.current) clearInterval(r.current);
    setAction("obrisiPoruku");
    setEraseID(id);
  }

  return (
    <main id="soba">
      <div ref={r1} className="emoji-popup emoji-popup-nevidljiv">
      </div>
      <Navbar updateAccount={setUpdateAccountSw} menuKlik={menuKlik1} signout={setSignoutSw} />
      {updateAccountSw ? <UpdateAccount zatvori={setUpdateAccountSw}/> : null}
      {signoutSw ? <Signout ponisti={setSignoutSw} /> : null}
      <div className="soba-div">
        <aside className={klasa1}>

        </aside>
        <div className={klasa2}>
          <Poruke poruke={poruke} eraseMessage={eraseMessage}/>
          <UnosPoruke setMessage={(por)=>{if (r.current) clearInterval(r.current); setPoruka(por); setAction("dodajPoruku")}} 
            setMessageResource={setMessageResource} sw={emojiSw} setSw={setEmojiSw} soba={soba.ime} menuKlik={menuKlik2} emojiRef={emojiRefFun}/>
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
          <Poruke poruke={poruke} eraseMessage={eraseMessage}/>
          <UnosPoruke setMessage={(por)=>{if (r.current) clearInterval(r.current); setPoruka(por); setAction("dodajPoruku")}} 
            setMessageResource={setMessageResource} sw={emojiSw} setSw={setEmojiSw} soba={soba.ime} menuKlik={menuKlik2} emojiRef={emojiRefFun}/>
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
          <Poruke poruke={poruke} eraseMessage={eraseMessage}/>
          <UnosPoruke setMessage={(por)=>{if (r.current) clearInterval(r.current); setPoruka(por); setAction("dodajPoruku")}} 
            setMessageResource={setMessageResource} sw={emojiSw} setSw={setEmojiSw} soba={soba.ime} menuKlik={menuKlik2} emojiRef={emojiRefFun}/>
        </div>
        <aside className={klasa9}>
          <Lista users={users} menuKlik={menuKlik2} />
        </aside>
      </div>
    </main>
  )
}

type ListaProps = {
  users?: usersTip[];
  menuKlik?: () => void;
}

function Lista({users=[], menuKlik=()=>{return false}}: ListaProps) {
  const [brojLjudi, setBrojLjudi] = React.useState(169);
  const [osobe, setOsobe] = React.useState<usersTip[]>([]);

  React.useEffect(()=>{
    setOsobe([...users]);
    setBrojLjudi(users.length);
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
        {osobe.map((el)=>{return <Osoba key={el.id} name={el.name} spol={el.spol} 
             slogan={el.slogan} slikaID={el.id_slike}/> })}
      </div>
    </div>
  )
}

type OsobaTip = {
  name?: string;
  spol?: string;
  slogan: string;
  slikaID: number | null;
}

function Osoba({name="neko ime", spol="musko", 
       slogan="nesto pametno", slikaID=null}: OsobaTip) {
  //const [spol, setSpol] = React.useState("musko");
  //const [name, setName] = React.useState("igor igorovic");
  //const [slogan, setSlogan] = React.useState("");

  return (
    <div className="osoba">
      <div className="poruka-div-ikona">
        {slikaID === null ?
          <img alt="avatar" src="nepoznati.jpg" className={spol === "musko" ? "slika spol-muski" : "slika spol-zenski"}/> :
          <img alt="avatar" src={ADRESA1 + "/api/slika/" + slikaID} className={spol === "musko" ? "slika spol-muski" : "slika spol-zenski"}/> }
      </div>
      <div className="poruka-div-ime">
        <p className="p-ime">{name}</p>
        <p className="p-fraza">{slogan}</p>
      </div>
    </div>
  )
}

type PorukeProps = {
  poruke?: porukeTip[];
  eraseMessage?: (x:number) => void;
}

function Poruke({poruke=[], eraseMessage=()=>{return false}}: PorukeProps) {
  const [por, setPor] = React.useState<porukeTip[]>([]);
  const r = React.useRef<HTMLDivElement>(null);

  React.useEffect(()=>{
    setPor([...poruke]);
  }, [poruke]);

  React.useEffect(()=>{
    if (r.current) (r.current).scrollTo(0, r.current.scrollHeight);
  }, [por]);

  return (
    <div ref={r} className="soba-poruke">
      {por.map((el, ind)=>{if (ind % 2 === 0) return <Poruka parna={true} 
        key={el.id} id={el.id} name={el.name} gender={el.spol} message={el.poruka} 
        time={el.created_at} userPic={el.id_slike} resource={el.id_materijala}
        file={el.file} fileTip={el.fileTip} userID={el.userID} 
        viewerID={el.viewerID} eraseMessage={eraseMessage}/>; 
        return <Poruka parna={false} key={el.id} id={el.id} name={el.name} gender={el.spol}
        message={el.poruka} time={el.created_at} userPic={el.id_slike}  
        resource={el.id_materijala} file={el.file} fileTip={el.fileTip}
        userID={el.userID} viewerID={el.viewerID} eraseMessage={eraseMessage} />})}
    </div>
  )
}

type PorukaProps = {
  parna?: boolean;
  id: number;
  name: string;
  gender: string;
  message: string;
  time: string;
  userPic: number | null;
  resource: number | null;
  file: string | null;
  fileTip: string | null;
  userID: number;
  viewerID: number;
  eraseMessage: (c: number) => void;
}

function Poruka({parna=false, id=-1, name="neko ime", gender="musko", 
   message="neka poruka", time="vrijeme", userPic=null, 
   resource=null, file=null, fileTip="", userID=-1, viewerID=-1,
   eraseMessage=()=>{}}: PorukaProps) {
  const [klasa, setKlasa] = React.useState("poruka poruka-neparna");
  const [klasa1, setKlasa1] = React.useState("poruka-erase-confirm confirm-neparni");
  const [timeStamp, setTimeStamp] = React.useState([25,1,14,20]);
  const [userName, setUserName] = React.useState("Sky2345678");
  const [spol, setSpol] = React.useState("muski");
  const [poruka, setPoruka] = React.useState("ovo je neka glupost");
  const {kljuc} = React.useContext(Kontekst);
  const [sw, setSw] = React.useState(false);
  //const r = React.useRef();
  
  function changeTime(time: number[], hour: number): number[] {
    let sat = time[3] + hour;
    let dan, mjesec, godina;
    if (sat >= 0 && sat < 24) {
      return [time[0], time[1], sat, time[4]];
    } else if (sat >= 24) {
      sat -= 24;
      dan = time[0] + 1;
      
      mjesec = time[1];
      godina = time[2];
      switch (mjesec) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
          if (dan > 31) {
            dan = 1;
            mjesec += 1;
          } 
          break;
        case 4:
        case 6:
        case 9:
        case 11:
          if (dan > 30) {
            dan = 1;
            mjesec += 1;
          }
          break;
        case 2:
          let sw = false;
          if (godina % 4 === 0) {
            sw = true;
            if (godina % 100 === 0) {
              sw = false;
            }
            if (godina % 400 === 0) {
              sw = true;
            }
          }
          if (sw) {
            if (dan > 29) {
              dan = 1;
              mjesec = 3;
            } 
          } else {
            if (dan > 28) {
              dan = 1;
              mjesec = 3;
            } 
          }
      }
      if (mjesec > 12) {
        mjesec = 1;
        godina += 1;
      }
    } else {
      sat += 24;
      dan = time[0] - 1;
      
      mjesec = time[1];
      godina = time[2];
      switch (mjesec) {
        case 5:
        case 7:
        case 10:
        case 12:
          if (dan < 1) {
            dan = 30;
            mjesec -= 1;
          } 
          break;
        case 4:
        case 6:
        case 9:
        case 11:
        case 2:
          if (dan < 1) {
            dan = 31;
            mjesec -= 1;
          }
          break;
        case 1:
          if (dan < 1) {
            dan = 31;
            mjesec = 12;
            godina -= 1;
          }
          break;
        case 3:
          if (dan < 1) {
            let sw = false;
            if (godina % 4 === 0) {
              sw = true;
              if (godina % 100 === 0) {
                sw = false;
              }
              if (godina % 400 === 0) {
                sw = true;
              }
            }
            if (sw) { 
              dan = 29;
              mjesec -= 1;  
            } else {
              dan = 28;
              mjesec -= 1;
            }
          }
          break;
        case 8:
          if (dan < 1) {
            dan = 31;
            mjesec -= 1;
          }
          break;
      }
    }
    return [dan, mjesec, sat, time[4]];
  }
  
  React.useEffect(()=>{
    setUserName(name);
    setSpol(gender);
    setPoruka(message);
    
    let polje = time.split("T");
    if (polje.length == 2) {
      let datum = polje[0].split("-");
      let vrijeme = polje[1].split(":");

      //console.log("time zone offset:");
      //console.log(Math.round((new Date()).getTimezoneOffset()/-60));
      //console.log([parseInt(datum[2]), parseInt(datum[1]), parseInt(datum[0]), parseInt(vrijeme[0]), parseInt(vrijeme[1])])
      //setTimeStamp([parseInt(datum[2]), parseInt(datum[1]), parseInt(vrijeme[0]), parseInt(vrijeme[1])]);
      setTimeStamp(changeTime([parseInt(datum[2]), parseInt(datum[1]), parseInt(datum[0]), parseInt(vrijeme[0]), parseInt(vrijeme[1])], 
                  Math.round((new Date()).getTimezoneOffset()/-60)));
    }

  }, [name, gender, message, time]);

  React.useEffect(()=>{
    let nev = "";
    if (!sw) {
      nev = " nevidljiv";
    }
    
    if (parna) {
      setKlasa("poruka poruka-parna");
      setKlasa1("poruka-erase-confirm confirm-parni" + nev);
    } else {
      setKlasa("poruka poruka-neparna");
      setKlasa1("poruka-erase-confirm confirm-neparni" + nev);
    }
  }, [parna, sw]);

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

  function klik() {
    setSw(false);
    eraseMessage(id);
  }


  return (
    <div className={klasa} onClick={()=>{setSw(false)}}>
      <div className="poruka-div-ikona">
        {userPic === null ?
          <img alt="avatar" src="nepoznati.jpg" className={spol === "musko" ? "slika spol-muski" : "slika spol-zenski"}/> :
          <img alt="avatar" src={ADRESA1 + "/api/slika/" + userPic} className={spol === "musko" ? "slika spol-muski" : "slika spol-zenski"}/> }
      </div>
      <div className="poruka-div-tekst">
        <p className="username">{userName}</p>
        {resource !== null ?
          <>
            {fileTip === "jpg" || fileTip === "jpeg" || fileTip === "png" ?
              <img src={"data:image/" + fileTip + ";base64," + file} alt="slika" className="poruka-img"/> : null}
            {fileTip === "svg" ? <img src={"data:image/svg+xml;base64," + file} alt="slika" className="poruka-img"/> : null}
            {fileTip === "wav" ? <audio className="poruka-audio" controls> <source src={"data:audio/x-wav;base64," + file} type="audio/wav"/></audio> : null}
            {fileTip === "mp3" ? <audio className="poruka-audio" controls> <source src={"data:audio/mpeg;base64," + file} type="audio/mpeg"/></audio> : null}
            {fileTip === "mp4" ? <video className="poruka-video" controls> <source src={"data:video/mp4;base64," + file} type="video/mp4"/></video> : null}
          </> : null
        }
        <p className="poruka-tekst"><>{emojiziraj(poruka)}</></p>
      </div>
      <div className="poruka-div-time">
        <p>{ispisiVrijeme()}</p>
        {userID === viewerID ? <>
          <div onClick={(e)=>{e.stopPropagation(); setSw((prev)=>{return !prev})}} className="poruka-erase">
            <div className="poruka-erase-div div1"></div>
            <div className="poruka-erase-div div2"></div>
            <div className="poruka-erase-div div3"></div>
          </div>
          <div onMouseLeave={()=>{setSw(false)}} onClick={klik} className={klasa1}>Izbrisi</div>
          </> : null
        }
      </div>
    </div>
  )
}

type UnosPorukeProps = {
  setMessage?: (s:string) => void;
  setMessageResource?: (e: setMessageResourceProps) => void;
  emojiSw?: boolean;
  soba?: string;
  emojiRef?: (arg:{[index:string]:string} | number | string, akcija:string) => void;
  menuKlik?: () => void;
  sw?: boolean;
  setSw?: React.Dispatch<React.SetStateAction<boolean>>;
}

function UnosPoruke({setMessage=()=>{}, setMessageResource=()=>{}, 
   soba="", emojiRef=()=>{}, menuKlik=()=>{}, sw=true, setSw=()=>{}}: UnosPorukeProps) {
  const [poruka, setPoruka] = React.useState("   ");
  const [emoji, setEmoji] = React.useState("");
  const [file, setFile] = React.useState<string | null>(null);
  const [fileTip, setFileTip] = React.useState("");
  const [klasa, setKlasa] = React.useState("file-unos-div nevidljiv");
  const [klasa1, setKlasa1] = React.useState("");
  const [klasa2, setKlasa2] = React.useState("");
  const [klasa3, setKlasa3] = React.useState("");
  const {flashPoruke, setFlashPoruke, postaviFlashPoruku} = React.useContext(FlashKontekst);
  const r = React.useRef<HTMLInputElement>(null);
  const r1 = React.useRef<HTMLInputElement>(null);
  const r2 = React.useRef<HTMLImageElement>(null);
  const r3 = React.useRef<HTMLAudioElement>(null);
  const r4 = React.useRef<HTMLVideoElement>(null);
  //const [sw, setSw] = React.useState(false);

  React.useEffect(()=>{
    if (emoji !== "") {
      setPoruka((prev)=>{return (prev + ":" + emoji + ":")});
      setEmoji("");
      if (r.current) r.current.focus();
    }
  }, [emoji]);

  React.useEffect(()=>{
    if (file === null) {
      setKlasa("file-unos-div nevidljiv");
    } else {
      setKlasa("file-unos-div");
    }
  }, [file]);

  React.useEffect(()=>{
    console.log("FILE TIP je " + fileTip);
    if (fileTip === "jpg" || fileTip === "png" || fileTip === "jpeg" || fileTip === "svg") {
      console.log("slika je vidljiva");
      setKlasa1("file-unos-div-img");
      setKlasa2("nevidljiv");
      setKlasa3("nevidljiv");
    } else if (fileTip === "mp3" || fileTip === "wav"){
      console.log("audio je vidljiv");
      setKlasa1("nevidljiv");
      setKlasa2("file-unos-div-audio");
      setKlasa3("nevidljiv");
    } else if (fileTip === "mp4") {
      setKlasa1("nevidljiv");
      setKlasa2("nevidljiv");
      setKlasa3("file-unos-div-video");
    }
  }, [fileTip]);

  function fun(e: React.ChangeEvent<HTMLInputElement>) {
     if ((e.target as HTMLInputElement).value.length >= 3 && e.target.value.length < 1031) {
       setPoruka(e.target.value);
     } 
  }

  function klik() {
    if (file === null) {
      setMessage(poruka.substring(3));
    } else {
      if (poruka.substring(3) === "") {
        setMessage(" ");
      } else {
        setMessage(poruka.substring(3));
      }
    }
    setMessageResource({"file":file, "fileTip":fileTip});
    setPoruka("   ");
    setSw(false);
    setFile(null);
    setFileTip("");
  }

  function changePic(e: React.ChangeEvent<HTMLInputElement>) {
    let fileList: FileList = (e.target).files as FileList;
    console.log(fileList);
    let v = fileList[0].name.split(".");
    let tip = v[v.length-1];
    console.log("tip je " + v[v.length-1]);
    
    if (tip !== "jpg" && tip !== "jpeg" && tip !== "png" && 
        tip !== "svg" && tip !== "wav" && tip !== "mp3" && tip !== "mp4") {
      postaviFlashPoruku("Dopusteni su sljedeci formati: jpg, jpeg, png, svg, wav, mp3, mp4.", "danger", "unosPoruke");
      setFile(null);
      setFileTip("");
    } else if (fileList[0].size < 16777200) {
      
      let reader = new FileReader();
      reader.readAsDataURL(fileList[0]);

      reader.onload = function() {
        let rez: string | null = reader.result as string;
        if (tip === "wav" || tip === "mp3") {
          if (r3.current) r3.current.src = rez;
        } else if (tip === "mp4") {
          if (r4.current) r4.current.src = rez;
        } else {
          if (r2.current) r2.current.src = rez;
        }
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
        console.log("postavljamo setFileTip na " + v[v.length-1]);
        setFileTip(v[v.length-1]);
      }
    } else {
      postaviFlashPoruku("Maksimalna velicina slike je 16MB.", "danger", "unosPoruke");
      e.target.value = "";
      setFile(null);
      setFileTip("");
    }
  }

  function klik1() {
    setFile(null);
    setFileTip("");
  }

  return (
    <div className="soba-unos-poruke">  
      <div className="flash-container">
        {flashPoruke.map((el)=>{return <Flash key={el.id} id={el.id} setFlashPoruke={setFlashPoruke} tip={el.tip} poruka={el.poruka} kod1="unosPoruke" kod2={el.kod} />})}
      </div> 
      <div className={klasa}>
        <div onClick={klik1} className="lista-gumb">
          <div className="lista-gumb-el">
            <div className="lista-gumb-el1"></div>
            <div className="lista-gumb-el2"></div>
          </div>
        </div>
        <img ref={r2} src="nepoznati.jpg" alt="slika" className={klasa1}/>
        <audio ref={r3} className={klasa2} controls> <source type={"audio/"+fileTip}/></audio>
        <video ref={r4} className={klasa3} controls><source type="video/mp4"/></video>
      </div>
      <EmojiIzbornik setEmoji={setEmoji} sw={sw} setSw={setSw} emojiRef={emojiRef} /> 
      <div className="unos-poruke-div-smajl" onClick={()=>{setSw((prev)=>{return !prev})}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="unos-poruke-smajlic bi bi-emoji-smile" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
          <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"/>
        </svg>
      </div>

      <div className="unos-poruke-div-input">
        <form className="unos-poruke-forma" onSubmit={(e)=>{e.preventDefault(); klik()}}>
          <input ref={r} onChange={fun} value={poruka} type="text" 
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
        <div className="naslov-ikona">
          <svg onClick={()=>{if (r1.current) r1.current.click()}} xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="naslov-ikona-el bi bi-file-earmark-arrow-up" viewBox="0 0 16 16">
            <path d="M8.5 11.5a.5.5 0 0 1-1 0V7.707L6.354 8.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 7.707V11.5z"/>
            <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
          </svg>
        </div>
      </div>
      <input ref={r1} onChange={changePic} type="file" id="input1"
                  style={{display:"none"}}/>
    </div>
  )
}

function App() {
  const [kljuc, setKljuc] = React.useState("");
  const [refreshKljuc, setRefreshKljuc] = React.useState("");
  const [flashPoruke, setFlashPoruke] = React.useState<FlashTip[]>([]);
  const [odabranaSoba, setOdabranaSoba] = React.useState<SobaTip>({} as SobaTip);
  const [sobaID, setSobaID] = React.useState(-1);
  const [br, setBr] = React.useState(0);
  const [br1, setBr1] = React.useState(0);
  const r = React.useRef<number | null>(null);
  const r1 = React.useRef<number | null>(null);

  const refreshTokenTime = 1000 * 60 * 5;

  const [loading, error, value] = useFetch1(ADRESA1 + '/api/refresh_token', 
  {
    method: 'POST',
    body: JSON.stringify({
      "refreshToken": refreshKljuc
    }),
    headers: {
      'Content-type': 'application/json'
    }
  }, [br1]);

  React.useEffect(()=>{
    console.log("Loading: " + loading);
    console.log("Error: " + error);
    console.log("Value: ");
    console.log("Refreshamo kljuc");
    console.log(value);
  
    if (!loading && error === undefined && value !== undefined &&
         typeof value !== "boolean") {
      if (value.error) {
        if (localStorage) {
          localStorage.setItem("kljuc", "");
          localStorage.setItem("refreshKljuc", "");
        } else {
          sessionStorage.setItem("kljuc", "");
          sessionStorage.setItem("refreshKljuc", "");
        }
        setKljuc("");
        setRefreshKljuc("");
      } else {
        if (localStorage) {
          localStorage.setItem("kljuc", value.value.token);
          localStorage.setItem("refreshKljuc", value.value.refreshToken);
        } else {
          sessionStorage.setItem("kljuc", value.value.token);
          sessionStorage.setItem("refreshKljuc", value.value.refreshToken);
        }
        setKljuc(value.value.token);
        setRefreshKljuc(value.value.refreshToken);
      }
    }

  }, [loading, error, value]);

  React.useEffect(()=>{
    console.log("U aplikaciji        kljuc je POSTAVLJEN na " + kljuc);
    console.log("U aplikaciji refreshKljuc je POSTAVLJEN na " + refreshKljuc);
  }, [kljuc]);

  React.useEffect(()=>{
    let k;
    if (localStorageSw) {
      k = localStorage.getItem("kljuc");
    } else {
      k = sessionStorage.getItem("kljuc");
    }
    //console.log("lokalni storage je " + k);
    //console.log("kljuc je " + kljuc);
    if (k === null) {
      setKljuc("");
    } else {
      setKljuc(k);
      setBr1((prev)=>{return (prev+1)});
    }
    if (localStorageSw) {
      k = localStorage.getItem("refreshKljuc");
    } else {
      k = sessionStorage.getItem("refreshKljuc");
    }
    //console.log("lokalni storage refresha je " + k);
    //console.log("refresh kljuc je " + refreshKljuc);
    if (k === null) {
      setRefreshKljuc("");
    } else {
      setRefreshKljuc(k);
    }

    r1.current = window.setInterval(()=>{
      console.log("pokrecem REFRESH proceduru " + Math.random());
      setBr1((prev)=>{return (prev+1)});
    }, refreshTokenTime);

    return ()=>{
      if (r1.current) clearInterval(r1.current);
    }

  }, []);

  React.useEffect(()=>{
    console.log("nova sobaID je " + sobaID);
  }, [sobaID]);

  type postaviFlashPorukuProps = {
    poruka: string;
    tip: "danger" | "success";
    kod: null | string;
  }

  function postaviFlashPoruku(poruka: string, tip: "danger" | "success", kod: null | string) {
  //function pp({poruka="neka poruka", tip="danger", kod=null}:postaviFlashPorukuProps) {    
    if (r.current) clearTimeout(r.current);
    r.current = window.setTimeout(()=>{
      setFlashPoruke((prev)=>{
        let msec = (new Date()).getTime();
        if (prev.length == 0 || prev[0].id !== msec) {
          prev.unshift({id:msec, poruka:poruka, tip:tip, kod:kod}); 
        }
        return [...prev];});
    }, 100);
  }

  return (
    <Kontekst.Provider value={{kljuc, setKljuc, refreshKljuc, setRefreshKljuc, sobaID, setSobaID}}>
      <FlashKontekst.Provider value={{flashPoruke, setFlashPoruke, postaviFlashPoruku}}>
        <Router>
          <Routes>
            <Route path={ADRESA+"/"} element={<Predvorje odabirSobe={setOdabranaSoba}/>} />
            <Route path={ADRESA+"/soba"} element={<Soba setRoomOut={setBr} soba={odabranaSoba}/>} />
            <Route path={ADRESA+"/spinner"} element={<Spinner/>} />
          </Routes>
        </Router>
        <RoomSignOut sw={br} />
      </FlashKontekst.Provider>
    </Kontekst.Provider>
  )
}

root.render(
  
    <App/>
  
);
