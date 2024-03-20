import React from "react";
import type { NextPage } from "next";
import ContactPageTemplate from "@/components/templates/ContactPageTemplate";

export const metadata = {
  title: `Contact | The Ancient Path`,
  description: `Send a message to Jason Henderson.`,
  openGraph: {
    title: `Contact | The Ancient Path`,
    description: `Send a message to Jason Henderson.`,
  },
};

const Contact: NextPage = () => <ContactPageTemplate language="en" />;

export default Contact;
