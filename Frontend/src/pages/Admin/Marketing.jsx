import React from "react";

function Marketing() {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Marketing Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Campaigns Section */}
        <div className="p-4 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Campaigns</h3>
          <ul className="list-disc pl-4">
            <li>Spring Sale - Active</li>
            <li>Black Friday - Scheduled</li>
            <li>New Arrivals Promo - Draft</li>
          </ul>
        </div>

        {/* Email Statistics */}
        <div className="p-4 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Email Marketing</h3>
          <p>Sent: <strong>5,000</strong></p>
          <p>Opened: <strong>3,200 (64%)</strong></p>
          <p>Clicked: <strong>1,100 (22%)</strong></p>
        </div>

        {/* Social Media Reach */}
        <div className="p-4 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Social Media Reach</h3>
          <p>Facebook: <strong>12K</strong></p>
          <p>Instagram: <strong>15K</strong></p>
          <p>Twitter: <strong>8K</strong></p>
        </div>
      </div>
    </div>
  );
}

export default Marketing;
