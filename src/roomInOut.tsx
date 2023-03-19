import React from 'react';
import ReactDOM from 'react-dom/client';
import { useFetch1 } from "./useFetch";
import { redirect, useNavigate } from "react-router-dom";
import { ADRESA1, Kontekst } from "./index";

type RoomSignInProps = {
  sw: number;
  sobaID?: number;
}

export function RoomSignIn({sobaID=-1, sw=0}: RoomSignInProps) {  // ova komponenta nas
// logira u sobu
  const {kljuc, setKljuc} = React.useContext(Kontekst);
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
    if (!loading && error === undefined && value !== undefined && 
         br > 0 && typeof value !== "boolean") {
      if (value.error) {
        if (value.errorCode === "korisnik je vec u sobi") {
          navigate("/soba");
        } else if (value.errorCode === "Vas token je istekao") {
          setKljuc("");
        } else {
          console.log("PAZNJA!. Dogodila se pogreska sa ulaskom u sobu.")
          console.log(value.errorCode);
        }
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

type RoomSignOutProps = {
  sw?: number;
  akcija?: string;
}

export function RoomSignOut({sw=0, akcija="exit"}: RoomSignOutProps) {  // ova komponenta
// vrsi signout iz sobe
  const {kljuc, setKljuc} = React.useContext(Kontekst);
  const [br, setBr] = React.useState(0);
  //const [roomID, setRoomID] = React.useState(sobaID);
  const { sobaID } = React.useContext(Kontekst);
  //const navigate = useNavigate();
  
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
    if (!loading && error === undefined && value !== undefined && 
         br > 0 && typeof value !== "boolean") {
      if (value.error) {
        if (value.errorCode === "Vas token je istekao") {
          setKljuc("");
        } else {
          console.log("PAZNJA!. Dogodila se pogreska sa izlaskom iz sobe u sobu.")
          console.log(value.errorCode);
          console.log(value.value);
        }
      } else {
        //navigate("/");
      }
    }
  }, [loading, error, value]);

  React.useEffect(()=>{
    //setRoomID(sobaID);
    if (sw !== 0) {
      setBr((prev)=>{return (prev+1)});
    }
  }, [sw]);

  React.useEffect(()=>{
    console.log("br prekidac je na " + br);
  }, [br]);

  return (null)
}