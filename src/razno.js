import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';

 export function zadrziRazmake(str) {
   let len = str.length;
   for (let i = len-2; i > -1; i--) {
     if (str[i] === " "  &&  str[i+1] === " ") {
       str = str.substring(0, i) + "&nbsp; " + str.substring(i+2);
     }
   }
   return str;
 }

 export function MenuIkona({klik=()=>{return false;}, menuKlik=()=>{return false}}) {
    return (
      <div onClick={menuKlik} className="menu-ikona">
        <div className="menu-ikona-el el1"></div>
        <div className="menu-ikona-el el2"></div>
        <div className="menu-ikona-el el3"></div>
      </div>
    )
  }
  
  export function Gumb({tekst="nesto", fun=()=>{return true}, 
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

  export function Spinner({kut=90}) {
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