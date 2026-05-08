import { supabase } from "@/utils/supabase/client";
import { SetStateAction } from "react";
import toast from "react-hot-toast";


interface ConfirmDeleteProps {
  setConfirmDeleteModal?: React.Dispatch<SetStateAction<boolean>>;
  onDelete?: (id: string) => void;
  selectedIndex: string;
  collectionName: string
}

const deleteItem = async (id: string, collectionName: string) => {
  const { error } = await supabase
    .from(collectionName)
    .delete()
    .eq("id", id);

  if (error) throw error;
  return true;
};


export default function ConfirmDelete({
  setConfirmDeleteModal,
  onDelete,
  selectedIndex,
  collectionName
}: ConfirmDeleteProps) {

  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Deleting...");

    try {
      await deleteItem(id, collectionName);

      toast.dismiss(toastId);
      toast.success("Event deleted successfully");

      onDelete?.(id);
      setConfirmDeleteModal?.(false);
    } catch (err) {
      console.error(err);
      toast.dismiss(toastId);
      toast.error("Failed to delete event!");
    }
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/55 backdrop-blur-sm p-4 z-50">
      <div className="w-full max-w-md flex flex-col items-center gap-10 bg-[#F7FCFE] shadow-md rounded-md p-8">
        <h1 className="text-center font-merienda font-extrabold text-[#008CC1] text-xl md:text-3xl">
          Are you sure you want to delete this item?
        </h1>

        <div className="flex items-center gap-6">
          <button
            onClick={() => setConfirmDeleteModal?.(false)}
            type="button"
            className="bg-[#008CC1] py-3 px-7 text-lg font-medium text-white rounded-xl cursor-pointer hover:opacity-80 transition-all"
          >
            No
          </button>

          <button
            onClick={() => handleDelete(selectedIndex)}
            type="button"
            className="bg-red-600 py-3 px-7 text-lg font-medium text-white rounded-xl cursor-pointer hover:bg-red-700 transition-all"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
