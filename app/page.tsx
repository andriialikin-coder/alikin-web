import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Cases from '@/components/Cases';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Cases />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
