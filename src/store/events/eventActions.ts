import { EventAction, Event, EventFormData } from "./eventTypes";

export const selectDate = (date: Date | null): EventAction => ({
  type: "SELECT_DATE",
  payload: date,
});

export const setCurrentMonth = (date: Date): EventAction => ({
  type: "SET_CURRENT_MONTH",
  payload: date,
});

export const addEvent = (): EventAction => ({
  type: "ADD_EVENT",
});

export const editEvent = (): EventAction => ({
  type: "EDIT_EVENT",
});

export const deleteEvent = (id: string): EventAction => ({
  type: "DELETE_EVENT",
  payload: id,
});

export const setAddingEvent = (isAdding: boolean): EventAction => ({
  type: "SET_ADDING_EVENT",
  payload: isAdding,
});

export const startEditingEvent = (event: Event): EventAction => ({
  type: "START_EDITING_EVENT",
  payload: event,
});

export const updateNewEventData = (data: EventFormData): EventAction => ({
  type: "UPDATE_NEW_EVENT_DATA",
  payload: data,
});

export const resetForm = (): EventAction => ({
  type: "RESET_FORM",
});
