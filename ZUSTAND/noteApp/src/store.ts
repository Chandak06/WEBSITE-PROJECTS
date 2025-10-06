import { create } from "zustand";

interface Note {
  id: number;
  title: string;
  content: string;
}

interface NoteStore {
  notes: Note[];
  addNote: (note: Note) => void;
  updateNote: (id: number, updatedNote: Partial<Note>) => void;
  removeNote: (id: number) => void;
}

const useStore = create<NoteStore>((set) => ({
  notes: [],
  addNote: (note: Note) => set((state) => ({ notes: [...state.notes, note] })),
  updateNote: (id: number, updatedNote: Partial<Note>) =>
    set((state) => ({
      notes: state.notes.map((note) => (
        note.id === id ? { ...note, ...updatedNote } : note
      )),
    })),
  removeNote: (id: number) =>
    set((state) => ({ notes: state.notes.filter((note) => note.id !== id) })),
}));

export default useStore;
