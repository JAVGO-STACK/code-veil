"use client";

import React, { useReducer, ChangeEvent, FormEvent } from "react";

interface FormField {
    value: string;
    error: string;
}

interface FormState {
    name: FormField;
    email: FormField;
    message: FormField;
    isSubmitting: boolean;
    submitSuccess: string | null;
    submitError: string | null;
}

type FormFieldKey = {
  [K in keyof FormState]: FormState[K] extends FormField ? K : never;
}[keyof FormState];

type Action =
  | { type: "UPDATE_FIELD"; field: FormFieldKey; value: string }
  | { type: "SET_ERROR"; field: FormFieldKey; error: string }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_SUCCESS"; message: string }
  | { type: "SUBMIT_ERROR"; error: string }
  | { type: "RESET_FORM" };

const initialState: FormState = {
    name: { value: "", error: "" },
    email: { value: "", error: "" },
    message: { value: "", error: "" },
    isSubmitting: false,
    submitSuccess: null,
    submitError: null,
};

const reducer = (state: FormState, action: Action): FormState => {
    switch (action.type) {
        case "UPDATE_FIELD":
            return {
                ...state,
                [action.field]: { ...state[action.field], value: action.value, error: "" },
            };
        case "SET_ERROR":
            return {
                ...state,
                [action.field]: { ...state[action.field], error: action.error },
            };
        case "SUBMIT_START":
            return { ...state, isSubmitting: true, submitSuccess: null, submitError: null };
        case "SUBMIT_SUCCESS":
            return { ...initialState, submitSuccess: action.message };
        case "SUBMIT_ERROR":
            return { ...state, isSubmitting: false, submitError: action.error };
        case "RESET_FORM":
            return initialState;
        default:
            return state;
    }
};

const InputField: React.FC<{
    label: string;
    type: string;
    placeholder: string;
    value: string;
    error: string;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}> = ({ label, type, placeholder, value, error, onChange }) => (
    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={label}>
            {label}
        </label>
        {type !== "textarea" ? (
            <input
                id={label}
                type={type}
                placeholder={placeholder}
                className={`w-full px-4 py-2 border ${
                    error ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 ${
                    error ? "focus:ring-red-500" : "focus:ring-indigo-500"
                } transition`}
                value={value}
                onChange={onChange}
                aria-invalid={!!error}
                aria-describedby={`${label}-error`}
            />
        ) : (
            <textarea
                id={label}
                placeholder={placeholder}
                rows={10}
                className={`w-full px-4 py-2 border ${
                    error ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 ${
                    error ? "focus:ring-red-500" : "focus:ring-indigo-500"
                } transition`}
                value={value}
                onChange={onChange}
                aria-invalid={!!error}
                aria-describedby={`${label}-error`}
            />
        )}
        {error && (
            <p className="mt-1 text-xs text-red-500" id={`${label}-error`}>
                {error}
            </p>
        )}
    </div>
);

export const Contact: React.FC = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleChange = (field: keyof FormState) => (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        // @ts-ignore
        dispatch({error: "", message: "", type: "UPDATE_FIELD", field, value: e.target.value });
    };

    const validate = (): boolean => {
        let isValid = true;

        if (!state.name.value.trim()) {
            dispatch({ type: "SET_ERROR", field: "name", error: "Name is required." });
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!state.email.value.trim()) {
            dispatch({ type: "SET_ERROR", field: "email", error: "Email is required." });
            isValid = false;
        } else if (!emailRegex.test(state.email.value)) {
            dispatch({ type: "SET_ERROR", field: "email", error: "Invalid email address." });
            isValid = false;
        }

        if (!state.message.value.trim()) {
            dispatch({ type: "SET_ERROR", field: "message", error: "Message is required." });
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        dispatch({ type: "SUBMIT_START" });

        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));

            console.log("Form Data:", {
                name: state.name.value,
                email: state.email.value,
                message: state.message.value,
            });

            dispatch({ type: "SUBMIT_SUCCESS", message: "Your message has been sent successfully!" });
        } catch (error) {
            dispatch({
                type: "SUBMIT_ERROR",
                error: "There was an error submitting the form. Please try again.",
            });
        }
    };

    return (
        <div className="w-full min-h-screen max-w-screen bg-white rounded-lg p-8">
            <div className="flex items-center mb-6 justify-left">
                <img
                    src="/images/site/gmail.png"
                    alt="Icon"
                    className="mr-4 hidden sm:block w-10 h-10 object-contain"
                />
                <h2 className="text-3xl font-semibold text-gray-800">联系老李</h2>
            </div>
            <h6>通过邮件联系我，如果我正好在线，我会尽快回复你。</h6><br/>
            <form onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                        label="姓名"
                        type="text"
                        placeholder="Your Name"
                        value={state.name.value}
                        error={state.name.error}
                        onChange={handleChange("name")}
                    />
                    <InputField
                        label="邮箱"
                        type="email"
                        placeholder="Your Email Address"
                        value={state.email.value}
                        error={state.email.error}
                        onChange={handleChange("email")}
                    />
                </div>
                <InputField
                    label="邮件内容"
                    type="textarea"
                    placeholder="在这里写下你的 idea"
                    value={state.message.value}
                    error={state.message.error}
                    onChange={handleChange("message")}
                />
                {state.submitSuccess && (
                    <div className="mb-4 text-green-600">{state.submitSuccess}</div>
                )}
                {state.submitError && (
                    <div className="mb-4 text-red-600">{state.submitError}</div>
                )}
                <button
                    type="submit"
                    className={`w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition ${
                        state.isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={state.isSubmitting}
                >
                    {state.isSubmitting ? "发送中..." : "发送"}
                </button>
            </form>
        </div>
    );
};
