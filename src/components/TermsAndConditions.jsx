import React from 'react';

const TermsAndConditions = () => (
  <div className="max-w-2xl mx-auto p-6 bg-[var(--color-sdc-dark)] text-gray-200 rounded-lg shadow-lg my-10">
    <h1 className="text-3xl font-bold mb-4 sdc-text-gradient">Terms and Conditions</h1>
    <ol className="list-decimal pl-6 space-y-3 text-lg">
      <li>
        <strong>Final Decision:</strong> The final decision regarding membership, participation, and event outcomes lies solely in the hands of the Software Development Club leads. Their decisions are binding and non-negotiable.
      </li>
      <li>
        <strong>Code of Conduct:</strong> All members are expected to maintain respectful and professional behavior towards peers, mentors, and guests at all times. Any form of harassment or discrimination will result in immediate action.
      </li>
      <li>
        <strong>Academic Integrity:</strong> Members must not engage in plagiarism or submit work that is not their own during club activities, competitions, or events.
      </li>
      <li>
        <strong>Participation:</strong> Regular participation in club meetings, events, and activities is encouraged. Absenteeism without valid reason may affect your membership status.
      </li>
      <li>
        <strong>Use of Club Resources:</strong> Club resources (including software, hardware, and workspace) must be used responsibly and only for club-related activities.
      </li>
      <li>
        <strong>Privacy:</strong> Members must respect the privacy and confidentiality of other members’ personal information and project work.
      </li>
      <li>
        <strong>Amendments:</strong> The club leads reserve the right to amend these terms and conditions at any time. Members will be notified of any changes.
      </li>
    </ol>
    <p className="mt-6 text-sm text-gray-400">By registering, you agree to abide by these terms and conditions as a member of the Software Development Club.</p>
  </div>
);

export default TermsAndConditions; 