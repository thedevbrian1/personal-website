import { Link } from "@remix-run/react";
import { ArrowLeftIcon } from "~/components/Icon";

export default function Success() {
    return (
        <main className="h-screen w-full grid place-items-center">
            <div>
                <h1 className="font-heading text-3xl lg:text-6xl text-white">Success</h1>
                <Link to="/" className="text-blue-500 underline flex gap-2 mt-2">
                    <ArrowLeftIcon /> Back to home
                </Link>
            </div>
        </main>
    )
}