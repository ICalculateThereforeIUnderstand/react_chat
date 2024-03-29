import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { useFetch1 } from "./useFetch";
import { Flash } from "./flash";
import { useNavigate } from "react-router-dom";
import { ADRESA1, Kontekst, localStorageSw } from "./index";
import { Navbar } from "./navbar";
import { Spinner } from "./razno";
import { UnosDetalja, Signout, Signin, Signup } from "./login";
import { UpdateAccount } from "./updateAccount";
import { RoomSignIn } from "./roomInOut";

export  type SobaTip = {
    sobaID: number;
    ime: string;
  }

  type SobaTip1 = {
    count: number;
  } & SobaTip;

  type PredvorjeProps = {
    odabirSobe?: React.Dispatch<React.SetStateAction<SobaTip>>;
    predvorje?: boolean;
  }

  export function Predvorje({predvorje=false, odabirSobe=()=>{}}: PredvorjeProps) {
    const [sobe, setSobe] = React.useState<SobaTip1[]>([]);
    //const [sobaID, setSobaID] = React.useState(-1);
    const {kljuc, setKljuc, setRefreshKljuc, sobaID, setSobaID} = React.useContext(Kontekst);
    const [signinSw, setSigninSw] = React.useState(false);
    const [signupSw, setSignupSw] = React.useState(false);
    const [signoutSw, setSignoutSw] = React.useState(false);
    const [updateAccountSw, setUpdateAccountSw] = React.useState(false);
    const [unosDetaljaSw, setUnosDetaljaSw] = React.useState(false);
    const [br, setBr] = React.useState(1);
    const [br1, setBr1] = React.useState(0);
    const [br2, setBr2] = React.useState(0);
    const r = React.useRef<number | null>(null);
    const navigate = useNavigate();
  
    const [loading, error, value] = useFetch1(ADRESA1 + '/api/predvorje', 
    {
      method: 'POST',
      body: JSON.stringify({
      }),
      headers: {
        'Content-type': 'application/json'
      }
    }, [br]);

    const [loading1, error1, value1] = useFetch1(ADRESA1 + '/api/provjeri_token', 
    {
      method: 'POST',
      body: JSON.stringify({
        'token': kljuc
      }),
      headers: {
        'Content-type': 'application/json'
      }
    }, [br1]);

    React.useEffect(()=>{
      console.log("kljuc je u predvorju " + kljuc);
      if (kljuc !== "") {
        //setBr1((prev)=>{return (prev+1)});  suspendirana je provjera tokena, 
        //to se efektivno radi u App sa refreshom kljuca, ako je kljuc nevazeci, nece biti refresha
      }
    }, [kljuc]);
  
    React.useEffect(()=>{
      console.log("Loading: " + loading);
      console.log("Error: " + error);
      console.log("Value: ");
      console.log(value);
  
      if (!loading && error === undefined && value !== undefined &&
           typeof value !== "boolean") {
        setSobe(value.value.sobe);
      }
  
    }, [loading, error, value]);

    React.useEffect(()=>{
      console.log("Loading: " + loading1);
      console.log("Error: " + error1);
      console.log("Value: ");
      console.log(value1);
  
      if (!loading1 && error1 === undefined && value1 !== undefined && 
           typeof value1 !== "boolean") {
        if (value1.error && value1.errorCode !== "Vas token je prazan string") {
          /*
          if (localStorageSw) {
            localStorage.setItem("kljuc", "");
            localStorage.setItem("refreshKljuc", "");
          } else {
            sessionStorage.setItem("kljuc", "");
            sessionStorage.setItem("refreshKljuc", "");
          }
          setKljuc("");
          setRefreshKljuc("");
          console.log("ponistavamo token " + value1.errorCode);*/
        }
      }
  
    }, [loading1, error1, value1]);
  
    React.useEffect(()=>{
      document.addEventListener("keydown", (e) => {pritisakGumba(e)});
      if (r.current) clearTimeout(r.current);
      if (kljuc === "" && false) {
        r.current = window.setTimeout(()=>{
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
  
    function klik(e: SobaTip) {
      setSobaID(e.sobaID);
      //console.log("============================================postavljamo sobu na " + e.sobaID);
      odabirSobe(e);
      setBr2((prev)=>{return (prev+1)});
      //navigate("/soba");
    }
  
    return (
      <main className="predvorje">
        <Navbar updateAccount={setUpdateAccountSw} signout={setSignoutSw} signin={setSigninSw}  signup={setSignupSw}/>
        {updateAccountSw ? <UpdateAccount zatvori={setUpdateAccountSw}/> : null}
        {unosDetaljaSw ? <UnosDetalja ponisti={setUnosDetaljaSw}/> : null}
        {signoutSw ? <Signout ponisti={setSignoutSw} signin={setSigninSw}/> : null}
        {signinSw ? <Signin ponisti={setSigninSw} switchaj={switchaj}/> : null}
        {signupSw ? <Signup ponisti={setSignupSw} switchaj={switchaj}
                      sljedeciKorak={setUnosDetaljaSw} /> : null}
        <div className="predvorje-div">
          {loading ? <Spinner/> : null}
          {sobe.map((el,i)=>{return <Kartica key={i} ime={el.ime} sobaID={el.sobaID}
                brojLjudi={el.count} klik={klik}/>})}
        </div>
        <RoomSignIn sobaID={sobaID} sw={br2}/>
      </main> 
    )
  }

  type KarticaProps = {
    ime?: string;
    sobaID?: number;
    brojLjudi?: number;
    klik: (e: SobaTip) => void;
  }
  
  function Kartica({ime="neko ime", sobaID=-1, brojLjudi=0, klik=()=>{return false}}: KarticaProps) {
    return (
      <div onClick={()=>{klik({"ime": ime, "sobaID": sobaID})}} className="kartica">
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

  function pritisakGumba(ev: KeyboardEvent) {
    if (ev.code === "KeyS") {
      console.log(window.innerWidth);
    }
  }