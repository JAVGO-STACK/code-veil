import { Contact } from "@/components/Contact";
import { Container } from "@/components/Container";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Contact | Code Veil",
  description:
    "Code Veil is a developer, writer and speaker. He is a digital nomad and travels around the world while working remotely.",
};

export default function Projects() {
  return (
    <Container>
      <Contact />
    </Container>
  );
}
