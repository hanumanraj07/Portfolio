import appianAiCert from '~/assets/appian-ai-challenge-certificate.png';
import awsArchCert from '~/assets/aws-solutions-arch-certificate.png';
import codeClashCert from '~/assets/code-clash-certificate.png';
import cssBasicCert from '~/assets/css-basic-certificate.png';
import digitalSkillsCert from '~/assets/digital-skills-ai-certificate.jpg';
import digitalSkillsUxCert from '~/assets/digital-skills-ux-certificate.jpg';
import ethicalAiCert from '~/assets/ethical-ai-certificate.png';
import githubCopilotCert from '~/assets/github-copilot-certificate.png';
import htmlCert from '~/assets/html-certificate.png';
import introToCCert from '~/assets/intro-to-c-certificate.png';
import introToJsCert from '~/assets/intro-to-javascript-certificate.png';
import problemSolvingCert from '~/assets/problem-solving-basic-certificate.png';
import pulseQuestCert from '~/assets/pulse-quest-certificate.jpg';
import robotrixCert from '~/assets/robotrix-certificate.png';
import synaptixCert from '~/assets/synaptix-hack-certificate.png';
import appianAiThumb from '~/assets/certificates/appian-ai-challenge-certificate-thumb.jpg';
import awsArchThumb from '~/assets/certificates/aws-solutions-arch-certificate-thumb.jpg';
import codeClashThumb from '~/assets/certificates/code-clash-certificate-thumb.jpg';
import cssBasicThumb from '~/assets/certificates/css-basic-certificate-thumb.jpg';
import digitalSkillsThumb from '~/assets/certificates/digital-skills-ai-certificate-thumb.jpg';
import digitalSkillsUxThumb from '~/assets/certificates/digital-skills-ux-certificate-thumb.jpg';
import ethicalAiThumb from '~/assets/certificates/ethical-ai-certificate-thumb.jpg';
import githubCopilotThumb from '~/assets/certificates/github-copilot-certificate-thumb.jpg';
import htmlThumb from '~/assets/certificates/html-certificate-thumb.jpg';
import introToCThumb from '~/assets/certificates/intro-to-c-certificate-thumb.jpg';
import introToJsThumb from '~/assets/certificates/intro-to-javascript-certificate-thumb.jpg';
import problemSolvingThumb from '~/assets/certificates/problem-solving-basic-certificate-thumb.jpg';
import pulseQuestThumb from '~/assets/certificates/pulse-quest-certificate-thumb.jpg';
import robotrixThumb from '~/assets/certificates/robotrix-certificate-thumb.jpg';
import synaptixThumb from '~/assets/certificates/synaptix-hack-certificate-thumb.jpg';

export const certificateCategories = [
  { id: 'all', label: 'All' },
  { id: 'industry', label: 'Industry' },
  { id: 'hackathon', label: 'Hackathons' },
  { id: 'course', label: 'Courses' },
  { id: 'assessment', label: 'Skill tests' },
];

