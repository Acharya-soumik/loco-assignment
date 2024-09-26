"use client";
import { useReducer, useCallback } from "react";
import BottomSheet from "@/components/BottomSheet";
import CustomCalendar from "@/components/CustomCalender";
import EventForm from "@/components/EventForm";
import {
  eventReducer,
  initialEventState,
  EventState,
  EventAction,
} from "@/store/events";
import * as eventActions from "@/store/events";

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

function Home() {
  const [state, dispatch] = useReducer<
    (state: EventState, action: EventAction) => EventState
  >(eventReducer, initialEventState);

  const handleDateSelect = useCallback((date: Date | null) => {
    dispatch(eventActions.selectDate(date));
  }, []);

  const handleAddEvent = useCallback(() => {
    dispatch(eventActions.addEvent());
  }, []);

  const handleEditEvent = useCallback(() => {
    dispatch(eventActions.editEvent());
  }, []);

  const handleDeleteEvent = useCallback((eventId: string) => {
    dispatch(eventActions.deleteEvent(eventId));
  }, []);

  const startEditingEvent = useCallback((event: Event) => {
    dispatch(eventActions.startEditingEvent(event));
  }, []);

  const eventsForSelectedDate = state.selectedDate
    ? state.events.filter(
        (event) =>
          event.date.toDateString() === state.selectedDate!.toDateString()
      )
    : [];

  return (
    <div className="flex justify-center items-center">
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
        {state.isAddingEvent || state.isEditingEvent ? (
          <EventForm
            onDataChange={(data) =>
              dispatch(eventActions.updateNewEventData(data))
            }
            initialData={state.newEventData}
          />
        ) : eventsForSelectedDate.length === 0 ? (
          <>
            <p className="text-black">No events for this date.</p>
            <br />
            <button
              className="text-blue-600"
              onClick={() => dispatch(eventActions.addEvent())}
            >
              Add a new event
            </button>
          </>
        ) : (
          <>
            <ul className="space-y-4">
              {eventsForSelectedDate.map((event) => (
                <li key={event.id} className="border-b pb-2">
                  <h3 className="text-black font-semibold">{event.title}</h3>
                  <p className="text-black">{event.description}</p>
                  <div className="mt-2 space-x-2">
                    <button
                      className="text-blue-600"
                      onClick={() => startEditingEvent(event)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600"
                      onClick={() => handleDeleteEvent(event.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <br />
            <button
              className="text-blue-600"
              onClick={() =>
                dispatch({ type: "SET_ADDING_EVENT", payload: true })
              }
            >
              Add another event
            </button>
          </>
        )}
      </BottomSheet>
    </div>
  );
}

export default Home;
