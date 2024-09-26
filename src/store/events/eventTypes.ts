export type Event = {
  id: string;
  date: Date;
  title: string;
  description: string;
};

export type EventFormData = {
  title: string;
  description: string;
};

export type EventState = {
  selectedDate: Date | null;
  currentMonth: Date;
  events: Event[];
  isAddingEvent: boolean;
  isEditingEvent: boolean;
  editingEventId: string | null;
  newEventData: EventFormData;
};

export type EventAction =
  | { type: "SELECT_DATE"; payload: Date | null }
  | { type: "SET_CURRENT_MONTH"; payload: Date }
  | { type: "ADD_EVENT" }
  | { type: "EDIT_EVENT" }
  | { type: "DELETE_EVENT"; payload: string }
  | { type: "SET_ADDING_EVENT"; payload: boolean }
  | { type: "START_EDITING_EVENT"; payload: Event }
  | { type: "UPDATE_NEW_EVENT_DATA"; payload: EventFormData }
  | { type: "RESET_FORM" };
