export interface BaseTrainingRecord {
  id: number;
  date: Date;
  weight: number;
  count: number;
}

export type TrainingRecordWithName = BaseTrainingRecord & {
  name: string;
};

export type TrainingRecordWithExerciseId = BaseTrainingRecord & {
  exercise_id: number;
};
