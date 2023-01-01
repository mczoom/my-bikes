import React, {useEffect} from 'react'


export default function AccessPage() {

  const params: any = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop:string) => searchParams.get(prop),
  });
  // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
  let accessToken: string = params.code; // "some_value"
  console.log(accessToken);


  // function login(tempToken: string) {


  //       return fetch(`http://localhost:3100/tokenexchange`, {
  //         method: 'POST',
  //         headers: {
  //           "Content-Type": "application/json"
  //         },
  //         body: JSON.stringify({
  //           token: tempToken
  //       })
  //       })
  //       .then((res) => res.json())
  //       .then((res) => { console.log(res.access_token)
  //           // localStorage.setItem('token', res);
  //       })
  //       .catch((err) => console.log(err));
  //     };

  function translateToken(temporaryToken: any) {
    const options: any = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        cache: 'no-cache',
        body: JSON.stringify({
            token: temporaryToken
        })
    }
    return fetch('http://localhost:3100/tokenexchange', options)
        .then(response => response.json())
        .then(json => {
            console.log(json.access_token)
        })
}




  useEffect(() => {
    translateToken(accessToken);
  }, [])

  return (
    <p>You successfully paired your My-bikes account with Strava</p>
  )
}
