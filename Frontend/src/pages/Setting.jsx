import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    email: "",
    address: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Settings:", formData);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Address</label>
          <Input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Phone</label>
          <Input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full mt-1"
          />
        </div>
        <Button type="submit" className="w-full">Update</Button>
      </form>
    </div>
  );
}
