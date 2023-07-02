import localforage from "localforage";
import { useEffect, useRef, useState } from "react";
import { setAuthorizationBearer } from "request/http";

export default function useStartUp(props) {
  const [done, setDone] = useState(false);
  const called = useRef(false);
    useEffect(() => {
    if (!called.current) {
      called.current = true;
      localforage
        .getItem("auth")
        .then((authString) => {
          if (authString) {
            const auth = JSON.parse(authString);
            /* if (!auth.token) {
              console.log("here 1");
              props.setUser(auth);
              setAuthorizationBearer(auth.token);
              setDone(true);
            } else {
              console.log("auth", auth);
              console.log("here 2");
              props.setUser(auth);
              setAuthorizationBearer(auth.token);
              setDone(true);
            } */
            props.setUser(auth);
            setAuthorizationBearer(auth.token);
            setDone(true);
            return auth;
          } else {
            setDone(true);
          }
        })
        .catch((e) => {
          console.log(e);
          setDone(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return done;
}
