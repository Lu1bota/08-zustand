"use client";

import { motion } from "framer-motion";
import { MdHome } from "react-icons/md";
import { useRouter } from "next/navigation";
import css from "./not-found.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Notehub",
  description:
    "Looks like you've reached a dead end. Let's get you back to your notes.",
  openGraph: {
    title: "404 — Notehub",
    description:
      "Looks like you've reached a dead end. Let's get you back to your notes.",
    url: "https://08-zustand-beta.vercel.app/404",
    images: [
      {
        url: "https://colorlib.com/wp/wp-content/uploads/sites/2/404-error-page-templates.jpg",
        width: 1200,
        height: 630,
        alt: "not found 404",
      },
    ],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "404 — Notehub",
    description:
      "Looks like you've reached a dead end. Let's get you back to your notes.",
    images: [
      {
        url: "https://colorlib.com/wp/wp-content/uploads/sites/2/404-error-page-templates.jpg",
        width: 1200,
        height: 630,
        alt: "notehub image",
      },
    ],
  },
};

export default function NotFoundPage() {
  const router = useRouter();
  function handleBack() {
    router.push("/");
  }
  return (
    <div className={css.wrapper}>
      <motion.h1
        initial={{ scale: 0.8, rotate: -10, opacity: 0 }}
        animate={{ scale: 1.2, rotate: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className={css.code}
      >
        404 - Page not found
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className={css.message}
      >
        Sorry, the page you are looking for does not exist.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <button className={css.button} onClick={handleBack}>
          <MdHome size={24} />
          Back home
        </button>
      </motion.div>
    </div>
  );
}
