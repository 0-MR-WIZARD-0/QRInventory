import { createListenerMiddleware } from "@reduxjs/toolkit";
import { fetchUserThunk } from "redux/actions/auth.actions";
import { institutionActions } from "redux/reducers/institution.reducer";

// https://redux-toolkit.js.org/api/createListenerMiddleware
export const institutionChangeMiddleware = createListenerMiddleware();
institutionChangeMiddleware.startListening({
  actionCreator: institutionActions.setInstitution,
  effect: (action, listenerApi) => {
    listenerApi.cancelActiveListeners();

    let id = action.payload?.id;

    if (!id) return;
    else localStorage.setItem(`qr-inventory-institution`, id);
  }
});

export const institutionOnAuth = createListenerMiddleware();
institutionOnAuth.startListening({
  actionCreator: fetchUserThunk.fulfilled,
  effect: (action, listenerApi) => {
    listenerApi.cancelActiveListeners();

    if (!action.meta.arg.initial) return;
    else {
      let selectedInstitutionId = localStorage.getItem(`qr-inventory-institution`);
      let institution = action.payload.institutions.find(i => i.id === selectedInstitutionId);
      if (institution) {
        listenerApi.dispatch(institutionActions.setInstitution({ id: institution?.id, name: institution.name }));
      } else {
        let backupInstitution = action.payload.institutions[0];
        if (backupInstitution) listenerApi.dispatch(institutionActions.setInstitution({ id: backupInstitution.id, name: backupInstitution.name }));
        else console.log("Не найдено текущее учреждение или их вовсе нет");
      }
    }
  }
});
