import { EventState, EventAction } from "./eventTypes";

export const initialEventState: EventState = {
  selectedDate: null,
  currentMonth: new Date(),
  events: [],
  isAddingEvent: false,
  isEditingEvent: false,
  editingEventId: null,
  newEventData: { title: "", description: "" },
};

export function eventReducer(
  state: EventState,
  action: EventAction
): EventState {
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
      const newEvent = {
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
    // ... other cases
    default:
      return state;
  }
}
