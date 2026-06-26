import { GraduationCap, Briefcase, Layers } from 'lucide-react';

export const CARDS = [
  {
    id: 'college',
    type: 'education',
    institution: 'Chandigarh Engineering College, Landran Mohali',
    degree: 'B.Tech',
    field: 'Information Technology',
    period: '( 2022-2026 )',
    meta: 'CGPA - 8.2',
    MetaIcon: GraduationCap,
    badge: null,
  },
  {
    id: 'thinknext',
    type: 'experience',
    duration: 'Experience - 2 Month',
    institution: 'ThinkNext Technology',
    badge: 'Learning - MERN',
    project: 'Build Project - Mentolink',
    ProjectIcon: Briefcase,
    description:
      'Mentolink is a platform which help to solve a problem or full-fill the gap between student and their carrier path',
  },
  {
    id: 'sheryians',
    type: 'experience',
    duration: 'Experience - 6 Month',
    institution: 'Sheryians coding school',
    badge: 'Learning - Full stack',
    items: [
      { Icon: Briefcase, text: 'Technology - MERN , DOCKER, AWS, Kubernetes' },
      { Icon: Briefcase, text: 'Build Project - Multiple Project' },
      { Icon: Layers,    text: 'INSTAGRAM , Pinterest, GEN_AI' },
    ],
  },
];
