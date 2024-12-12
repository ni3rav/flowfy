import { Button, Label, Modal, Textarea, TextInput } from "flowbite-react";
import { CirclePlus } from "lucide-react";
import { useRef, useState } from "react";

export function CreateTask() {
  const [openModal, setOpenModal] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div
        onClick={() => setOpenModal(true)}
        className="fixed bottom-10 right-10 bg-teal-500 text-white/90 rounded-full size-14 flex items-center justify-center font-light"
      >
        <CirclePlus size={28} />
      </div>
      <Modal
        dismissible
        show={openModal}
        size="md"
        popup
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header />
        <Modal.Body className="w-full h-full"></Modal.Body>
        <div className="space-y-6 px-4 py-2">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Create new task
          </h3>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="title" value="Title for task" />
            </div>
            <TextInput id="title" ref={titleInputRef} required />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="text" value="Description for your task" />
            </div>
            <Textarea id="text" rows={10} />
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Button>Create</Button>
            </div>
          </div>
        </div>
        <Modal.Footer />
      </Modal>
    </>
  );
}
