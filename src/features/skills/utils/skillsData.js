import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaNodeJs,
  FaReact,
  FaSass,
  FaDocker,
  FaAws,
  FaFigma,
} from 'react-icons/fa';
import {
  SiExpress,
  SiMongodb,
  SiKubernetes,
  SiGreensock,
  SiFramer,
  SiCanva,
} from 'react-icons/si';

export const SKILL_CARDS = [
  {
    id: 'basics',
    label: 'Basics Skills',
    skills: [
      { name: 'HTML', desc: 'Structure is the soul of creation.', icon: FaHtml5, color: '#FF5722' },
      { name: 'CSS', desc: 'Style turns logic into art.', icon: FaCss3Alt, color: '#2196F3' },
      { name: 'JavaScript', desc: 'Code that breathes life into ideas.', icon: FaJs, color: '#F7DF1E' },
    ],
    rotation: 0,
  },
  {
    id: 'mern',
    label: 'MERN',
    skills: [
      { name: 'Node.js', desc: 'Powering the unseen engine behind every experience.', icon: FaNodeJs, color: '#68A063' },
      { name: 'Express.js', desc: 'Simplicity that accelerates innovation.', icon: SiExpress, color: '#FFFFFF' },
      { name: 'React.js', desc: 'Dynamic minds build dynamic interfaces.', icon: FaReact, color: '#61DAFB' },
      { name: 'MongoDB', desc: 'Data with roots that grow possibilities.', icon: SiMongodb, color: '#13AA52' },
      { name: 'Sass', desc: 'Elegance in every layer of design.', icon: FaSass, color: '#CC6699' },
    ],
    rotation: -6,
  },
  {
    id: 'ecosystem',
    label: 'Developer Ecosystem Tools,\nAnimation',
    skills: [
      { name: 'Docker', desc: 'Containers that carry consistency.', icon: FaDocker, color: '#2496ED' },
      { name: 'AWS', desc: 'Cloud power that fuels innovation.', icon: FaAws, color: '#FF9900' },
      { name: 'Kubernetes', desc: 'Orchestration that scales imagination.', icon: SiKubernetes, color: '#326CE5' },
      { name: 'GSAP', desc: 'Performance meets precision in motion.', icon: SiGreensock, color: '#88CE02' },
      { name: 'Framer', desc: 'React components that breathe with life.', icon: SiFramer, color: '#0055FF' },
    ],
    rotation: 0,
  },
  {
    id: 'design',
    label: 'Design',
    skills: [
      { name: 'Figma', desc: 'Collaboration is the canvas of creativity.', icon: FaFigma, color: '#F24E1E' },
      { name: 'Canva', desc: 'Design made simple, impact made big.', icon: SiCanva, color: '#00D4FF' },
    ],
    rotation: 6,
  },
];
