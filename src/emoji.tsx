import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { zadrziRazmake } from "./razno";

export function emojiziraj(str: string): (null | string | React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>)[] | null {
  
  if (str === "")  return null;

  let st = str;
  let polje: (null | string | React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>)[] = [];

  let uvjet = true;

  while (uvjet) {
    let len = st.length;
    let sw = false;
    uvjet = false;
    let poc = -1;
    for (let i = 0; i < len; i++) {
      let c = st[i];
      if (c === ":") {
        if (sw) {
          let emoji = st.substring(poc+1, i);
          let t = vratiEmojiKod(emoji, false);
          if (t === -1) {
            uvjet = false;
            sw = false;
          } else {
            uvjet = true;
            /*polje.push(<div className="tekst-div">{zadrziRazmake(st.substring(0, poc))}</div>);
            polje.push(<img src={"./emoji/"+t+".png"} key={i + "," + t + "," + Math.random()} 
                      alt="emoji" className="emoji"/>);*/
            polje.push(st.substring(0, poc));
            polje.push(<img src={"./emoji/"+t+".png"} key={i + "," + t + "," + Math.random()} 
                      alt="emoji" className="emoji"/>);
            st = st.substring(i+1);
            break;
          }
          //polje.push(st.substring(poc, i+1));
        } else {
          poc = i;
          sw = true;
        }
      } else if (c === " "  &&  i > 0) {
        if (st[i-1] === " ") {
          uvjet = true;
          polje.push(st.substring(0, i));
          polje.push(<img src="./emoji/praznina1.png" alt="razmak" key={i + "," + Math.random()} className="razmak"/>)
          st = st.substring(i+1);
          break;
        }
      }
    }
  }
  if (st !== "") {
    /*polje.push(<div className="tekst-div">{zadrziRazmake(st)}</div>);*/
    polje.push(st);
  }
  return polje;
}

type vratiEmojiKodProps = {
  kod: string;
  sw?: boolean;
}

export function vratiEmojiKod(kod: string, sw:boolean = true): number | string {
  const polje = ["noEmoji","amazing","angel","angry","anxious","bad","bigsmile",
        "blink","cool","crisped","cry","cry2","dead","desperate","devil",
        "doubt","feelgood","funny","good","happy","happy3","hee","heu",
        "hilarous","hmm","hono","hoo","hooo","idontcare","indifferent",
        "kiss","kiss2","kiss3","kiss4","med","medsmile","muted","nana",
        "neutral","noooo","nosebleed","omg","omgomg","pokerface","reverse",
        "sad","sad2","scared","sick2","sleep","smile","smileface","smileteeth",
        "sweat","tongue","tongue2","tongue3","toro","totalangry",
        "totallove","varysad","whaaa","whocare","wot"];
  let ko = parseInt(kod);
  //console.log("kod je " + kod);
  if (sw) {
    if (ko >= polje.length) {
      return "noEmoji";
    } else {
      return polje[ko];
    }
  } else {
    for (let i = 0; i < polje.length; i++) {
      if (polje[i] === kod) {
        if (i === 0) {
          return -1;
        } else {
          return i;
        }
      }
    }
    return -1;
  }
}

let x = -1;
let y = -1;

type EmojiProps = {
  i: number;
  klik?: (e: React.MouseEvent<HTMLDivElement>) => void;
  emojiRef: (x1: {[index:string]:string} | number | string, x2: string) => void;
}

function Emoji({i=-1, klik=()=>{}, emojiRef=()=>{return false}}: EmojiProps) {
  const r = React.useRef<HTMLImageElement>(null);
  const r1 = React.useRef<number | null>(null);
  const r2 = React.useRef<number | null>(null);
  const [sw1, setSw1] = React.useState(false);
  //const [x, setX] = React.useState(-1);
  //const [y, setY] = React.useState(-1);

  //let x = -2;
  //let y = -3;

  React.useEffect(()=>{
    if (r.current) r.current.addEventListener("mousemove", moveFun);
    if (r.current) r.current.addEventListener("mouseleave", leaveFun);

    return ()=>{
      if (r.current !== null) {
        r.current.removeEventListener("mousemove", moveFun);
        r.current.removeEventListener("mouseleave", leaveFun);
      }
      if (r1.current) clearTimeout(r1.current);
      if (r2.current) clearTimeout(r2.current);
      emojiRef("emoji-popup-nevidljiv", "add");
    }
  }, []);

  React.useEffect(()=>{
    if (sw1) {
      emojiRef("emoji-popup-nevidljiv", "remove");
      emojiRef({"left": (x+10) + "px", "top": (y+10) + "px"}, "pozicioniraj");
      emojiRef(i, "postaviTekst");
    } else {      
      emojiRef("emoji-popup-nevidljiv", "add");
    }
  }, [sw1]);

  let sw = false;

  function leaveFun() {
    if (r2.current) clearTimeout(r2.current);
    emojiRef("emoji-popup-nevidljiv", "add");
  }

  function moveFun(e: any) {
    if (!sw) {
      sw = true;
      r1.current = window.setTimeout(()=>{
        sw = false;
      }, 80);
      
      let x1 = e.clientX;
      let y1 = e.clientY;

      if (sw) {
        setSw1(false);
      }

      if (r2.current) clearTimeout(r2.current);
      r2.current = window.setTimeout(()=>{
        if (x == x1 && y == y1) {
          x = e.clientX;
          y = e.clientY;
          setSw1(true);
        }
      }, 1000);

      x = x1;
      y = y1;
    }
  }



  return (
    <div onClick={klik} key={i} id={"emoji-"+i} className="emoji-element">
      <img ref={r} src={"./emoji/"+i+".png"} className="emoji-element-img" alt="emoji"/>
    </div>
  )
}

type EmojiIzbornikProps = {
  sw: boolean;
  setSw: (x: (x: boolean) => boolean) => void;
  emojiRef: (x1: {[index:string]:string} | number | string, x2: string) => void;
  setEmoji?: any;
} 

export function EmojiIzbornik({sw=true, setSw=()=>{return false},
         setEmoji=()=>{}, emojiRef=()=>{return false}}: EmojiIzbornikProps) {
  const [polje, setPolje] = React.useState<JSX.Element[]>([]);
  const [klasa, setKlasa] = React.useState("emoji-izbornik nevidljiv")

  React.useEffect(()=>{
    let polje1 = [];
    for (let i = 1; i < 64; i++) {
        polje1.push(<Emoji key={i} i={i} klik={klik} emojiRef={emojiRef}/>)
    }
    setPolje([...polje1]);
  }, []);

  function klik(e: any) {
    console.log("kliknuo si " + vratiEmojiKod((e.currentTarget.id).split("-")[1]));
    console.log(Math.random());

    setEmoji( vratiEmojiKod( (e.currentTarget.id).split("-")[1] ) );
  }

  React.useEffect(()=>{
    if (sw) {
      setKlasa("emoji-izbornik");
    } else {
      setKlasa("emoji-izbornik nevidljiv");
    }
  }, [sw]);

  return (
    <div className={klasa}>
      <div className="div-el1">
        <div onClick={()=>{setSw((prev)=>{return !prev})}} className="lista-gumb">
          <div className="lista-gumb-el">
            <div className="lista-gumb-el1"></div>
            <div className="lista-gumb-el2"></div>
          </div>
        </div>
      </div>
      <div className="div-el2">
        {polje}
      </div>
    </div>
  )
}