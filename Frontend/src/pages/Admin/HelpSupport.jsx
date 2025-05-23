import React from "react";

function HelpSupport() {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Help & Support</h2>

      <div className="space-y-4">
        <div className="p-4 border rounded-lg">
          <h3 className="text-lg font-semibold">📞 Contact Support</h3>
          <p>Email: support@techsphere.com</p>
          <p>Phone: +977 9800000000</p>
        </div>

        <div className="p-4 border rounded-lg">
          <h3 className="text-lg font-semibold">❓ Frequently Asked Questions</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>How do I reset my password?</li>
            <li>How can I track my order?</li>
            <li>How do I request a refund?</li>
          </ul>
        </div>

        <div className="p-4 border rounded-lg">
          <h3 className="text-lg font-semibold">💬 Live Chat</h3>
          <p>Available from 9 AM - 6 PM (NST)</p>
          <button className="px-4 py-2 bg-blue-500 text-white rounded mt-2">
            Start Chat
          </button>
        </div>
      </div>
    </div>
  );
}

export default HelpSupport;

