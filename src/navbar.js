import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { Kontekst } from './index.js';
import { MenuIkona } from './razno.js';

export function Navbar({signout=()=>{return false}, 
  signin=()=>{return false}, signup=()=>{return false},
  menuKlik=()=>{return false}}) {

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
    <MenuIkona menuKlik={menuKlik}/>
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