"use client";
import { useReducer, useCallback } from "react";
import BottomSheet from "@/components/BottomSheet";
import CustomCalendar from "@/components/CustomCalender";
import BottomSheetContent from "@/components/BottomSheetContent";
import { Event } from "@/store/events/eventTypes";
import { initialState, reducer } from "@/store/events";

function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleDateSelect = useCallback((date: Date | null) => {
    dispatch({ type: "SELECT_DATE", payload: date });
  }, []);

  const handleAddEvent = useCallback(() => {
    dispatch({ type: "ADD_EVENT" });
  }, []);

  const handleEditEvent = useCallback(() => {
    dispatch({ type: "EDIT_EVENT" });
  }, []);

  const handleDeleteEvent = useCallback((eventId: string) => {
    dispatch({ type: "DELETE_EVENT", payload: eventId });
  }, []);

  const startEditingEvent = useCallback((event: Event) => {
    dispatch({ type: "START_EDITING_EVENT", payload: event });
  }, []);

  const eventsForSelectedDate = state.selectedDate
    ? state.events.filter(
        (event) =>
          event.date.toDateString() === state.selectedDate!.toDateString()
      )
    : [];

  return (
    <div className="flex justify-center items-center h-screen">
      <CustomCalendar
        currentMonth={state.currentMonth}
        setCurrentMonth={(date) =>
          dispatch({ type: "SET_CURRENT_MONTH", payload: date })
        }
        selectedDate={state.selectedDate}
        setSelectedDate={handleDateSelect}
        events={state.events}
      />
      <BottomSheet
        isOpen={state.selectedDate !== null}
        onClose={() => dispatch({ type: "SELECT_DATE", payload: null })}
        primaryButtonText={
          state.isAddingEvent || state.isEditingEvent
            ? state.isEditingEvent
              ? "Save"
              : "Add"
            : "Done"
        }
        onAccept={() => {
          if (state.isAddingEvent) {
            handleAddEvent();
          } else if (state.isEditingEvent) {
            handleEditEvent();
          } else {
            dispatch({ type: "SELECT_DATE", payload: null });
          }
        }}
        title={
          state.isAddingEvent
            ? "Add New Event"
            : state.isEditingEvent
            ? "Edit Event"
            : `Events for ${state.selectedDate?.toDateString()}`
        }
      >
        <BottomSheetContent
          isAddingEvent={state.isAddingEvent}
          isEditingEvent={state.isEditingEvent}
          selectedDate={state.selectedDate}
          eventsForSelectedDate={eventsForSelectedDate}
          newEventData={state.newEventData}
          dispatch={dispatch}
          startEditingEvent={startEditingEvent}
          handleDeleteEvent={handleDeleteEvent}
        />
      </BottomSheet>
    </div>
  );
}

export default Home;
