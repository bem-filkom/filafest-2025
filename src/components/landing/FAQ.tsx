import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function FAQSection() {
  const faqs = [
    {
      question: "Siapa yang bisa berpartisipasi dalam FILAFEST?",
      answer: "FILAFEST terbuka untuk seluruh mahasiswa aktif Fakultas Ilmu Komputer. Untuk voting, diperlukan email akademik yang valid sebagai verifikasi.",
    },
    {
      question: "Bagaimana proses nominasi dilakukan?",
      answer: "Nominasi dapat diajukan oleh dosen, mahasiswa, atau organisasi kemahasiswaan. Setiap nominasi akan melalui proses seleksi oleh tim juri yang kompeten.",
    },
    {
      question: "Kapan periode voting dibuka?",
      answer: "Periode voting biasanya dibuka 2 minggu sebelum acara puncak FILAFEST. Pengumuman akan disampaikan melalui website resmi dan media sosial.",
    },
    {
      question: "Apa saja kategori penghargaan yang tersedia?",
      answer: "Terdapat berbagai kategori seperti Mahasiswa Berprestasi, Inovasi Teknologi Terbaik, Penelitian Terbaik, Kontribusi Sosial, dan masih banyak lagi.",
    },
    {
      question: "Bagaimana jika saya lupa password akun voting?",
      answer: "Anda dapat menggunakan fitur 'Lupa Password' di halaman login atau menghubungi panitia melalui email resmi FILAFEST.",
    },
    {
      question: "Apakah ada batasan jumlah suara per orang?",
      answer: "Setiap akun hanya dapat memberikan satu suara per kategori. Sistem akan otomatis mencegah voting ganda.",
    },
  ];

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Pertanyaan yang Sering Diajukan</h2>
          <p className="text-lg text-muted-foreground">Temukan jawaban untuk pertanyaan umum seputar FILAFEST</p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-card border border-border rounded-lg px-6 data-[state=open]:border-primary/50">
              <AccordionTrigger className="text-left text-card-foreground hover:text-primary transition-colors duration-200 py-6">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-6">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
