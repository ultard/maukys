export type Status = 'not-started' | 'in-progress' | 'completed';

export interface Technology {
  id: number;
  title: string;
  description: string;
  status: Status;
  notes: string;
  category: 'frontend' | 'backend' | 'other';
}
