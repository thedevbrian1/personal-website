// import { motion, useInView } from "framer-motion";
import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function Exp() {
    gsap.registerPlugin(ScrollTrigger);

    const ref = useRef(null);
    const rectRef = useRef(null);
    const wobbleRef = useRef(null);

    const q = gsap.utils.selector(rectRef);

    // const isInView = useInView(ref, { once: true, amount: 0.3 });
    function handleAnimation() {
        gsap.from(ref.current, {
            xPercent: 100,
            opacity: 0,
            ease: 'expo',
            duration: 2,
            immediateRender: false,
        });
    }
    useLayoutEffect(() => {

        let from = gsap.from(ref.current, {

            xPercent: 100,
            ease: 'expo',
            opacity: 0,
            duration: 2,
            delay: 1,
            scrollTrigger: ref.current,
            immediateRender: false,
        });
        // gsap.to(ref.current, {
        //     xPercent: 100
        // })
        // let from = gsap.from(q('.rectangle'), {
        //     yPercent: 100,
        //     ease: "expo.easeInOut",
        //     duration: 2,
        //     stagger: {
        //         amount: 1,

        //     }

        // })

        // let from = gsap.from(wobbleRef.current, {
        //     xPercent: 100,
        //     yPercent: 100,
        //     duration: 2,

        // })
        return () => {
            from.kill();
        }
    }, [])

    return (
        <main className="w-full h-screen grid place-items-center">
            {/* <div className="h-screen text-white mt-20">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, voluptate laudantium praesentium explicabo similique numquam laborum omnis autem dignissimos eveniet odio optio sed voluptatibus. Fugit similique magnam odio est maiores doloribus commodi consequatur id sint alias, delectus veniam dolores cupiditate aspernatur, ab eos reprehenderit ad provident ratione reiciendis neque. Vitae?
            </div> */}
            {/* <p ref={ref} className="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam velit, sunt debitis impedit maiores optio molestiae officia numquam nam rem.</p> */}
            <button
                type="button"
                className="bg-green-500 px-6 py-3 text-white"
                onClick={handleAnimation}
            >
                Start animation
            </button>
            <div className="w-96 h-96 border border-red-500 mt-[120vh]">
                <svg viewBox="0 0 100 100" className="">
                    <mask id="myMask">
                        <rect
                            ref={ref}
                            x="0"
                            y="0"
                            width="100%"
                            height="100%"
                            fill="white"

                        />

                        {/* <rect
                            x="10"
                            y="0"
                            width="10%"
                            height="100%"
                            fill="white"
                            ref={rectRef}
                        />
                        <rect
                            x="20"
                            y="0"
                            width="10%"
                            height="100%"
                            fill="white"
                            ref={rectRef}
                        />
                        <rect
                            x="30"
                            y="0"
                            width="10%"
                            height="100%"
                            fill="white"
                            ref={rectRef}
                        />
                        <rect
                            x="40"
                            y="0"
                            width="10%"
                            height="100%"
                            fill="white"
                            ref={rectRef}
                        />
                        <rect
                            x="50"
                            y="0"
                            width="10%"
                            height="100%"
                            fill="white"
                            ref={rectRef}
                        />
                        <rect
                            x="60"
                            y="0"
                            width="10%"
                            height="100%"
                            fill="white"
                            ref={rectRef}
                        />
                        <rect
                            x="70"
                            y="0"
                            width="10%"
                            height="100%"
                            fill="white"
                            ref={rectRef}
                        />
                        <rect
                            x="80"
                            y="0"
                            width="10%"
                            height="100%"
                            fill="white"
                            ref={rectRef}
                        />
                        <rect
                            x="90"
                            y="0"
                            width="10%"
                            height="100%"
                            fill="white"
                            ref={rectRef}
                        /> */}
                        {/* <path ref={wobbleRef} id="wobble" d="M53.48-414.83C-36.82-373-33.76-278.17-19.91-194c12.17,74,66.56,136.46,2.05,205.61s-109.6,66-153.69,147.16,31,143.15-55,230.15-274,14.62-267,206S-750.66,726.14-680.2,819.76c75,99.68,487.9,207.62,632,282.55,342.19,177.9,764,148.24,902.86-42.68C994.14,867.89,1031.26,327.21,819.11-35.12,647.45-328.3,300.19-406.44,276.48-428.27,223.48-477.07,92.55-432.94,53.48-414.83Z" fill="white" /> */}
                    </mask>
                    <image mask="url(#myMask)" x="0" y="0" width="100%" height="100%" href="/brian.jpg" />
                </svg>
            </div>
        </main>
    )
}