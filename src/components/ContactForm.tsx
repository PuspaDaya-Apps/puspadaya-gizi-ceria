import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from "sonner";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    // Inisialisasi EmailJS saat komponen dimuat
    const userId = import.meta.env.VITE_EMAILJS_USER_ID;
    if (userId) {
      emailjs.init(userId);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const userId = import.meta.env.VITE_EMAILJS_USER_ID;

      if (!serviceId || !templateId || !userId) {
        throw new Error("Variabel lingkungan tidak tersedia.");
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          to_email: 'puspadayaofficial@gmail.com',
          subject: `Pesan dari ${formData.name}`,
          message: formData.message,
          name: formData.name,
          email: formData.email
        },
        userId
      );

      toast.success("Pesan terkirim! Kami akan menghubungi Anda segera.");
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error("Gagal mengirim pesan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          type="text"
          name="name"
          placeholder="Nama Lengkap"
          value={formData.name}
          onChange={handleChange}
          className="input input-bordered bg-white w-full"
          required
        />
      </div>
      
      <div>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="input input-bordered bg-white w-full"
          required
        />
      </div>
      
      <div>
        <Textarea
          name="message"
          placeholder="Pesan Anda"
          value={formData.message}
          onChange={handleChange}
          className="textarea textarea-bordered bg-white w-full h-32"
          required
        />
      </div>
      
      <Button className="btn btn-primary w-full" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
      </Button>
    </form>
  );
};

export default ContactForm;