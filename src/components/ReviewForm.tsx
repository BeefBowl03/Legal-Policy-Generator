
import { PolicyData } from '../types';
import { questions } from '../data/questions';

interface ReviewFormProps {
  formData: Partial<PolicyData>;
  onBack: () => void;
  onComplete: () => void;
  onEditQuestion: (questionId: number) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ formData, onBack, onComplete, onEditQuestion }) => {
  const groupedQuestions = questions.reduce((acc, question) => {
    if (!acc[question.group]) {
      acc[question.group] = [];
    }
    acc[question.group].push(question);
    return acc;
  }, {} as Record<string, typeof questions>);

  const getDisplayValue = (field: keyof PolicyData, value: any): string => {
    if (value === undefined || value === null || value === '') {
      return 'Not provided';
    }
    
    // Handle special cases
    if (field === 'sellingRegions' && value === formData.shipToCountries) {
      return `${value} (same as shipping countries)`;
    }
    
    return String(value);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Review Your Information
        </h2>
        <p className="text-lg text-gray-600">
          Please review all your answers before proceeding to generate policies.
        </p>
      </div>

      <div className="space-y-8">
        {Object.entries(groupedQuestions).map(([groupName, groupQuestions]) => (
          <div key={groupName} className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">{groupName}</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {groupQuestions.map((question) => (
                <div key={question.id} className="px-6 py-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 mb-1">
                        {question.question}
                      </h4>
                      <p className="text-sm text-gray-500 mb-2">
                        {question.guidance}
                      </p>
                      <div className="text-sm text-gray-700">
                        <span className="font-medium">Answer: </span>
                        <button
                          onClick={() => onEditQuestion(question.id)}
                          className={`${
                            formData[question.field] ? 'text-green-700 hover:text-green-800' : 'text-red-600 hover:text-red-700'
                          } underline cursor-pointer hover:bg-gray-100 px-2 py-1 rounded transition-colors`}
                          title="Click to edit this answer"
                        >
                          {getDisplayValue(question.field, formData[question.field])}
                        </button>
                      </div>
                    </div>
                    <div className="mt-2 sm:mt-0 sm:ml-4">
                      {question.required && !formData[question.field] && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Required
                        </span>
                      )}
                      {formData[question.field] && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          ✓ Answered
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-6">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          ← Back to Questions
        </button>

        <button
          type="button"
          onClick={onComplete}
          className="px-8 py-3 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Continue to Policies →
        </button>
      </div>
    </div>
  );
};

export default ReviewForm; 