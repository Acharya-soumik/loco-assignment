import React from "react";
import EventForm from "@/components/EventForm";
import { Event, EventFormData } from "@/store/events/eventTypes";
import { ChevronRight } from "lucide-react";
import { Action } from "@/store/events";

interface BottomSheetContentProps {
  isAddingEvent: boolean;
  isEditingEvent: boolean;
  selectedDate: Date | null;
  eventsForSelectedDate: Event[];
  newEventData: EventFormData;
  dispatch: React.Dispatch<Action>;
  startEditingEvent: (event: Event) => void;
  handleDeleteEvent: (eventId: string) => void;
}

const BottomSheetContent: React.FC<BottomSheetContentProps> = ({
  isAddingEvent,
  isEditingEvent,
  eventsForSelectedDate,
  newEventData,
  dispatch,
  startEditingEvent,
  handleDeleteEvent,
}) => {
  if (isAddingEvent || isEditingEvent) {
    return (
      <EventForm
        onDataChange={(data) =>
          dispatch({ type: "UPDATE_NEW_EVENT_DATA", payload: data })
        }
        initialData={newEventData}
      />
    );
  }

  if (eventsForSelectedDate.length === 0) {
    return (
      <>
        <p className="text-black">No events for this date.</p>
        <br />
        <button
          className="text-blue-600 flex"
          onClick={() => dispatch({ type: "SET_ADDING_EVENT", payload: true })}
        >
          add event <ChevronRight />
        </button>
      </>
    );
  }

  return (
    <>
      <ul className="space-y-4">
        {eventsForSelectedDate.map((event) => (
          <li key={event.id} className="border-b border-red-300 pb-2 shadow-l">
            <h3 className="text-gray-700 font-semibold text-md">
              {event.title}
            </h3>
            <p className="text-gray-500 text-sm pl-2">{event.description}</p>
            <div className="mt-2 space-x-2">
              <button
                className="text-blue-600"
                onClick={() => startEditingEvent(event)}
              >
                edit
              </button>
              <button
                className="text-red-600"
                onClick={() => handleDeleteEvent(event.id)}
              >
                delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <br />
      <button
        className="text-blue-600 flex hover:scale-105"
        onClick={() => dispatch({ type: "SET_ADDING_EVENT", payload: true })}
      >
        add more <ChevronRight />
      </button>
    </>
  );
};

export default BottomSheetContent;
