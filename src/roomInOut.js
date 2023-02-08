import React from 'react';
import ReactDOM from 'react-dom/client';
import { useFetch1 } from "./useFetch.js";
import { redirect, useNavigate } from "react-router-dom";
import { ADRESA1, Kontekst } from "./index.js";

export function RoomSignIn({sobaID=-1, sw=0}) {  // ova komponenta nas
// logira u sobu
  const {kljuc} = React.useContext(Kontekst);
  const [br, setBr] = React.useState(0);
  //const [roomID, setRoomID] = React.useState(sobaID);
  const navigate = useNavigate();

  const [loading, error, value] = useFetch1(ADRESA1 + '/api/room_enter_exit', 
    {
      method: 'POST',
      body: JSON.stringify({
        'token': kljuc,
        'akcija': "enter",
        'sobaID': sobaID
      }),
      headers: {
        'Content-type': 'application/json'
      }
    }, [br]);

  React.useEffect(()=>{
    if (!loading && error === undefined && value !== undefined && br > 0) {
      if (value.error) {
        console.log("PAZNJA!. Dogodila se pogreska sa ulaskom u sobu.")
      } else {
        navigate("/soba");
        //navigate("/soba", {replace: true});
      }
    }
  }, [loading, error, value]);

  React.useEffect(()=>{
    //setRoomID(sobaID);
    if (sw !== 0) {
        setBr((prev)=>{return (prev+1)});
    }
  }, [sw]);

  return (null);
}

export function RoomSignOut({sobaID=-1, sw=0, akcija="exit"}) {  // ova komponenta
// vrsi signout iz sobe
  const {kljuc} = React.useContext(Kontekst);
  const [br, setBr] = React.useState(0);
  const [roomID, setRoomID] = React.useState(sobaID);
  const navigate = useNavigate();
  
  const [loading, error, value] = useFetch1(ADRESA1 + '/api/room_enter_exit', 
    {
      method: 'POST',
      body: JSON.stringify({
        'token': kljuc,
        'akcija': akcija,
        'sobaID': sobaID
      }),
      headers: {
        'Content-type': 'application/json'
      }
    }, [br]);
  
  React.useEffect(()=>{
    if (!loading && error === undefined && value !== undefined && br > 0) {
      if (value.error) {
        console.log("PAZNJA!. Dogodila se pogreska sa izlaskom iz sobe u sobu.")
      } else {
        //navigate("/");
      }
    }
  }, [loading, error, value]);

  React.useEffect(()=>{
    setRoomID(sobaID);
    if (sw !== 0) {
      setBr((prev)=>{return (prev+1)});
    }
  }, [sw]);

  React.useEffect(()=>{
    console.log("br prekidac je na " + br);
  }, [br]);

  return (null)
}