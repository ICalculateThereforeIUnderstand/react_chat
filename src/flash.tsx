import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';

export type FlashTip = {
  id: number;
  poruka: string;
  tip: "danger" | "success";
  kod: null | string;
}

type FlashProps = {
  id?: number | null;
  poruka?: string;
  tip?: "danger" | "success";
  setFlashPoruke: (x: (prev: FlashTip[]) => FlashTip[]) => void;
  kod1?: string | null;
  kod2?: string | null;
}

export function Flash({id=null, setFlashPoruke=()=>{return true}, poruka="nesto", 
    tip="success", kod1=null, kod2=null}: FlashProps) {
    const [tip1, setTip1] = React.useState("invisible");
    const [poruka1, setPoruka1] = React.useState("-");
  
    React.useEffect(()=>{
      if (kod1 !== null && kod1 !== kod2) {
        setTip1("invisible");
      } else if (tip === "success") {
        setTip1("success");
        setPoruka1(poruka);
      } else if (tip === "danger") {
        setTip1("danger");
        setPoruka1(poruka);
      } else {
        setTip1("danger");
        setPoruka1("ERROR in code! Krivi tip.");
      }
  
      setTimeout(()=>{
        setFlashPoruke((prev: FlashTip[])=>{return prev.filter((el)=>{if (el.id === id) return false; return true;})})
      }, 5000);
  
    }, [tip, poruka, kod1, kod2]);
  
    function klik() {
        setFlashPoruke((prev)=>{return prev.filter((el)=>{if (el.id === id) return false; return true;})})
    }
  
    return (
      <div className={"alert alert-"+tip1}>
        <p>{poruka1}</p>
        <div className="alert-close" onClick={klik}>
            <div className="alert-close-el1">
                <div className="alert-close-el2"></div>
                <div className="alert-close-el3"></div>
            </div>
        </div>
      </div>
    )
  }