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
