import React, { useCallback, useEffect } from 'react';

const DEFAULT_OPTIONS = {
  headers: {"Content-Type": "application/json"},
}

export function useFetch1(url, options={}, dependencies=[]) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState();
  const [value, setValue] = React.useState();

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



function useAsync(callback, dependencies = []) {
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState();
    const [value, setValue] = React.useState();
  
    const callbackMemoized = useCallback(() => {
      setLoading(true);
      setError(undefined);
      setValue(undefined);
      callback().then(setValue).catch(setError).finally(() => setLoading(false))
    }, dependencies);
  
    useEffect(() => {
      callbackMemoized();
    }, [callbackMemoized]);
  
    return [ loading, error, value ]
  }
    
export function useFetch(url, options={}, dependencies = []) {
    return useAsync(()=> {
      return fetch(url, {...DEFAULT_OPTIONS, ...options}).then(res => {
        //return res.json();
        if (res.status === 200 || res.status === 400) return res.json();
        return res.json().then(json => Promise.reject(json))
      })
    }, dependencies)
  }

