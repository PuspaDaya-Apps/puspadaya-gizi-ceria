
import React, { useState } from 'react';
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Pesan terkirim! Kami akan menghubungi Anda segera.");
    setFormData({ name: '', email: '', message: '' });
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
      
      <Button className="btn btn-primary w-full" type="submit">
        Kirim Pesan
      </Button>
    </form>
  );
};

export default ContactForm;
