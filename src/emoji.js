import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { zadrziRazmake } from "./razno";

export function emojiziraj(str) {
  
  if (str === "")  return null;

  let st = str;
  let polje = [];
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

export function vratiEmojiKod(kod, sw=true) {
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

export function vratiEmojiKod1(kod, sw=true) {
  let k = kod.split("-");
  if (sw) {
    k = parseInt(k[1]);
    switch (k) {
      case (1):
        return "amazing" 
      case (2):
        return "angel" 
      case (3):
        return "angry"
      case (4):
        return "anxious" 
      case (5):
        return "bad" 
      case (6):
        return "bigsmile"
      case (7):
        return "blink" 
      case (8):
        return "cool" 
      case (9):
        return "crisped" 
      case (10):
        return "cry" 
      case (11):
        return "cry2"
      case (12):
        return "dead" 
      case (13):
        return "desperate" 
      case (14):
        return "devil" 
      case (15):
        return "doubt" 
      case (16):
        return "feelgood" 
      case (17):
        return "funny"
      case (18):
        return "good" 
      case (19):
        return "happy" 
      case (20):
        return "happy3" 
      case (21):
        return "hee" 
      case (22):
        return "heu" 
      case (23):
        return "hilarous"
      case (24):
        return "hmm" 
      case (25):
        return "hono" 
      case (26):
        return "hoo" 
      case (27):
        return "hooo" 
      case (28):
        return "idontcare" 
      case (29):
        return "indifferent"
      case (30):
        return "kiss" 
      case (31):
        return "kiss2" 
      case (32):
        return "kiss3" 
      case (33):
        return "kiss4"
      case (34):
        return "med" 
      case (35):
        return "medsmile"
      case (36):
        return "muted" 
      case (37):
        return "nana" 
      case (38):
        return "neutral" 
      case (39):
        return "noooo" 
      case (40):
        return "nosebleed" 
      case (41):
        return "omg" 
      case (42):
        return "omgomg" 
      case (43):
        return "pokerface"
      case (44):
        return "reverse" 
      case (45):
        return "sad" 
      case (46):
        return "sad2" 
      case (47):
        return "scared"
      case (48):
        return "sick2" 
      case (49):
        return "sick"
      case (50):
        return "smile" 
      case (51):
        return "smileface" 
      case (52):
        return "smileteeth" 
      case (53):
        return "sweat" 
      case (54):
        return "tongue"
      case (55):
        return "tongue2" 
      case (56):
        return "tongue3" 
      case (57):
        return "toro" 
      case (58):
        return "totalangry"
      case (59):
        return "totallove" 
      case (60):
        return "varysad"
      case (61):
        return "whaaa" 
      case (62):
        return "whocare" 
      case (63):
        return "wot" 

    }
    return false;
  } else {
    return k[1];
  }
}

let x = -1;
let y = -1;

function Emoji({i=-1, klik=()=>{return false}, emojiRef=()=>{return false}}) {
  const r = React.useRef();
  const r1 = React.useRef();
  const r2 = React.useRef();
  const [sw1, setSw1] = React.useState(false);
  //const [x, setX] = React.useState(-1);
  //const [y, setY] = React.useState(-1);

  //let x = -2;
  //let y = -3;

  React.useEffect(()=>{
    r.current.addEventListener("mousemove", moveFun);
    r.current.addEventListener("mouseleave", leaveFun);

    return ()=>{
      if (r.current !== null) {
        r.current.removeEventListener("mousemove", moveFun);
        r.current.removeEventListener("mouseleave", leaveFun);
      }
      clearTimeout(r1.current);
      clearTimeout(r2.current);
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
    clearTimeout(r2.current);
    emojiRef("emoji-popup-nevidljiv", "add");
  }

  function moveFun(e) {
    if (!sw) {
      sw = true;
      r1.current = setTimeout(()=>{
        sw = false;
      }, 80);
      let x1 = e.clientX;
      let y1 = e.clientY;

      if (sw) {
        setSw1(false);
      }

      clearTimeout(r2.current);
      r2.current = setTimeout(()=>{
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

export function EmojiIzbornik({sw=true, setSw=()=>{return false},
         setEmoji=()=>{return false}, emojiRef=null}) {
  const [polje, setPolje] = React.useState();
  const [klasa, setKlasa] = React.useState("emoji-izbornik nevidljiv")

  React.useEffect(()=>{
    let polje1 = [];
    for (let i = 1; i < 64; i++) {
        polje1.push(<Emoji key={i} i={i} klik={klik} emojiRef={emojiRef}/>)
    }
    setPolje([...polje1]);
  }, []);

  function klik(e) {
    console.log("kliknuo si " + vratiEmojiKod((e.currentTarget.id).split("-")[1]));
    console.log(Math.random());
    setEmoji(vratiEmojiKod( (e.currentTarget.id).split("-")[1] ));
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