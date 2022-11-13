export default function Input({ type, name, id, placeholder }) {
    return (
        // <div className="relative w-full xl:max-w-sm group">
        //     <div className="absolute -inset-0.5 bg-[#c31432] blur opacity-75 rounded-lg" />
        // </div>
        <input
            type={type}
            name={name}
            id={id}
            placeholder={placeholder}
            className="relative w-full xl:max-w-sm bg-slightly-lighter-dark-blue block rounded-lg  text-body-white focus:border-none focus:ring-2 focus:ring-white invalid:border invalid:border-red-500"
        />
    )
}

// import { useActionData } from "@remix-run/react";
// import { forwardRef, useState, useEffect } from "react";

// // TODO: Focus management
// const Input = forwardRef(({ type, name, id, placeholder, fieldError }, ref) => {
//     // const actionData = useActionData();
//     const [isClientError, setIsClientError] = useState(true);
//     const errorState = isClientError && fieldError;
//     // const inputRef = useRef(null);

//     function handleChange() {
//         setIsClientError(false);
//     }

//     // useEffect(() => {
//     //     if (fieldError) {
//     //     }
//     //     inputRef.current?.focus()
//     // }, []);
//     // TODO: Always display error messages upon multiple submissions. Use a clean up function maybe
//     return (
//         <>

//             <input
//                 ref={ref}
//                 type={type}
//                 name={name}
//                 id={id}
//                 placeholder={placeholder}
//                 onChange={handleChange}
//                 className={`block w-full px-3 py-2 border bg-slightly-lighter-dark-blue rounded-lg  text-body-white focus:border-none focus:ring-2 focus:ring-white invalid:border invalid:border-red-500 focus:outline-none  ${errorState ? 'border-red-700' : 'border-gray-400'}`}
//             />
//             {
//                 errorState
//                     ? (<span className="pt-1 text-red-700 inline text-sm" id="email-error">
//                         {fieldError}
//                     </span>)
//                     : <>&nbsp;</>
//             }
//         </>

//     );
// })

// export default Input;