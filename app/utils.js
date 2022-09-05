import { useMatches } from "@remix-run/react";
import { json } from "@remix-run/node";
import { useMemo } from "react";

const DEFAULT_REDIRECT = "/";

/**
 * This should be used any time the redirect path is user-provided
 * (Like the query string on our login/signup pages). This avoids
 * open-redirect vulnerabilities.
 * @param {string} to The redirect destination
 * @param {string} defaultRedirect The redirect to use if the to is unsafe.
 */
export function safeRedirect(to, defaultRedirect = DEFAULT_REDIRECT) {
  if (!to || typeof to !== "string") {
    return defaultRedirect;
  }

  if (!to.startsWith("/") || to.startsWith("//")) {
    return defaultRedirect;
  }

  return to;
}

/**
 * This base hook is used in other hooks to quickly search for specific data
 * across all loader data using useMatches.
 * @param {string} id The route id
 * @returns {JSON|undefined} The router data or undefined if not found
 */
export function useMatchesData(id) {
  const matchingRoutes = useMatches();
  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id]
  );

  return route?.data;
}

function isUser(user) {
  return user && typeof user === "object" && typeof user.email === "string";
}

export function useOptionalUser() {
  const data = useMatchesData("root");
  if (!data || !isUser(data.user)) {
    return undefined;
  }
  return data.user;
}

export function useUser() {
  const maybeUser = useOptionalUser();
  if (!maybeUser) {
    throw new Error(
      "No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead."
    );
  }
  return maybeUser;
}

export function validateLoginEmail(email) {
  return typeof email === "string" && email.length > 3 && email.includes("@");
}

export function validateEmail(email) {
  if (!email) {
    return 'Email cannot be empty';
  } else if ((typeof email === "string" && email.length > 3 && email.includes("@")) !== true) {
    return 'Invalid email';
  }
}

export function validateName(name) {
  if (!name) {
    return 'Name cannot be empty';
  } else if (typeof name !== "string") {
    return 'Name must be a string';
  } else if (name.length < 2) {
    return 'Name must be at least two characters long';
  }
}

export function validateMessage(message) {
  if (!message) {
    return 'Message cannot be empty';
  } else if (typeof message !== "string") {
    return 'Message must be a string';
  }
}

export function badRequest(data) {
  return json(data, { status: 400 });
}

export async function createContact(email) {
  const Mailjet = require('node-mailjet');
  const mailjet = Mailjet.apiConnect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);

  let res = null;
  try {
    res = await mailjet
      .post("contact", { 'version': 'v3' })
      .request({
        "IsExcludedFromCampaigns": "true",
        "Email": `${email}`
      });
    console.log('New contact: ', res.body);
  } catch (err) {
    throw new Response(err, { status: err.statusCode })
  }
  return res.body;
}

export async function addContactToList(contactEmail) {
  const Mailjet = require('node-mailjet');
  const mailjet = Mailjet.apiConnect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);

  try {
    const res = await mailjet
      .post("listrecipient", { 'version': 'v3' })
      .request({
        "IsUnsubscribed": "false",
        // "ContactID": "478938490",
        "ContactAlt": `${contactEmail}`,
        "ListID": "47814",
        // "ListAlt": "abcdef123"
      });
    console.log('New subscriber: ', res.body);
  } catch (err) {
    throw new Response(err, { status: err.statusCode });
  }
}

export async function sendEmail({ name, email, message }) {
  const Mailjet = require('node-mailjet');
  const mailjet = Mailjet.apiConnect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);

  try {
    const res = await mailjet
      .post("send", { 'version': 'v3' })
      .request({
        "FromEmail": "brayomwas95@gmail.com",
        "FromName": "thedevbrian Website",
        "Recipients": [
          {
            "Email": "mwangib041@gmail.com",
            "Name": "Brian Mwangi"
          }
        ],
        "Subject": "Test email",
        "Text-part": "This is the text part of this email",
        "Html-part": `
          <h3>Message from website</h3>
          <p>${message}</p>
          <p>Here are my contact details: </p>
          <p>Name: ${name} </p>
          <p>Email: ${email} </p>
          `
      });
    console.log('Email response: ', res.body);
  } catch (err) {
    throw new Response(err, { status: err.statusCode })
  }

}