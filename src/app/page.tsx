"use client";
import { useState, useCallback } from "react";
import BottomSheet from "@/components/BottomSheet";
import CustomCalendar from "@/components/CustomCalender";
import EventForm from "@/components/EventForm";

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
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [newEventData, setNewEventData] = useState<EventFormData>({
    title: "",
    description: "",
  });

  const handleDateSelect = useCallback((date: Date | null) => {
    if (date) setSelectedDate(date);
    setIsAddingEvent(false);
    setNewEventData({ title: "", description: "" });
  }, []);

  const handleAddEvent = useCallback(() => {
    if (selectedDate && newEventData.title.trim()) {
      const newEvent: Event = {
        id: Date.now().toString(),
        date: selectedDate,
        title: newEventData.title.trim(),
        description: newEventData.description.trim(),
      };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
      setNewEventData({ title: "", description: "" });
      setIsAddingEvent(false);
    }
  }, [selectedDate, newEventData]);

  const eventsForSelectedDate = selectedDate
    ? events.filter(
        (event) => event.date.toDateString() === selectedDate.toDateString()
      )
    : [];

  return (
    <div className="flex justify-center items-center h-screen">
      <CustomCalendar
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
        selectedDate={selectedDate}
        setSelectedDate={handleDateSelect}
        events={events}
      />
      <BottomSheet
        isOpen={selectedDate !== null}
        onClose={() => {
          setSelectedDate(null);
          setIsAddingEvent(false);
          setNewEventData({ title: "", description: "" });
        }}
        primaryButtonText={isAddingEvent ? "Add" : "Done"}
        onAccept={() => {
          if (isAddingEvent) {
            handleAddEvent();
          } else {
            setSelectedDate(null);
          }
        }}
        title={
          isAddingEvent
            ? "Add New Event"
            : `Events for ${selectedDate?.toDateString()}`
        }
      >
        {isAddingEvent ? (
          <EventForm
            onDataChange={setNewEventData}
            initialData={newEventData}
          />
        ) : eventsForSelectedDate.length === 0 ? (
          <>
            <p className="text-black">No events for this date.</p>
            <br />
            <button
              className="text-blue-600"
              onClick={() => setIsAddingEvent(true)}
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
                </li>
              ))}
            </ul>
            <br />
            <button
              className="text-blue-600"
              onClick={() => setIsAddingEvent(true)}
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
