// import { Response } from "@remix-run/node";
import { Form, Link, useActionData, useCatch, useFetcher, useTransition } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import Heading from "~/components/Heading";
import { ArrowLeftIcon, Facebook, Twitter } from "~/components/Icon";
import ProjectCard from "~/components/ProjectCard";

import { addContactToList, badRequest, createContact, sendEmail, useOptionalUser, validateEmail, validateMessage, validateName } from "~/utils";

export async function action({ request }) {
  const formData = await request.formData();
  const action = formData.get('_action');

  const Mailjet = require('node-mailjet');
  const mailjet = Mailjet.apiConnect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);

  // const res = await mailjet.get("listrecipient", { 'version': 'v3' }).request();
  // console.log({ res });
  if (action === 'contact') {
    // Send email
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    const fields = { name, email, message };
    const fieldErrors = {
      name: validateName(name),
      email: validateEmail(email),
      message: validateMessage(message)
    };

    // Return errors if any
    if (Object.values(fieldErrors).some(Boolean)) {
      return badRequest({ fieldErrors, fields });
    }
    let emailObj = {
      name,
      email,
      message
    };

    await sendEmail(emailObj);

    return redirect('/success');
  }

  if (action === 'subscribe') {
    // Subscribe to newsletter

    const email = formData.get('email');

    const field = { email };
    const fieldErrors = {
      email: validateEmail(email)
    }

    // Return errors if any
    if (Object.values(fieldErrors).some(Boolean)) {
      return badRequest({ field, fieldErrors });
    }
    // First create contact then add contact to a contact list
    //
    const contact = await createContact(email);

    const contactEmail = contact.Data[0].Email;

    await addContactToList(contactEmail);

    return redirect('/success');

  }
  return null;
}

export default function Index() {
  const user = useOptionalUser();
  return (
    <main className="relative min-h-screen font-body">
      {/* Hero section */}
      <Hero />
      {/* About section */}
      <About />
      {/* Projects section */}
      <Projects />
      {/* Form */}
      <ContactForm />
      {/* Footer  */}
      <Footer />
    </main>
  );
}

function Hero() {
  return (
    <section className="w-full min-h-screen relative">
      <div className="w-80 h-80 absolute -left-60 lg:-left-44 top-20 bg-brand-orange blur-3xl bg-opacity-20 rounded-full" />
      <div className="w-full grid items-start lg:place-items-center py-10 lg:py-auto">
        <div className="grid lg:grid-cols-2 w-full h-full gap-14 lg:gap-5 mt-5 lg:mt-8 pt-44 px-6 lg:px-10  border border-red-500">
          <div>
            {/* Text */}
            <h2 className="font-heading font-bold text-white text-2xl lg:text-5xl">Hi, I'm Brian Mwangi. I build websites that <span className="text-brand-orange">work</span></h2>
            <p className="text-body-white mt-3 lg:text-lg">Do you desire to have the <span className="text-brand-orange">best</span> website you can possibly have?</p>
            <div className="mt-5 flex gap-6 items-center">
              <Link to="/#contact" className="px-8 py-3 bg-white text-black hover:bg-brand-orange transition duration-300 ease-in-out rounded-lg">Contact me</Link>
              <Link to="/#projects" className="text-body-white hover:text-brand-orange transition duration-300 ease-in-out underline">View projects</Link>
            </div>
            <div className="w-9 h-9 mt-4 -ml-2">
              <img
                src="/contact-arrow.svg"
                alt=""
              />
            </div>
          </div>
          <div>
            {/* Image */}
            <div className="aspect-h-3 aspect-w-2 md:aspect-w-4 md:aspect-h-3">
              <img src="/hero.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-56 h-56 lg:w-80 lg:h-80 absolute -bottom-10 lg:-bottom-40 left-20 lg:left-1/3 bg-brand-orange blur-3xl bg-opacity-20 rounded-full" />
    </section>
  );
}

