import { NavLink } from "@remix-run/react";
import { useState } from "react";
import { MenuIcon, XIcon } from "~/components/Icon";

export default function Nav({ navLinks }) {
    const [isMenuShowing, setIsMenuShowing] = useState(false);
    function toggleMenu() {
        setIsMenuShowing(!isMenuShowing);
    }

    return (
        <nav>
            <ul className="text-white hidden lg:flex gap-6">
                {navLinks.map((navLink) => (
                    <li key={navLink.id} className="hover:text-orange-400 transition duration-300 ease-in-out">
                        <NavLink to={navLink.path}>
                            {navLink.name}
                        </NavLink>
                    </li>
                ))}
            </ul>
            <div className="lg:hidden">
                <MenuIcon toggleMenu={toggleMenu} />
                {
                    isMenuShowing && (
                        <div className='flex flex-col justify-center items-center bg-black opacity-90 w-full h-screen fixed z-10 top-0 left-0 transition duration-500 ease-in-out'>
                            <span className="absolute top-8 right-6">
                                <XIcon toggleMenu={toggleMenu} />
                            </span>
                            <ul className='list-none text-center mr-4 text-white'>
                                {navLinks.map((navLink) => (
                                    <li
                                        className='text-xl'
                                        key={navLink.id}
                                        onClick={() => setIsMenuShowing(false)}
                                    >
                                        <NavLink
                                            to={navLink.path}
                                            prefetch='intent'
                                            end
                                            className={({ isActive }) => isActive ? 'underline' : ''}
                                        >
                                            {navLink.name}
                                        </NavLink>
                                    </li>

                                ))}
                            </ul>
                        </div>
                    )
                }
            </div>
        </nav>
    );
}