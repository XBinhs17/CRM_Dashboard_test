export interface TargetItem{
  position: string;
  name: string;
  description: string;
  avatars: string[];
  status: 'Yet To Start' | 'In Progress' | 'Completed';
  file: number,
  message: number
}