function About() {
  return (
    <section className="w-4/5 mx-auto bg-slightly-lighter-dark-blue rounded-xl border border-slate-500 lg:mt-10" id="about">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-36 items-center py-5 lg:py-10">
        <div className="pl-5 lg:pl-12 pt-6">
          <Heading text='About me' />
          <p className="text-body-white lg:text-lg mt-2 lg:mt-4">
            I am a web developer based in Nairobi, Kenya. I help my clients improve their online presence by building them fantastic websites with great SEO.
          </p>
          <p className="text-body-white lg:text-lg mt-2 ">
            I like to work out and solve puzzles when I'm not coding🙂
          </p>
          <h3 className="font-semibold font-heading text-body-white text-lg mt-2 lg:mt-4">Education</h3>
          <p className="text-body-white lg:text-lg  mt-2">I graduated with a Bachelor's degree in Computer Science from Jomo Kenyatta University of Agriculture and Technology.</p>
        </div>
        <div className="justify-self-center">
          <div className="aspect-w-4 aspect-h-3 w-40 lg:w-72 border border-[#c31432] rounded-lg">
            <img
              src="/brian.jpg"
              alt="A picture of Brian Mwangi"
              width="100%"
              height="100%"
              className="object-cover rounded-lg rotate-3"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section className="w-4/5 mx-auto" id="projects">
      <div className="grid justify-center pt-20 lg:pt-24">
        <Heading text='Wondering what I could do?' />
        <p className="text-body-white lg:text-center lg:text-lg mt-2 lg:mt-4">Here are some of my projects:</p>
        {/* TODO:
              Use laptop illustration and animations to showcase projects
              Use a laptop frame.
              Projects should display inside the frame
              Either a slider or scroll animation
          */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-5 px-3 lg:px-0 mt-5">

          {/* Project */}
          <ProjectCard
            imageUrl={'/organiczones.png'}
            alt={'A screenshot of organic zones home page'}
            title={'Organic zones'}
            projectUrl={'https://organiczones.co.ke'}
          />


          {/* Project */}
          <ProjectCard
            imageUrl={'/organiczones.png'}
            alt={'A screenshot of organic zones home page'}
            title={'Organic zones'}
            projectUrl={'https://organiczones.co.ke'}
          />

        </div>
      </div>
    </section>
  )
}

function ContactForm() {
  const actionData = useActionData();
  const transition = useTransition();

  // TODO: Display phone no and email insted of contact form?? Maybe..not sure
  return (
    <section className="w-4/5 mx-auto bg-slightly-lighter-dark-blue rounded-xl border border-slate-500 mt-24" id="contact">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-5 px-5 lg:px-8 py-10">
        <div className="lg:self-center">
          {/* Text */}
          <Heading text="Get in touch with me" />
          <p className="font-body text-body-white lg:text-lg mt-2 lg:mt-4">
            I'd like to hear from you
          </p>
          <div className="flex gap-5 items-end py-2">
            <div className="w-7 h-7 lg:w-8 lg:h-8">
              <img
                src="/phone.svg"
                alt="Mobile phone handcraft"
                width="100%"
                height="100%"
                className="-rotate-12"
              />
            </div>
            <span className="font-heading font-bold text-body-white">0710 162 152</span>
          </div>
        </div>
        <div className="lg:px-2">
          {/* Form */}
          <Form method="post">
            <fieldset className="grid gap-3">
              <div>
                <label htmlFor="name" className="text-body-white">
                  Name
                  {actionData?.fieldErrors
                    ? (<span className="text-red-500 ml-2">{actionData?.fieldErrors?.name}</span>)
                    : <>&nbsp;</>
                  }
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="border border-brand-orange rounded-lg w-full p-2 text-body-white bg-transparent"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-body-white">
                  Email
                  {(actionData?.fieldErrors && actionData?.fields)
                    ? (<span className="text-red-500 ml-2">{actionData?.fieldErrors?.email}</span>)
                    : <>&nbsp;</>
                  }
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="border border-brand-orange rounded-lg w-full p-2 text-body-white bg-transparent"
                />
              </div>
              <div>
                <label htmlFor="message" className="text-body-white">
                  Message
                  {actionData?.fieldErrors
                    ? (<span className="text-red-500 ml-2">{actionData?.fieldErrors?.message}</span>)
                    : <>&nbsp;</>
                  }
                </label>
                <textarea
                  name="message"
                  id="message"
                  // cols="30" 
                  rows="4"
                  className="w-full border border-brand-orange bg-transparent rounded-lg p-2 text-body-white"
                />
              </div>
              <button
                type="submit"
                name="_action"
                value="contact"
                className="bg-brand-orange w-full py-2 px-auto rounded-lg font-bold lg:text-lg"
              >
                {transition.submission && transition.submission.formData.get('_action') == 'contact'
                  ? 'Submitting...'
                  : 'Submit'
                }
              </button>
            </fieldset>
          </Form>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const actionData = useActionData();
  const transition = useTransition();
  const fetcher = useFetcher();

  return (
    <footer className="relative">
      <div className="w-36 h-36 lg:w-44 lg:h-44 absolute -left-20 lg:-left-36 top-10 bg-brand-orange blur-3xl bg-opacity-20 rounded-full" />
      <div className="w-4/5 mx-auto mt-16">
        <div className="flex justify-between">
          <h2 className="font-heading text-white uppercase">Brian Mwangi</h2>
          <div className="flex gap-3">
            {/* <img src="/twitter.svg" alt="Twitter icon" />
              <img src="/facebook.svg" alt="Facebook icon" /> */}
            <Twitter />
            <Facebook fillColor='#ffffff' hoverColor='#F38016' />
          </div>
        </div>
        <div className="bg-slightly-lighter-dark-blue rounded-xl border border-slate-500 mt-10 px-5 py-10 grid lg:grid-cols-2 gap-5">
          <div className="lg:self-center">
            <h2 className="text-white font-heading font-bold text-xl lg:text-3xl">Sign up for the newsletter</h2>
            <p className="font-body text-body-white lg:text-lg mt-2 lg:mt-4">Receive interesting tips and articles in real time. You can unsubscribe at any time.</p>
          </div>
          <div>
            <fetcher.Form method="post">
              <fieldset className="grid gap-3">
                <div>
                  <label htmlFor="subscribe" className="text-body-white">
                    Email
                    {(fetcher.data?.fieldErrors && fetcher.data?.field)
                      ? (<span className="text-red-500 ml-2">{actionData?.fieldErrors?.email}</span>)
                      : <>&nbsp;</>
                    }
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="subscribe"
                    className="w-full bg-transparent border border-brand-orange rounded-lg p-2 text-body-white"
                  />
                </div>
                <button
                  type="submit"
                  name="_action"
                  value="subscribe"
                  className="bg-brand-orange w-full py-2 px-auto rounded-lg font-bold lg:text-lg">
                  {(fetcher.submission && fetcher.submission.formData.get('_action') === 'subscribe')
                    ? 'Subscribing...'
                    : 'Subscribe'
                  }
                </button>
              </fieldset>
            </fetcher.Form>
          </div>
        </div>
      </div>
      <div className="w-full bg-[#533D55] text-body-white font-body flex justify-center mt-10 py-3">
        Copyright &copy; {new Date().getFullYear()}
      </div>
    </footer>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <div className="text-white w-full h-screen grid place-items-center">
      <div className="w-4/5 mx-auto">
        <h1 className="font-bold font-heading text-3xl lg:text-5xl">Error {caught.status}</h1>
        <code>{JSON.stringify(caught.data, null, 2)}</code>
        <Link to="/" className="underline text-blue-500 hover:text-blue-300 flex gap-2">
          <ArrowLeftIcon />  Back to home
        </Link>
      </div>
    </div>
  )
}