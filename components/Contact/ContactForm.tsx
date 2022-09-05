import { useState } from "react";
import { useForm } from "@hooks/useForm";
import { Box } from "@components/box";
import { Input, Textarea, Submit, ErrorMessage } from "@components/Form";

export interface ContactFormProps {
  address?: string;
  emails?: string[];
  phones?: string[];
  socials?: unknown[];
}

interface FormInput {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const fieldNames = {
  name: "Full name",
  email: "Email address",
  phone: "Phone number",
}

const fieldTypes = {
  email: "email", phone: "tel",
}

function ContactForm({
  address,
  emails,
  phones,
  socials,
}: ContactFormProps) {
  const [success, setSuccess] = useState(false);
  const requiredFields = ["name", "email"];
  const { formState, dispatchFormChange, submitFormAsync, formErrors, errorMessage } =
    useForm<FormInput>({
      name: "", email: "", phone: "", message: "",
    }, {
      onValidate: () => {
        return requiredFields
          .filter(field => !formState[field])
          .reduce((errFields, field) => ({ ...errFields, [field]: fieldNames[field] }), {});
      },
    });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    submitFormAsync(event).then(data => {
      setSuccess(true);
      dispatchFormChange({
        name: "", email: "", phone: "", message: "",
      })
      setTimeout(() => {
        setSuccess(false);
      }, 3000)
      console.log("received response", { data });
    }).catch(error => {
      console.error("received error", { error });
    });
  }

  return (
    <Box
      py="40px"
      px={["20px", null, "32px"]}
      width="100%"
      height={["100%", null, "auto"]}
      fontFamily="IIIncrementsSans"
      overflow="scroll"
      display={["block", null, "flex"]}
      justifyContent="center"
      alignItems="center"
    >
      <Box width="100%" maxWidth="900px">
        <Box as="h3" fontSize={["16px", "20px", null, "32px"]} py="12px">
          Get in Touch
        </Box>
        {errorMessage && <ErrorMessage message={errorMessage} />}
        {success && <Box mt="12px" p="12px 20px" width="auto" display="inline-block" bg="rgb(50, 150, 75)" borderRadius="8px" fontSize="18px">Thanks for contacting us, we'll be in touch!</Box>}

        <form action="/api/contact" method="post" onSubmit={onSubmit}>
          {Object.keys(fieldNames).map(field => (
            <Input key={`input-${field}`} name={field} type={fieldTypes[field] || "text"}
              placeholder={fieldNames[field].toUpperCase()}
              value={formState[field]}
              isError={formErrors[field] && true}
              onChange={e => dispatchFormChange({ [field]: e.target.value })} />
          ))}
          <Textarea
            name="message"
            placeholder="YOUR MESSAGE"
            rows={5}
            value={formState.message}
            onChange={e => dispatchFormChange({ message: e.target.value })} />

          <Submit text="CONTACT US" />
        </form>
      </Box>
    </Box>
  );
}

export default ContactForm;
