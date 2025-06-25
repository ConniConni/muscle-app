// training_recordsテーブルに関連する処理に使用するベース型
// 他のトレーニング記録関連の型の拡張元として利用する
export interface BaseTrainingRecord {
  id: number;
  date: string;
  weight: number;
  count: number;
}

// トレーニング記録を表示する際に利用する型
export type TrainingRecordWithName = BaseTrainingRecord & {
  name: string;
};

// 種目名のプルダウンを表示する際に利用する型
export type TrainingRecordWithExerciseId = BaseTrainingRecord & {
  target_id: number;
  exercise_id: number;
};
