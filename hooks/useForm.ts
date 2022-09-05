import { useEffect, useMemo, useReducer, useState } from "react";
import { createEmailjsClient } from "@lib/emailjs";

import { post } from "@lib/http";

type DispatchChangeType<T> = (changege: T) => void;
type SubmitFormType = (event: React.FormEvent<HTMLFormElement>) => Promise<any>;

interface FormErrors {
  [key: string]: string;
}

interface UseFormOptions {
  onValidate?: () => FormErrors;
}

interface UseFormResult<T> {
  formState: T;
  dispatchFormChange: DispatchChangeType<T>;
  submitFormAsync: SubmitFormType;
  formErrors?: FormErrors;
  errorMessage?: string;
}

export function useForm<InputType>(
  initialState: InputType,
  options: UseFormOptions = {}
): UseFormResult<InputType> {
  const { onValidate } = options;
  const formReducer = (state: InputType, action: InputType) => ({ ...state, ...action });
  const [formState, dispatchFormChange] = useReducer(formReducer, initialState);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const isErrors = useMemo(() => Object.keys(formErrors).length > 0, [formErrors]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (isErrors) {
      setErrorMessage(`${Object.values(formErrors).join(" and ")} required`);
    } else {
      setErrorMessage("");
    }
  }, [formErrors]);

  const submitFormAsync = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const emailjsClient = createEmailjsClient();
    const contactTemplateId = process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID

    if (onValidate) {
      const errors = onValidate();
      setFormErrors(errors);
      if (Object.keys(errors).length > 0) {
        return Promise.reject(errors);
      }
    }

    const form: HTMLFormElement = event.currentTarget;
    return emailjsClient.sendTemplateMessage(contactTemplateId, formState)
      .then(res => {
        if (res.status !== 200) {
          return res.json().then(json => { throw new Error(json.message) })
        }
        return res.text();
      })
      .catch(err => {
        setErrorMessage(err.message)
        return Promise.reject(err);
      });
  }

  return { formState, dispatchFormChange, submitFormAsync, formErrors, errorMessage };
}
