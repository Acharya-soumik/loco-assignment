import { EventFormData } from "@/app/page";
import { useState } from "react";

const EventForm: React.FC<{
  onDataChange: (data: EventFormData) => void;
  initialData?: EventFormData;
}> = ({ onDataChange, initialData = { title: "", description: "" } }) => {
  const [title, setTitle] = useState(initialData.title);
  const [description, setDescription] = useState(initialData.description);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    onDataChange({ title: e.target.value, description });
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
    onDataChange({ title, description: e.target.value });
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="Event Title"
        className="w-full p-2 border border-gray-300 rounded text-gray-400"
      />
      <textarea
        value={description}
        onChange={handleDescriptionChange}
        placeholder="Event Description"
        className="w-full p-2 border border-gray-300 rounded text-gray-400"
      />
    </div>
  );
};

export default EventForm;
