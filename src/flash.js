import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

export function Flash({id=null, setFlashPoruke=()=>{return true}, poruka="nesto", tip="danger ili success"}) {
    const [tip1, setTip1] = React.useState("invisible");
    const [poruka1, setPoruka1] = React.useState("-");
  
    React.useEffect(()=>{
      if (tip === "success") {
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
        setFlashPoruke((prev)=>{return prev.filter((el)=>{if (el.id === id) return false; return true;})})
      }, 5000);
  
    }, [tip, poruka]);
  
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