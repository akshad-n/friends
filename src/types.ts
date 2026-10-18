export type PartnerRole = 'her' | 'him';

export interface PartnerProfile {
  id: string;
  role: PartnerRole;
  name: string;
  nickname: string;
  avatar: string;
  favoriteFlower?: string;
}

export interface CoupleSpace {
  id: string;
  code: string;
  herName: string;
  himName: string;
  anniversaryDate: string;
  createdAt: string;
}

export type MoodType = 
  | 'Romantic'
  | 'Lovely'
  | 'Happy'
  | 'Sad'
  | 'Missing You'
  | 'Peaceful'
  | 'Energetic'
  | 'Late Night Thoughts'
  | 'Our Special Song';

export interface Song {
  id: string;
  coupleId: string;
  ownerRole: PartnerRole;
  ownerName: string;
  title: string;
  artist: string;
  url: string;
  mood: MoodType;
  message?: string;
  createdAt: string;
}

export interface SongReply {
  id: string;
  songId: string;
  coupleId: string;
  authorRole: PartnerRole;
  authorName: string;
  content: string;
  createdAt: string;
}

export interface DatePlan {
  preferredDate: string;
  preferredTime: string;
  place: string;
  food: string;
  note?: string;
  submittedAt: string;
}

export interface RomanticResponse {
  id: string;
  coupleId: string;
  partnerRole: PartnerRole;
  questionId: 'date' | 'precious_life' | 'memories';
  responseValue: 'YES' | 'NO';
  datePlan?: DatePlan;
  promiseSaved?: boolean;
  memoryIdeas?: string[];
  createdAt: string;
}

export type QuestionCategory =
  | 'About Us'
  | 'Our Future'
  | 'Memories'
  | 'Feelings'
  | 'Fun Questions'
  | 'Random Thoughts'
  | 'Anything on Your Mind';

export interface QuestionReply {
  id: string;
  questionId: string;
  replierRole: PartnerRole;
  replierName: string;
  replyText: string;
  answeredAt: string;
  updatedAt?: string;
  isRead: boolean;
}

export interface Question {
  id: string;
  coupleId: string;
  askerRole: PartnerRole;
  askerName: string;
  questionText: string;
  category: QuestionCategory;
  isAnonymous?: boolean;
  status: 'awaiting' | 'answered';
  createdAt: string;
  reply?: QuestionReply;
}

export type MemoryCategory = 'date' | 'promise' | 'song' | 'question' | 'milestone' | 'custom';

export interface MemoryItem {
  id: string;
  coupleId: string;
  authorRole: PartnerRole;
  authorName: string;
  title: string;
  description: string;
  category: MemoryCategory;
  date: string;
  icon?: string;
  relatedLink?: string;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  coupleId: string;
  recipientRole: PartnerRole | 'all';
  senderRole: PartnerRole;
  senderName: string;
  title: string;
  message: string;
  category: 'song' | 'reply' | 'date' | 'promise' | 'memory' | 'question' | 'answer';
  targetSection: string;
  isRead: boolean;
  createdAt: string;
}
