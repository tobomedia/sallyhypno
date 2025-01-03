import {FC, memo, useState} from 'react';

// interface FormData {
//   name: string;
//   email: string;
//   message: string;
// }

const ContactForm: FC = memo(() => {
  // const defaultData = useMemo(
  //   () => ({
  //     name: '',
  //     email: '',
  //     message: '',
  //   }),
  //   [],
  // );

  // const [data, setData] = useState<FormData>(defaultData);
  const [messageSent, setMessageSent] = useState(false);

  // const onChange = useCallback(
  //   <T extends HTMLInputElement | HTMLTextAreaElement>(event: React.ChangeEvent<T>): void => {
  //     const {name, value} = event.target;

  //     const fieldData: Partial<FormData> = {[name]: value};

  //     setData({...data, ...fieldData});
  //   },
  //   [data],
  // );

  const inputClasses =
    'bg-neutral-700 border-0 focus:border-0 focus:outline-none focus:ring-1 focus:ring-orange-600 rounded-md placeholder:text-neutral-400 placeholder:text-sm text-neutral-200 text-sm';

  return !messageSent ? (
    <form
      className="grid min-h-[320px] grid-cols-1 gap-y-4"
      method="POST"
      name="contact"
      onSubmit={() => setMessageSent(!messageSent)}
      data-netlify="true">
      <input className={inputClasses} name="name" placeholder="Name" required type="text" />
      <input autoComplete="email" className={inputClasses} name="email" placeholder="Email" required type="email" />
      <textarea className={inputClasses} maxLength={250} name="message" placeholder="Message" required rows={6} />
      <input type="hidden" name="form-name" value="contact" />
      <button
        aria-label="Submit contact form"
        className="w-max rounded-full border-2 border-orange-600 bg-stone-900 px-4 py-2 text-sm font-medium text-white shadow-md outline-none hover:bg-stone-800 focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:ring-offset-stone-800"
        type="submit">
        Send Message
      </button>
    </form>
  ) : (
    <div className="text-xl font-bold text-white flex justify-center">
      <div>Thank you! We've got your message and will be in touch!</div>
    </div>
  );
});

ContactForm.displayName = 'ContactForm';
export default ContactForm;
