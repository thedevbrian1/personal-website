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