// Details (credential type, issue dates, IDs and verification links) are
// taken from what is printed on each certificate. Add a `verifyUrl` when an
// issuer provides one.
export const certificates = [
  {
    id: 'aws-solutions-architecture',
    title: 'Solutions Architecture Job Simulation',
    issuer: 'Forage',
    partner: 'AWS',
    credential: 'Certificate of Completion',
    issued: '2 Feb 2026',
    category: 'industry',
    topics: ['AWS', 'Scalable hosting architecture'],
    featured: true,
    image: awsArchCert,
    thumb: { src: awsArchThumb, width: 560, height: 396 },
    width: 1024,
    height: 725,
  },
  {
    id: 'github-copilot-fundamentals',
    title: 'GitHub Copilot Fundamentals',
    issuer: 'Simplilearn SkillUp',
    partner: 'Microsoft',
    credential: 'Declaration of Completion',
    issued: '25 Dec 2025',
    credentialId: '9638715',
    category: 'industry',
    topics: ['GitHub Copilot', 'AI pair programming'],
    featured: true,
    image: githubCopilotCert,
    thumb: { src: githubCopilotThumb, width: 560, height: 396 },
    width: 1024,
    height: 725,
  },
  {
    id: 'robotrix-2026',
    title: 'Robotrix 2026',
    issuer: 'Unstop',
    partner: 'NITK Surathkal',
    credential: 'Certificate of Participation',
    issued: 'Jan 2026',
    category: 'hackathon',
    topics: ['Team hackathon', 'FuelGuard'],
    featured: true,
    verifyUrl: 'https://unstop.com/certificate-preview/b15b61c7-637f-4cf4-a815-df2801a4ea35',
    image: robotrixCert,
    thumb: { src: robotrixThumb, width: 560, height: 396 },
    width: 1024,
    height: 724,
  },
  {
    id: 'synaptix-frontier-ai-hack',
    title: 'Synaptix Frontier AI Hack',
    issuer: 'Unstop',
    partner: 'Shaastra 2026 · IIT Madras',
    credential: 'Certificate of Participation',
    issued: '2026',
    category: 'hackathon',
    topics: ['AI hackathon'],
    featured: true,
    verifyUrl: 'https://unstop.com/certificate-preview/824aa0f9-0403-4157-9954-93b69f97f5b4',
    image: synaptixCert,
    thumb: { src: synaptixThumb, width: 560, height: 395 },
    width: 1024,
    height: 723,
  },
  {
    id: 'appian-ai-application-challenge',
    title: 'Appian AI Application Challenge 2026',
    issuer: 'Unstop',
    partner: 'Shaastra 2026 · IIT Madras',
    credential: 'Certificate of Participation',
    issued: '2026',
    category: 'hackathon',
    topics: ['AI applications'],
    verifyUrl: 'https://unstop.com/certificate-preview/6ce621f3-bfbc-4b09-b23a-cdcae3a362f8',
    image: appianAiCert,
    thumb: { src: appianAiThumb, width: 560, height: 396 },
    width: 1024,
    height: 724,
  },
  {
    id: 'digital-skills-ai',
    title: 'Digital Skills: Artificial Intelligence',
    issuer: 'FutureLearn',
    partner: 'Accenture',
    credential: 'Certificate of Achievement',
    issued: '20 Dec 2025',
    category: 'industry',
    topics: ['Artificial intelligence', 'AI in the workplace'],
    image: digitalSkillsCert,
    thumb: { src: digitalSkillsThumb, width: 396, height: 560 },
    width: 725,
    height: 1024,
  },
  {
    id: 'digital-skills-ux',
    title: 'Digital Skills: User Experience',
    issuer: 'FutureLearn',
    partner: 'Accenture',
    credential: 'Certificate of Achievement',
    issued: '20 Dec 2025',
    category: 'industry',
    topics: ['User experience'],
    image: digitalSkillsUxCert,
    thumb: { src: digitalSkillsUxThumb, width: 397, height: 560 },
    width: 726,
    height: 1024,
  },
  {
    id: 'code-clash',
    title: 'Code Clash',
    issuer: 'Elan & nVision 2026',
    partner: 'IIT Hyderabad',
    credential: 'Certificate of Appreciation',
    issued: 'Jan 2026',
    category: 'hackathon',
    verifyUrl: 'https://unstop.com/certificate-preview/91b73372-79ca-48de-ba1f-a91df69ecdfc',
    image: codeClashCert,
    thumb: { src: codeClashThumb, width: 560, height: 395 },
    width: 1024,
    height: 723,
  },
  {
    id: 'pulse-quest',
    title: 'Pulse Quest',
    issuer: 'Elan & nVision 2026',
    partner: 'IIT Hyderabad',
    credential: 'Certificate of Appreciation',
    issued: 'Jan 2026',
    category: 'hackathon',
    verifyUrl: 'https://unstop.com/certificate-preview/6274ed2f-0fca-4c87-a90c-c61e7060f329',
    image: pulseQuestCert,
    thumb: { src: pulseQuestThumb, width: 560, height: 383 },
    width: 1024,
    height: 700,
  },
  {
    id: 'problem-solving-basic',
    title: 'Problem Solving (Basic)',
    issuer: 'HackerRank',
    credential: 'Certificate of Accomplishment',
    issued: '18 Dec 2025',
    credentialId: 'C635462D6617',
    category: 'assessment',
    topics: ['Algorithms', 'Data structures'],
    verifyUrl: 'https://www.hackerrank.com/certificates/c635462d6617',
    image: problemSolvingCert,
    thumb: { src: problemSolvingThumb, width: 560, height: 416 },
    width: 784,
    height: 583,
  },
  {
    id: 'css-basic',
    title: 'CSS (Basic)',
    issuer: 'HackerRank',
    credential: 'Certificate of Accomplishment',
    issued: '18 Dec 2025',
    credentialId: '294545EAB481',
    category: 'assessment',
    topics: ['CSS'],
    verifyUrl: 'https://www.hackerrank.com/certificates/294545eab481',
    image: cssBasicCert,
    thumb: { src: cssBasicThumb, width: 560, height: 416 },
    width: 784,
    height: 582,
  },
  {
    id: 'intro-to-javascript',
    title: 'Introduction to JavaScript',
    issuer: 'SoloLearn',
    credential: 'Course Certificate',
    issued: '21 Dec 2025',
    credentialId: 'CC-R1ZLUKWC',
    category: 'course',
    topics: ['JavaScript'],
    verifyUrl: 'https://www.sololearn.com/certificates/CC-R1ZLUKWC',
    image: introToJsCert,
    thumb: { src: introToJsThumb, width: 560, height: 395 },
    width: 1024,
    height: 722,
  },
  {
    id: 'ethical-ai-foundations',
    title: 'Ethical AI Foundations',
    issuer: 'SoloLearn',
    credential: 'Course Certificate',
    issued: '22 Dec 2025',
    credentialId: 'CC-KB3NEPUD',
    category: 'course',
    topics: ['Responsible AI'],
    verifyUrl: 'https://www.sololearn.com/certificates/CC-KB3NEPUD',
    image: ethicalAiCert,
    thumb: { src: ethicalAiThumb, width: 560, height: 395 },
    width: 1024,
    height: 722,
  },
  {
    id: 'intro-to-html',
    title: 'Introduction to HTML',
    issuer: 'SoloLearn',
    credential: 'Course Certificate',
    issued: '20 Dec 2025',
    credentialId: 'CC-BU8A1JX8',
    category: 'course',
    topics: ['HTML'],
    verifyUrl: 'https://www.sololearn.com/certificates/CC-BU8A1JX8',
    image: htmlCert,
    thumb: { src: htmlThumb, width: 560, height: 395 },
    width: 1024,
    height: 722,
  },
  {
    id: 'intro-to-c',
    title: 'Introduction to C',
    issuer: 'SoloLearn',
    credential: 'Course Certificate',
    issued: '25 Aug 2025',
    credentialId: 'CC-QRECNQJ1',
    category: 'course',
    topics: ['C programming'],
    verifyUrl: 'https://www.sololearn.com/certificates/CC-QRECNQJ1',
    image: introToCCert,
    thumb: { src: introToCThumb, width: 560, height: 395 },
    width: 1024,
    height: 722,
  },
];
