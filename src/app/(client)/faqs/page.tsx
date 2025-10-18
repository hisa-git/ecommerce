// app/faq/page.tsx
"use client";

import React from "react";
import { Container } from "@/components/Container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQPage() {
  const faqs = [
    {
      question: "What is your return policy?",
      answer:
        "We accept returns within 30 days of purchase. Items must be in their original condition and packaging. Please contact support before sending anything back.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary depending on your location and selected carrier.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order is shipped, you will receive an email with a tracking link. You can also check the status anytime in your account’s order section.",
    },
    {
      question: "Can I change or cancel my order?",
      answer:
        "If your order hasn’t been processed yet, you can contact our support team to modify or cancel it. Once shipped, it can no longer be changed.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept Visa, MasterCard, PayPal, Apple Pay, and major debit cards. All payments are processed securely via encrypted channels.",
    },
  ];

  return (
    <Container className="p-10 px-4 min-h-[550px]">
      <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
        Frequently Asked Questions
      </h2>

      <div type="single" collapsible className="max-w-2xl mx-auto">
        <Accordion type="single" collapsible className="w-full space-y-2">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border rounded-xl bg-white shadow-sm"
            >
              <AccordionTrigger className="text-lg font-semibold text-slate-800 px-4 py-3 hover:text-shop_light_green">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 px-4 pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Container>
  );
}
