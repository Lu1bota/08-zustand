"use client";

// import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from "formik";
// import * as Yup from "yup";
import type { CreateNoteValues } from "../../types/note";
import css from "./NoteForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../lib/api";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { initialDraft, useDraftStore } from "@/lib/store/noteStore";

// const validationSchema = Yup.object().shape({
//   title: Yup.string()
//     .min(3, "To short!")
//     .max(50, "To long!")
//     .required("Title is required!"),
//   content: Yup.string().max(500),
//   tag: Yup.string()
//     .oneOf(["Work", "Personal", "Meeting", "Shopping", "Todo"])
//     .required("Tag is required!"),
// });

// const initialValues: CreateNoteValues = {
//   title: "",
//   content: "",
//   tag: "Todo",
// };

// export interface NoteFormProps {
//   onClose: () => void;
// }
// { onClose }: NoteFormProps

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useDraftStore();

  const formValues = draft ? draft : initialDraft;

  const mutationCreate = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      // onClose();
      router.push("/notes/filter/all");
      toast.success("Success! Your note has been saved.");
    },
    onError: () => {
      toast.error("Oops! The note couldn't be saved.");
    },
  });

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setDraft({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(formData: FormData) {
    const formValues = Object.fromEntries(
      formData
    ) as unknown as CreateNoteValues;
    mutationCreate.mutate(formValues);
    console.log(formValues);
    clearDraft();
  }
  return (
    <>
      <form className={css.form} action={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            name="title"
            className={css.input}
            defaultValue={draft.title}
            onChange={handleChange}
          />
          {/* <ErrorMessage name="title" component="span" className={css.error} />
           */}
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
            defaultValue={draft.content}
            onChange={handleChange}
          />
          {/* <ErrorMessage name="content" component="span" className={css.error} /> */}
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <select
            id="tag"
            name="tag"
            className={css.select}
            defaultValue={draft.tag}
            onChange={handleChange}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </select>
          {/* <ErrorMessage name="tag" component="span" className={css.error} /> */}
        </div>

        <div className={css.actions}>
          <button
            type="button"
            className={css.cancelButton}
            onClick={() => router.push("/notes/filter/all")}
          >
            Cancel
          </button>
          {mutationCreate.isPending ? (
            <button type="submit" className={css.submitButton} disabled={true}>
              Note creation...
            </button>
          ) : (
            <button type="submit" className={css.submitButton} disabled={false}>
              Create note
            </button>
          )}
        </div>
      </form>
      <Toaster />
    </>
  );
}
