import { useReducer, useCallback } from "react";
import createRedux from "utils/createRedux";

export default function useApiState(fn) {
  let canceled = false;

  const INITIAL_STATE = {
    fetching: false,
    errorCode: "",
    data: null,
    errors: null,
  };

  const fetching = (state) => ({
    ...state,
    fetching: true,
    errorCode: "",
    errors: null,
  });
  const success = (state, { data }) => {
    return {
      ...state,
      data,
      fetching: false,
    };
  };
  const failure = (state, { errorCode, errors }) => {
    console.log("rer", errorCode, errors);

    return {
      ...state,
      errorCode: errorCode || "",
      errors: errors || null,
      fetching: false,
    };
  };

  const resetAction = (state, { type, ...rest }) => ({
    ...INITIAL_STATE,
    ...rest,
  });

  const { actions, reducer } = createRedux(INITIAL_STATE, {
    fetching,
    success,
    failure,
    resetAction,
  });

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  function cancel() {
    canceled = true;
  }

  function* callGen(...params) {
    try {
      yield dispatch(actions.fetching());

      const response = yield fn(...params);
      console.log("response", response);
      if (
        response !== undefined &&
        response !== null &&
        response.message !== "no user found"
      ) {
        yield dispatch(actions.success({ data: response }));
      } else {
        yield dispatch(actions.failure({ errorCode: response.message }));
      }
    } catch (e) {
      const errorCode =
        "Erreur inconnue, vérifiez votre connexion Internet ou essayez d'actualiser la page.";

      yield dispatch(
        actions.failure({
          errorCode,
        })
      );
    }
  }

  function reset(p) {
    dispatch(actions.resetAction(p));
  }

  async function call(...params) {
    const iterator = callGen(...params);
    let r = iterator.next();
    try {
      while (!r.done && !canceled) {
        // eslint-disable-next-line
        r = iterator.next(await r.value);
      }
      if (canceled) {
        canceled = false;
      }
    } catch (e) {
      if (iterator.throw) iterator.throw(e);
    }
  }
  return [
    state,
    useCallback(call, [fn]),
    useCallback(cancel, [fn]),
    useCallback(reset, [fn]),
  ];
}
