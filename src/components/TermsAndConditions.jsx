import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-[var(--color-sdc-dark)] relative overflow-hidden">
      {/* Background */}
      <div className="geometric-background">
        <div className="geometric-gradient"></div>
        <div className="concentric-circles">
          <div className="concentric-circle concentric-circle-1"></div>
          <div className="concentric-circle concentric-circle-2"></div>
          <div className="concentric-circle concentric-circle-3"></div>
        </div>
        <div className="solid-circle solid-circle-1"></div>
        <div className="solid-circle solid-circle-2"></div>
        <div className="solid-circle solid-circle-3"></div>
        <div className="patterned-circle patterned-circle-1"></div>
        <div className="patterned-circle patterned-circle-2"></div>
        <div className="abstract-polygon polygon-1"></div>
        <div className="abstract-polygon polygon-2"></div>
        <div className="abstract-polygon polygon-3"></div>
        <div className="abstract-polygon polygon-4"></div>
        <div className="geometric-dot dot-1"></div>
        <div className="geometric-dot dot-2"></div>
        <div className="geometric-dot dot-3"></div>
        <div className="geometric-dot dot-4"></div>
        <div className="geometric-dot dot-5"></div>
        <div className="geometric-dot dot-6"></div>
        <div className="geometric-dot dot-7"></div>
        <div className="geometric-dot dot-8"></div>
        <div className="geometric-dot dot-9"></div>
        <div className="geometric-dot dot-10"></div>
        <div className="geometric-line line-1"></div>
        <div className="geometric-line line-2"></div>
        <div className="geometric-line line-3"></div>
        <div className="geometric-line line-4"></div>
      </div>

      {/* Navigation */}
      <div className="relative z-10 p-6">
        <Link to="/">
          <Button variant="ghost" className="text-gray-300 hover:text-white mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <div className="max-w-4xl w-full bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl shadow-2xl p-8">
          <h1 className="text-4xl font-bold mb-8 sdc-text-gradient text-center">Terms and Conditions</h1>
          
          <div className="space-y-6 text-gray-200">
            <div className="bg-white/5 rounded-lg p-6 border border-white/10">
              <ol className="list-decimal pl-6 space-y-4 text-lg">
                <li className="space-y-2">
                  <strong className="text-purple-400">Final Decision:</strong>
                  <p>The final decision regarding membership, participation, and event outcomes lies solely in the hands of the Software Development Club leads. Their decisions are binding and non-negotiable.</p>
                </li>
                
                <li className="space-y-2">
                  <strong className="text-purple-400">Code of Conduct:</strong>
                  <p>All members are expected to maintain respectful and professional behavior towards peers, mentors, and guests at all times. Any form of harassment or discrimination will result in immediate action.</p>
                </li>
                
                <li className="space-y-2">
                  <strong className="text-purple-400">Academic Integrity:</strong>
                  <p>Members must not engage in plagiarism or submit work that is not their own during club activities, competitions, or events.</p>
                </li>
                
                <li className="space-y-2">
                  <strong className="text-purple-400">Participation:</strong>
                  <p>Regular participation in club meetings, events, and activities is encouraged. Absenteeism without valid reason may affect your membership status.</p>
                </li>
                
                <li className="space-y-2">
                  <strong className="text-purple-400">Use of Club Resources:</strong>
                  <p>Club resources (including software, hardware, and workspace) must be used responsibly and only for club-related activities.</p>
                </li>
                
                <li className="space-y-2">
                  <strong className="text-purple-400">Privacy:</strong>
                  <p>Members must respect the privacy and confidentiality of other members' personal information and project work.</p>
                </li>
                
                <li className="space-y-2">
                  <strong className="text-purple-400">Amendments:</strong>
                  <p>The club leads reserve the right to amend these terms and conditions at any time. Members will be notified of any changes.</p>
                </li>
              </ol>
            </div>
            
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-6">
              <p className="text-center text-lg text-purple-300 font-medium">
                By registering, you agree to abide by these terms and conditions as a member of the Software Development Club.
              </p>
            </div>
            
            <div className="text-center text-sm text-gray-400 mt-8">
              <p>Last updated: August 2025</p>
              <p>Software Development Club - MVJCE</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions; 