import React, { useState } from 'react';
import { PageProps } from '../types';
import { Phone, MessageSquare, Video, Mail, Camera, Globe, Send, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// ... (keep all the simulator components and interfaces the same)

const LearnPage: React.FC<PageProps> = ({ setPage }) => {
  const { t } = useTranslation();
  const [progress, setProgress] = useState<Record<string, LessonProgress>>({});
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);

  // ... (keep all the lesson logic the same)

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-retro-primary">
        {t('learn.title')}
      </h2>
      
      {!activeLessonId ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {lessons.map((lesson) => {
            const lessonProgress = progress[lesson.id];
            return (
              <div key={lesson.id} className="bg-retro-light rounded-xl border-2 border-retro-primary p-6 shadow-retro">
                <div className="flex items-center mb-4">
                  <lesson.icon className="w-8 h-8 text-retro-primary mr-3" />
                  <h3 className="text-xl font-semibold text-retro-primary">
                    {t(`learn.lessons.${lesson.id}.title`)}
                  </h3>
                </div>
                <div className="mb-4">
                  {lessonProgress && (
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-retro-primary h-2.5 rounded-full"
                        style={{ width: `${(lessonProgress.currentStep / lessonProgress.totalSteps) * 100}%` }}
                      />
                    </div>
                  )}
                </div>
                <button
                  onClick={() => startLesson(lesson.id)}
                  className="w-full bg-retro-primary text-white px-4 py-2 rounded-lg hover:bg-retro-accent transition-colors"
                >
                  {lessonProgress?.completed ? t('learn.buttons.review') : t('learn.buttons.start')}
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <button
            onClick={() => setActiveLessonId(null)}
            className="mb-4 text-retro-primary hover:text-retro-accent"
          >
            ← {t('learn.backToLessons')}
          </button>
          
          {activeLesson && (
            <div>
              <h3 className="text-2xl font-bold mb-6">
                {t(`learn.lessons.${activeLesson.id}.title`)}
              </h3>
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-semibold">
                    {t('learn.step')} {progress[activeLessonId].currentStep + 1}: {
                      t(`learn.lessons.${activeLesson.id}.steps.${progress[activeLessonId].currentStep + 1}.title`)
                    }
                  </h4>
                  <span className="text-sm text-gray-500">
                    {t('learn.step')} {progress[activeLessonId].currentStep + 1} {t('learn.of')} {activeLesson.steps.length}
                  </span>
                </div>
                <p className="text-lg mb-6">
                  {t(`learn.lessons.${activeLesson.id}.steps.${progress[activeLessonId].currentStep + 1}.content`)}
                </p>
                {activeLesson.steps[progress[activeLessonId].currentStep].simulation && (
                  <div className="mb-6">
                    {activeLesson.steps[progress[activeLessonId].currentStep].simulation}
                  </div>
                )}
                <button
                  onClick={() => nextStep(activeLessonId)}
                  className="bg-retro-primary text-white px-6 py-2 rounded-lg hover:bg-retro-accent transition-colors"
                >
                  {progress[activeLessonId].currentStep === activeLesson.steps.length - 1 
                    ? t('learn.buttons.complete') 
                    : t('learn.buttons.next')
                  }
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LearnPage;