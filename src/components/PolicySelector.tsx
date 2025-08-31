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
    <div className="max-w-6xl mx-auto content-padding">

      {/* Final Instructions */}
      <div className="mb-10 bg-gradient-to-br from-info-light/20 to-info-light/10 border border-info-dark/30 rounded-2xl p-8 backdrop-blur-sm shadow-premium">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-info-dark mb-4">🎉 All Set!</h3>
          <p className="text-info-dark text-xl">Here's what to do next:</p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <ol className="space-y-6 text-left">
            <li className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-400 text-black rounded-full flex items-center justify-center text-lg font-bold shadow-lg">1</span>
              <div>
                <span className="font-medium text-info-dark text-lg">In Shopify admin, go to</span>
                <span className="text-info-dark text-lg"> <strong>Online Store → Pages</strong>.</span>
              </div>
            </li>
            
            <li className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-400 text-black rounded-full flex items-center justify-center text-lg font-bold shadow-lg">2</span>
              <div>
                <span className="font-medium text-info-dark text-lg">Click</span>
                <span className="text-info-dark text-lg"> <strong>Add page</strong>, name it after the policy (e.g. "Shipping Policy").</span>
              </div>
            </li>
            
            <li className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-400 text-black rounded-full flex items-center justify-center text-lg font-bold shadow-lg">3</span>
              <div>
                <span className="font-medium text-info-dark text-lg">Click the</span>
                <span className="text-info-dark text-lg"> <strong>&lt;&gt;</strong> (Show HTML) icon in the top‑right of the editor.</span>
              </div>
            </li>
            
            <li className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-400 text-black rounded-full flex items-center justify-center text-lg font-bold shadow-lg">4</span>
              <div>
                <span className="font-medium text-info-dark text-lg">Paste the generated HTML code into the HTML view.</span>
              </div>
            </li>
            
            <li className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-400 text-black rounded-full flex items-center justify-center text-lg font-bold shadow-lg">5</span>
              <div>
                <span className="font-medium text-info-dark text-lg">Click</span>
                <span className="text-info-dark text-lg"> <strong>&lt;&gt;</strong> again to return to normal view and confirm rendering.</span>
              </div>
            </li>
            
            <li className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-400 text-black rounded-full flex items-center justify-center text-lg font-bold shadow-lg">6</span>
              <div>
                <span className="font-medium text-info-dark text-lg">Click</span>
                <span className="text-info-dark text-lg"> <strong>Save</strong>.</span>
              </div>
            </li>
          </ol>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-info-dark text-base">
            💡 <strong>Tip:</strong> You can now copy the HTML code below and follow these steps to add your policy to Shopify!
          </p>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-4xl font-bold text-text-primary mb-6">Your Generated Policies</h2>
        <p className="text-text-secondary text-xl leading-relaxed">Review and copy the HTML code for each policy below.</p>
      </div>

      <div className="space-y-8">
        {policyTemplates.map((template) => {
          const generatedHTML = generatePolicyHTML(template.htmlTemplate, policyData);
          
          return (
            <div key={template.id} className="premium-card overflow-hidden">
              {/* Policy Header */}
              <div className="bg-gradient-to-r from-primary-600 to-primary-500 px-6 py-4">
                <h3 className="text-2xl font-bold text-black">{template.name}</h3>
                <p className="text-black/80 mt-1 font-medium">{template.description}</p>
              </div>
              
              {/* Policy Content */}
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium text-text-muted uppercase tracking-wide">HTML Code</span>
                  <button
                    onClick={() => handleCopyPolicy(template.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      copiedPolicy === template.id
                        ? 'bg-success-light/20 text-success-dark border border-success-dark/30'
                        : 'bg-background-elevated text-text-primary hover:bg-background-accent hover:border-primary-500 border border-border-elevated'
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
                <div className="bg-background-elevated border border-border-subtle rounded-lg p-4 max-h-96 overflow-y-auto">
                  <pre className="text-sm text-text-primary whitespace-pre-wrap break-words">
                    <code className="text-text-primary">{generatedHTML}</code>
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
          className="bg-background-elevated text-text-primary px-8 py-3 rounded-lg hover:bg-background-accent hover:border-primary-500 border border-border-elevated transition-all duration-200 font-medium"
        >
          ← Back to Review
        </button>
      </div>
    </div>
  );
};

export default PolicySelector; 