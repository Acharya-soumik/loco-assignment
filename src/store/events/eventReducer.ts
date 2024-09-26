import { EventFormData, Event } from "./eventTypes";

export type State = {
  selectedDate: Date | null;
  currentMonth: Date;
  events: Event[];
  isAddingEvent: boolean;
  isEditingEvent: boolean;
  editingEventId: string | null;
  newEventData: EventFormData;
};

export type Action =
  | { type: "SELECT_DATE"; payload: Date | null }
  | { type: "SET_CURRENT_MONTH"; payload: Date }
  | { type: "ADD_EVENT" }
  | { type: "EDIT_EVENT" }
  | { type: "DELETE_EVENT"; payload: string }
  | { type: "SET_ADDING_EVENT"; payload: boolean }
  | { type: "START_EDITING_EVENT"; payload: Event }
  | { type: "UPDATE_NEW_EVENT_DATA"; payload: EventFormData }
  | { type: "RESET_FORM" };

export const initialState: State = {
  selectedDate: null,
  currentMonth: new Date(),
  events: [],
  isAddingEvent: false,
  isEditingEvent: false,
  editingEventId: null,
  newEventData: { title: "", description: "" },
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SELECT_DATE":
      return {
        ...state,
        selectedDate: action.payload,
        isAddingEvent: false,
        isEditingEvent: false,
        editingEventId: null,
        newEventData: { title: "", description: "" },
      };
    case "SET_CURRENT_MONTH":
      return { ...state, currentMonth: action.payload };
    case "ADD_EVENT":
      if (!state.selectedDate || !state.newEventData.title.trim()) return state;
      const newEvent: Event = {
        id: Date.now().toString(),
        date: state.selectedDate,
        title: state.newEventData.title.trim(),
        description: state.newEventData.description.trim(),
      };
      return {
        ...state,
        events: [...state.events, newEvent],
        isAddingEvent: false,
        newEventData: { title: "", description: "" },
      };
    case "EDIT_EVENT":
      if (!state.editingEventId || !state.newEventData.title.trim())
        return state;
      return {
        ...state,
        events: state.events.map((event) =>
          event.id === state.editingEventId
            ? {
                ...event,
                title: state.newEventData.title.trim(),
                description: state.newEventData.description.trim(),
              }
            : event
        ),
        isEditingEvent: false,
        editingEventId: null,
        newEventData: { title: "", description: "" },
      };
    case "DELETE_EVENT":
      return {
        ...state,
        events: state.events.filter((event) => event.id !== action.payload),
      };
    case "SET_ADDING_EVENT":
      return {
        ...state,
        isAddingEvent: action.payload,
        isEditingEvent: false,
        editingEventId: null,
        newEventData: { title: "", description: "" },
      };
    case "START_EDITING_EVENT":
      return {
        ...state,
        isEditingEvent: true,
        editingEventId: action.payload.id,
        newEventData: {
          title: action.payload.title,
          description: action.payload.description,
        },
      };
    case "UPDATE_NEW_EVENT_DATA":
      return { ...state, newEventData: action.payload };
    case "RESET_FORM":
      return {
        ...state,
        isAddingEvent: false,
        isEditingEvent: false,
        editingEventId: null,
        newEventData: { title: "", description: "" },
      };
    default:
      return state;
  }
}
