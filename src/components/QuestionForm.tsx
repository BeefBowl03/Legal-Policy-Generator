import React, { useState, useEffect, useRef } from 'react';
import { Question } from '../types';

interface QuestionFormProps {
  question: Question;
  value: any;
  onAnswer: (questionId: number, answer: any) => void;
  onBack: () => void;
  onSkip: () => void;
  canGoBack: boolean;
  canSkip: boolean;
  isLastQuestion: boolean;
  onComplete: () => void;
  domain?: string; // For dynamic URL placeholders
  isEditing?: boolean; // Whether this is editing mode from review page
  onFinishEditing?: () => void; // Callback when editing is finished
  showSkipButton?: boolean; // Whether to show the skip button
}

const QuestionForm: React.FC<QuestionFormProps> = ({
  question,
  value,
  onAnswer,
  onBack,
  onSkip,
  canGoBack,
  canSkip,
  isLastQuestion,
  onComplete,
  domain,
  isEditing = false,
  onFinishEditing,
  showSkipButton = true
}) => {
  const [inputValue, setInputValue] = useState<any>(value || '');
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(null);

  useEffect(() => {
    // Set input value when question changes
    if (question.id) {
      setInputValue(value || '');
    }
  }, [question.id, value]);

  // Auto-focus the input field when question changes
  useEffect(() => {
    if (inputRef.current && question.type !== 'select') {
      // Small delay to ensure the component has rendered
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [question.id, question.type]);

  // Generate dynamic placeholder for URL fields
  const getPlaceholder = (): string => {
    if (question.type === 'url' && domain) {
      // Add https:// if not present
      const baseUrl = domain.startsWith('http') ? domain : `https://${domain}`;
      return `${baseUrl}/...`;
    }
    
    // Default placeholders
    switch (question.type) {
      case 'textarea':
        return 'Enter your answer...';
      case 'domain':
        return 'Enter domain (e.g., example.com)...';
      case 'email':
        return 'Enter email address...';
      case 'url':
        return 'Enter URL...';
      case 'number':
        return 'Enter number...';
      default:
        return 'Enter your answer...';
    }
  };



  // Validation functions
  const validateDomain = (domain: string): boolean => {
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/;
    return domainRegex.test(domain);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const getValidationError = (): string | null => {
    if (!inputValue || inputValue === '') return null;
    
    switch (question.type) {
      case 'domain':
        if (!validateDomain(inputValue)) {
          return 'Please enter a valid domain with extension (e.g., example.com, mydomain.net)';
        }
        break;
      case 'email':
        if (!validateEmail(inputValue)) {
          return 'Please enter a valid email address (e.g., user@domain.com)';
        }
        break;
    }
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = getValidationError();
    if (validationError) {
      return; // Don't submit if validation fails
    }
    
    // Allow submission if the field is not required OR if it has a value
    if (!question.required || (inputValue !== undefined && inputValue !== '')) {
      onAnswer(question.id, inputValue || '');
      // Clear the input after submitting
      setInputValue('');
      
      // If editing, go back to review page
      if (isEditing && onFinishEditing) {
        onFinishEditing();
      }
    }
  };

  const handleSkip = () => {
    if (canSkip) {
      onSkip();
    }
  };

  const handleComplete = () => {
    const validationError = getValidationError();
    if (validationError) {
      return; // Don't complete if validation fails
    }
    
    // Allow completion if the field is not required OR if it has a value
    if (!question.required || (inputValue !== undefined && inputValue !== '')) {
      onAnswer(question.id, inputValue || '');
      // Clear the input after completing
      setInputValue('');
      onComplete();
    }
  };

  const renderInput = () => {
    switch (question.type) {
      case 'textarea':
        return (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full px-4 py-3 border border-border-subtle rounded-lg shadow-subtle focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-background-elevated text-text-primary placeholder-text-muted transition-all duration-200"
            placeholder={getPlaceholder()}
            required={question.required}
            rows={4}
          />
        );
      
      case 'domain':
        return (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full px-4 py-3 border border-border-subtle rounded-lg shadow-subtle focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-background-elevated text-text-primary placeholder-text-muted transition-all duration-200"
            placeholder={getPlaceholder()}
            required={question.required}
          />
        );
      
      case 'email':
        return (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="email"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full px-4 py-3 border border-border-subtle rounded-lg shadow-subtle focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-background-elevated text-text-primary placeholder-text-muted transition-all duration-200"
            placeholder={getPlaceholder()}
            required={question.required}
          />
        );
      
      case 'url':
        return (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="url"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full px-4 py-3 border border-border-subtle rounded-lg shadow-subtle focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-background-elevated text-text-primary placeholder-text-muted transition-all duration-200"
            placeholder={getPlaceholder()}
            required={question.required}
          />
        );
      
      case 'number':
        return (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full px-4 py-3 border border-border-subtle rounded-lg shadow-subtle focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-background-elevated text-text-primary placeholder-text-muted transition-all duration-200"
            placeholder={getPlaceholder()}
            required={question.required}
          />
        );
      
      case 'select':
        return (
          <select
            ref={inputRef as React.RefObject<HTMLSelectElement>}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full px-4 py-3 border border-border-subtle rounded-lg shadow-subtle focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-background-elevated text-text-primary transition-all duration-200"
            required={question.required}
          >
            <option value="" className="bg-background-elevated text-text-primary">Select an option...</option>
            {question.options?.map((option, index) => (
              <option key={index} value={option} className="bg-background-elevated text-text-primary">
                {option}
              </option>
            ))}
          </select>
        );
      
      default:
        return (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full px-4 py-3 border border-border-subtle rounded-lg shadow-subtle focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-background-elevated text-text-primary placeholder-text-muted transition-all duration-200"
            placeholder={getPlaceholder()}
            required={question.required}
          />
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        {renderInput()}
        {getValidationError() && (
          <div className="mt-3 text-sm text-error-dark bg-error-light/10 border border-error-dark/30 rounded-lg px-4 py-3 backdrop-blur-sm">
            {getValidationError()}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex space-x-3">
          {canGoBack && (
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-3 text-base font-medium text-text-primary bg-background-elevated border border-border-elevated rounded-lg hover:bg-background-accent hover:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-background-primary transition-all duration-200"
            >
              {isEditing ? 'Cancel Edit' : 'Back'}
            </button>
          )}
          
          {canSkip && !isLastQuestion && showSkipButton && (
            <button
              type="button"
              onClick={handleSkip}
              className="px-6 py-3 text-base font-medium text-text-primary bg-background-elevated border border-border-elevated rounded-lg hover:bg-background-accent hover:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-background-primary transition-all duration-200"
            >
              Skip
            </button>
          )}
        </div>

        <div className="flex space-x-3">
          {isLastQuestion ? (
            <button
              type="button"
              onClick={handleComplete}
              disabled={question.required && (!inputValue || inputValue === '')}
              className="px-8 py-3 text-base font-medium text-black bg-gradient-to-r from-primary-500 to-primary-400 border border-transparent rounded-lg hover:from-primary-600 hover:to-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-background-primary disabled:opacity-50 disabled:cursor-not-allowed shadow-elevated hover:shadow-premium transition-all duration-200 transform hover:scale-105"
            >
              Complete
            </button>
          ) : (
            <button
              type="submit"
              disabled={question.required && (!inputValue || inputValue === '')}
              className="px-8 py-3 text-base font-medium text-black bg-gradient-to-r from-primary-500 to-primary-400 border border-transparent rounded-lg hover:from-primary-600 hover:to-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-background-primary disabled:opacity-50 disabled:cursor-not-allowed shadow-elevated hover:shadow-premium transition-all duration-200 transform hover:scale-105"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default QuestionForm; 