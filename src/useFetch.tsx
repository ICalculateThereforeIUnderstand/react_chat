import React, { useCallback, useEffect } from 'react';

const DEFAULT_OPTIONS = {
  headers: {"Content-Type": "application/json"},
}

export type PodaciTip = {
  error: boolean;
  errorCode: string;
  value: {[index:string]: any};
}

export function useFetch1(url:string, options={}, dependencies:number[] = []) {
const [loading, setLoading] = React.useState(false);
const [error, setError] = React.useState();
const [value, setValue] = React.useState<PodaciTip | undefined>();

React.useEffect(()=>{
  if (!(Array.isArray(dependencies) && dependencies.length > 0
        && dependencies[0] === 0) ) { 
  // NE izvrsava se samo za polje sa prvim elementom 0, 
  // dakle za [0] se NE izvrsava, za [1] se izvrsava
  // za [0,3] se NE izvrsava, za [1,3] se izvrsava
    setLoading(true);
    setError(undefined);
    setValue(undefined);
    fetch(url, {...DEFAULT_OPTIONS, ...options}).then(response => {
      //if (response.status === 200 || response.status === 400) return response.json();
      if (response.status === 200) return response.json();
      if (!response.ok) {
        throw new TypeError("Check internet connection. Error code: " + response.status);
        //return response.status.then(json => Promise.reject(json))
        //return null;
      }
      return response.json();
    }).then((rez)=>{
      setError(undefined);
      setValue(rez);
    }).catch((error)=>{
      setValue(undefined); 
      setError(error.message)}).finally(()=>{setLoading(false)});
  }
}, dependencies);

return [loading, error, value];
}