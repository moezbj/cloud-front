import {
    isEmpty, map, forEach, findKey, keys, isArray,
   } from 'lodash';
   
   function createType(action) {
     const actionParts = action.trim().split(/(?=[A-Z])/);
     const formatedParts = map(actionParts, (part) => {
       if (isEmpty(part) || /\s/.test(part)) {
         throw new Error(`Action ${action} invalid name`);
       }
       return part.toUpperCase();
     });
     if (isEmpty(formatedParts)) {
       throw new Error(`Action ${action} invalid name`);
     }
     return formatedParts.join('_');
   }
   
   function createAction(type) {
     return (...args) => {
       const allArgs = args.reduce((result, arg) => {
         if (typeof arg !== 'object' && arg !== undefined) {
           throw new Error(`Action arguments is expected be an object but got ${typeof arg}`);
         }
         if (isArray(arg)) {
           throw new Error('Action arguments is expected be an object but got array');
         }
         return { ...result, ...arg };
       }, {});
   
       return {
         type,
         ...allArgs,
       };
     };
   }
   
   function createActions(...params){
     const actions = {};
     const types = {};
     forEach(params, (action) => {
       const type = createType(action);
       types[action] = type;
       actions[action] = createAction(type);
     });
     return { actions, types };
   }
   
   function createReducer(
     INITIAL_STATE,
     actions,
     types) {
     return (state = INITIAL_STATE, action) => {
       const checkAction = findKey(types, (type) => type === action.type);
       if (checkAction) {
         return actions[checkAction](state, action);
       }
       return state;
     };
   }
   
   
   export default function createRedux(
     INITIAL_STATE,
     reqActions){
     const actionsNames = keys(reqActions);
     if (actionsNames.length === 0) {
       return { actions: {}, types: {} };
     }
     const { actions, types } = createActions(...actionsNames);
     if (INITIAL_STATE === undefined) {
       return { actions, types } ;
     }
     const reducer = createReducer(INITIAL_STATE, reqActions, types);
     return { actions, types, reducer };
   }
   