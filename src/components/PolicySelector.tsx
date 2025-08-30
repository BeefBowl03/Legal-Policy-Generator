import { useState } from 'react';
import { PolicyData } from '../types';
import { policyTemplates, generatePolicyHTML } from '../data/policyTemplates';

interface PolicySelectorProps {
  policyData: PolicyData;
  onBack: () => void;
}

const PolicySelector: React.FC<PolicySelectorProps> = ({ policyData, onBack }) => {
  const [copiedPolicy, setCopiedPolicy] = useState<string | null>(null);

  const handleCopyPolicy = async (policyId: string) => {
    const template = policyTemplates.find(t => t.id === policyId);
    if (!template) return;

    const generatedHTML = generatePolicyHTML(template.htmlTemplate, policyData);
    
    try {
      await navigator.clipboard.writeText(generatedHTML);
      setCopiedPolicy(policyId);
      setTimeout(() => setCopiedPolicy(null), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy policy:', err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">


      {/* Final Instructions */}
      <div className="mb-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-blue-900 mb-2">🎉 All Set!</h3>
          <p className="text-blue-700 text-lg">Here's what to do next:</p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <ol className="space-y-4 text-left">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
              <div>
                <span className="font-medium text-blue-900">In Shopify admin, go to</span>
                <span className="text-blue-700"> <strong>Online Store → Pages</strong>.</span>
              </div>
            </li>
            
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
              <div>
                <span className="font-medium text-blue-900">Click</span>
                <span className="text-blue-700"> <strong>Add page</strong>, name it after the policy (e.g. "Shipping Policy").</span>
              </div>
            </li>
            
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
              <div>
                <span className="font-medium text-blue-900">Click the</span>
                <span className="text-blue-700"> <strong>&lt;&gt;</strong> (Show HTML) icon in the top‑right of the editor.</span>
              </div>
            </li>
            
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
              <div>
                <span className="font-medium text-blue-900">Paste the generated HTML code into the HTML view.</span>
              </div>
            </li>
            
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
              <div>
                <span className="font-medium text-blue-900">Click</span>
                <span className="text-blue-700"> <strong>&lt;&gt;</strong> again to return to normal view and confirm rendering.</span>
              </div>
            </li>
            
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">6</span>
              <div>
                <span className="font-medium text-blue-900">Click</span>
                <span className="text-blue-700"> <strong>Save</strong>.</span>
              </div>
            </li>
          </ol>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-blue-600 text-sm">
            💡 <strong>Tip:</strong> You can now copy the HTML code below and follow these steps to add your policy to Shopify!
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Generated Policies</h2>
        <p className="text-gray-600 text-lg">Review and copy the HTML code for each policy below.</p>
      </div>

      <div className="space-y-8">
        {policyTemplates.map((template) => {
          const generatedHTML = generatePolicyHTML(template.htmlTemplate, policyData);
          
          return (
            <div key={template.id} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              {/* Policy Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                <h3 className="text-2xl font-bold text-white">{template.name}</h3>
                <p className="text-blue-100 mt-1">{template.description}</p>
              </div>
              
              {/* Policy Content */}
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">HTML Code</span>
                  <button
                    onClick={() => handleCopyPolicy(template.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      copiedPolicy === template.id
                        ? 'bg-green-100 text-green-700 border border-green-200'
                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-200'
                    }`}
                  >
                    {copiedPolicy === template.id ? (
                      <>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                          <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                        </svg>
                        Copy Code
                      </>
                    )}
                  </button>
                </div>
                
                {/* HTML Code Display */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-96 overflow-y-auto">
                  <pre className="text-sm text-gray-800 whitespace-pre-wrap break-words">
                    <code>{generatedHTML}</code>
                  </pre>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={onBack}
          className="bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium"
        >
          ← Back to Review
        </button>
      </div>
    </div>
  );
};

export default PolicySelector; 