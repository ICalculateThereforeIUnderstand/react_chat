import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { FlashKontekst, Kontekst, ADRESA1, ADRESA2, localStorageSw } from './index';
import { Spinner, Gumb } from './razno';
import { useFetch1 } from "./useFetch";
import { Flash, FlashTip } from "./flash";
import { useNavigate } from "react-router-dom";

type UnosDetaljaProps = {
  ponisti?: React.Dispatch<React.SetStateAction<boolean>>;
  signin?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function UnosDetalja({ponisti=()=>{return false}, signin=()=>{return false}}: UnosDetaljaProps) {
    const [slogan, setSlogan] = React.useState("");
    const [spol, setSpol] = React.useState("musko");
    const [godine, setGodine] = React.useState(25);
    const [sw, setSw] = React.useState(false);
    const [sw1, setSw1] = React.useState(false);
    const [br, setBr] = React.useState(0);
    const {flashPoruke, setFlashPoruke, postaviFlashPoruku} = React.useContext(FlashKontekst);
    const {kljuc} = React.useContext(Kontekst);
  
    const [loading, error, value] = useFetch1(ADRESA1 + '/api/update_user', 
    {
      method: 'POST',
      body: JSON.stringify({
        "spol": spol,
        "godine": godine,
        "slogan": slogan.toLowerCase(),
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
      console.log("Kljuc: " + kljuc);
      console.log(value);
  
      if (!loading && error === undefined && value !== undefined &&
          typeof value !== "boolean") {
        if (value.error) {
          if (value.errorCode === "snimanje u bazu podataka nije uspijelo") {
            postaviFlashPoruku("Unos podataka nije uspio. Pokusajte kasnije", "danger", "unosDetalja");
            setTimeout(()=>{ponisti(false)}, 5000);
          } else {
            postaviFlashPoruku("Cini se da niste prijavljeni. Preusmjeravam vas na sign-in.", "danger", "unosDetalja");
            setTimeout(()=>{
              ponisti(false);
              signin(true);
            }, 5000);
          }
        } else {
          
          
          postaviFlashPoruku("Unos podataka je uspio", "success", "unosDetalja");
          
          setTimeout(()=>{ponisti(false)}, 5000);
        }
      }
  
    }, [loading, error, value]);
  
    function fun(e: React.MouseEvent<HTMLDivElement>) {
      setGodine(Number((e.target as Element).innerHTML));
    }
  
    function fun1() {
      console.log("Unijet cemo spol: " + spol);
      console.log("godine: " + godine);
      console.log("moto: " + slogan);
      if (slogan.length > 128) {
        postaviFlashPoruku("Moto ne smije biti duzi od 128 znakova. Pokusajte ponovo.", "danger", "unosDetalja");
      } 
      setBr((prev)=>{return (prev+1)});
    }
  
    return (
      <div className="popup-plast">
        <div className="popup-unos-detalja">
          {loading ? <Spinner/> : null}
          <div className="flash-container">
            {flashPoruke.map((el:FlashTip)=>{return <Flash key={el.id} id={el.id} setFlashPoruke={setFlashPoruke} tip={el.tip} poruka={el.poruka} kod1="unosDetalja" kod2={el.kod} />})}
          </div>
          <div className="razmak"></div>
          <div id="naslov" className="lista-naslov">Detalji korisnika:</div>
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
            <Gumb fun={fun1} tekst="Prijava" height="48px" width="70%" />
          </div>
        </div>
      </div>
      
    )
  }

  type SignupProps = {
    ponisti?: React.Dispatch<React.SetStateAction<boolean>>;
    switchaj?: () => void;
    sljedeciKorak?: (sw: boolean) => void;
  }
  
  export function Signup({ponisti=()=>{}, switchaj=()=>{}, 
                   sljedeciKorak=()=>{}}: SignupProps) {
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [lozinka, setLozinka] = React.useState("");
    const [confirm, setConfirm] = React.useState("");
    const {flashPoruke, setFlashPoruke, postaviFlashPoruku} = React.useContext(FlashKontekst);
    const [br, setBr] = React.useState(0);
    const {kljuc, setKljuc, refreshKljuc, setRefreshKljuc} = React.useContext(Kontekst);
    const r = React.useRef<number | null>(null);
  
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
  
      if (!loading && error === undefined && value !== undefined && 
           typeof value !== "boolean") {
        if (value.error) {
          if (value.errorCode === "Vec postoji korisnik sa ovim imenom.") {
            postaviFlashPoruku("Vec postoji korisnik sa ovim imenom. Pokusajte ponovo.", "danger", "signup");
          } else if (value.errorCode === "Vec postoji korisnik sa ovim emailom.") {
            postaviFlashPoruku("Vec postoji korisnik sa ovim emailom. Probajte sa drugim.", "danger", "signup");
          } else {
            postaviFlashPoruku("Dogodila se pogreska. Pokusajte ponovo.", "danger", "signup");
          }
        } else {
          if (localStorageSw) {
            localStorage.setItem("kljuc", value.value.token);
            localStorage.setItem("refreshKljuc", value.value.refreshToken);
          } else {
            sessionStorage.setItem("kljuc", value.value.token);
            sessionStorage.setItem("refreshKljuc", value.value.refreshToken);
          }
          setKljuc(value.value.token);
          setRefreshKljuc(value.value.refreshToken);
          if (r.current) clearTimeout(r.current);
          r.current = window.setTimeout(()=>{
            postaviFlashPoruku("Upravo ste kreirali novi account. Sada vas preusmjeravam.", "success", "signup");
          }, 200);
          setTimeout(()=>{
            ponisti(false);
            sljedeciKorak(true);
          }, 2000);
        }
      }
  
    }, [loading, error, value]);
  
    function fun() {
      let regex = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
      regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i;
      //console.log("pokrenuo " + Math.random());
  
      if (lozinka.length < 6) {
        postaviFlashPoruku("Lozinka mora imati barem 6 znakova", "danger", "signup");
        return;
      } else if (lozinka !== confirm) {
        postaviFlashPoruku("Lozinka i njena potvrda nisu identicne.", "danger", "signup");
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
          postaviFlashPoruku("Lozinka ne smije imati prazan znak", "danger", "signup");
          return;
        }
        if (!swSlovo) {
          postaviFlashPoruku("Lozinka mora imati bar jedno slovo", "danger", "signup");
          return;
        }
        if (!swBroj) {
          postaviFlashPoruku("Lozinka mora imati bar jedan broj", "danger", "signup");
          return;
        }
        if (!regex.test(email)) {
          postaviFlashPoruku("Niste upisali dobar email. Probajte ponovo", "danger", "signup");
          return;
        }
  
        if (username.trim() !== username) {
          postaviFlashPoruku("Ne mozete koristiti razmak na pocetku ili kraju stringa. Probajte ponovo", "danger", "signup");
          return;
        } else {
          let slovo = false;
          for (let i = 0; i < username.length; i++) {
            if (username[i].match(/[a-z]/i)) slovo = true;
            if (username[i] === " ") {
              postaviFlashPoruku("Korisnicko ime mora biti jedna rijec. Probajte ponovo", "danger", "signup");
              return;
            }
          }
          if (!slovo) {
            postaviFlashPoruku("Korisnicko ime mora imati barem jedno slovo. Probajte ponovo", "danger", "signup");
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
            {flashPoruke.map((el: FlashTip)=>{return <Flash key={el.id} id={el.id} setFlashPoruke={setFlashPoruke} tip={el.tip} poruka={el.poruka} kod1="signup" kod2={el.kod} />})}
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

  type SignoutProps = {
    ponisti?: React.Dispatch<React.SetStateAction<boolean>>;
    signin?: React.Dispatch<React.SetStateAction<boolean>>;
  }
  
  export function Signout({ponisti=()=>{}}: SignoutProps) {
    const [sw, setSw] = React.useState(false);
    const [br, setBr] = React.useState(0);
    const {kljuc, setKljuc, refreshKljuc, setRefreshKljuc} = React.useContext(Kontekst);
    const {flashPoruke, setFlashPoruke, postaviFlashPoruku} = React.useContext(FlashKontekst);
    const navigate = useNavigate();
  
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
  
      if (!loading && error === undefined && value !== undefined &&
           typeof value !== "boolean") {
        if (value.error) {
          postaviFlashPoruku("Signout nije bio uspijesan. Pokusajte ponovo.", "danger", "signout");
          setTimeout(()=>{ponisti(false)}, 2000);
        } else {
          if (localStorageSw) {
            localStorage.setItem("kljuc", "");
            localStorage.setItem("refreshKljuc", "");
          } else {
            sessionStorage.setItem("kljuc", "");
            sessionStorage.setItem("refreshKljuc", "");
          }
          setKljuc("");
          setRefreshKljuc("");
          postaviFlashPoruku("Upravo ste se odjavili. Sada vas preusmjeravam.", "success", "signout");
          setTimeout(()=>{ponisti(false); navigate(ADRESA2 + "/");}, 2000);
        }
      }
  
    }, [loading, error, value]);
  
    function fun(e: string) {
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

  type SigninProps = {
    ponisti?: React.Dispatch<React.SetStateAction<boolean>>;
    switchaj?: () => void;
  }
  
  export function Signin({ponisti=()=>{return false}, switchaj=()=>{return false}}: SigninProps) {
    const [login, setLogin] = React.useState("");
    const [lozinka, setLozinka] = React.useState("");
    const {flashPoruke, setFlashPoruke, postaviFlashPoruku} = React.useContext(FlashKontekst);
    const [br, setBr] = React.useState(0);
    const {kljuc, setKljuc, refreshKljuc, setRefreshKljuc} = React.useContext(Kontekst);
    const r = React.useRef<number | null>(null);
  
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
  
      if (!loading && error === undefined && value !== undefined &&
           typeof value !== "boolean") {
        if (value.error) {
          if (value.errorCode === "Username i password kombinacija nije ispravna") {
            postaviFlashPoruku("Login/password kombinacija nije ispravna. Pokusajte ponovo.", "danger", "signin");
          } else {
            postaviFlashPoruku("Dogodila se pogreska. Pokusajte ponovo.", "danger", "signin");
          }
        } else {
          if (localStorageSw) {
            localStorage.setItem("kljuc", value.value.token);
            localStorage.setItem("refreshKljuc", value.value.refreshToken);
          } else {
            sessionStorage.setItem("kljuc", value.value.token);
            sessionStorage.setItem("refreshKljuc", value.value.refreshToken);
          }
          setKljuc(value.value.token);
          setRefreshKljuc(value.value.refreshToken);
          if (r.current) clearTimeout(r.current);
          r.current = window.setTimeout(()=>{
            postaviFlashPoruku("Upravo ste se ulogirali. Sada vas preusmjeravam.", "success", "signin");
          }, 200);
          setTimeout(()=>{ponisti(false)}, 2000);
        }
      }
  
    }, [loading, error, value]);
  
    function fun() {
      if (lozinka.length < 6) {
        postaviFlashPoruku("Lozinka mora imati barem 6 znakova", "danger", "signin");
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
          postaviFlashPoruku("Lozinka ne smije imati prazan znak", "danger", "signin");
          return;
        }
        if (!swSlovo) {
          postaviFlashPoruku("Lozinka mora imati bar jedno slovo", "danger", "signin");
          return;
        }
        if (!swBroj) {
          postaviFlashPoruku("Lozinka mora imati bar jedan broj", "danger", "signin");
          return;
        }
        if (login === "") {
          postaviFlashPoruku("Ime/email ne moze biti prazno", "danger", "signin");
          return;
        } else {
          for (let i = 0; i < login.length; i++) {
            if (login[i] === " ") {
              postaviFlashPoruku("Ime/email ne moze sadrzavati razmak", "danger", "signin");
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
            {flashPoruke.map((el: FlashTip)=>{return <Flash key={el.id} id={el.id} setFlashPoruke={setFlashPoruke} tip={el.tip} poruka={el.poruka} kod1="signin" kod2={el.kod} />})}
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
            <input type="password" className="input1" onChange={(el)=>{setLozinka(el.target.value)}} value={lozinka} id="input0" placeholder="upisite lozinku"/>
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