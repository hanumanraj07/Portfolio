import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Transition } from '~/components/transition';
import { Fragment, useState } from 'react';
import styles from './certificates.module.css';
import htmlCert from '~/assets/html-certificate.png';
import { Image } from '~/components/image';

import htmlCertPdf from '~/assets/HTML.pdf.pdf';
import digitalSkillsCert from '~/assets/digital-skills-ai-certificate.jpg';
import digitalSkillsAiPdf from '~/assets/AI.pdf.pdf';
import awsArchCert from '~/assets/aws-solutions-arch-certificate.png';
import awsArchPdf from '~/assets/AWS Certificate.pdf.pdf';
import introToCCert from '~/assets/intro-to-c-certificate.png';
import introToCPdf from '~/assets/C language.pdf.pdf';
import ethicalAiCert from '~/assets/ethical-ai-certificate.png';
import ethicalAiPdf from '~/assets/Ethical.pdf.pdf';
import githubCopilotCert from '~/assets/github-copilot-certificate.png';
import githubCopilotPdf from '~/assets/Github.pdf.pdf';
import cssBasicCert from '~/assets/css-basic-certificate.png';
import cssBasicPdf from '~/assets/HR CSS.pdf.pdf';
import problemSolvingCert from '~/assets/problem-solving-basic-certificate.png';
import problemSolvingPdf from '~/assets/HR PS.pdf.pdf';
import appianAiCert from '~/assets/appian-ai-challenge-certificate.png';
import appianAiPdf from '~/assets/HT Appian.pdf.pdf';
import codeClashCert from '~/assets/code-clash-certificate.png';
import codeClashPdf from '~/assets/HT Code clash.pdf.pdf';
import pulseQuestCert from '~/assets/pulse-quest-certificate.jpg';
import pulseQuestPdf from '~/assets/HT Pluse Quest.pdf.pdf';
import robotrixCert from '~/assets/robotrix-certificate.png';
import robotrixPdf from '~/assets/HT Robotrix.pdf';
import synaptixCert from '~/assets/synaptix-hack-certificate.png';
import synaptixPdf from '~/assets/HT Synaptix.pdf.pdf';
import introToJsCert from '~/assets/intro-to-javascript-certificate.png';
import introToJsPdf from '~/assets/Javascript.pdf.pdf';
import digitalSkillsUxCert from '~/assets/digital-skills-ux-certificate.jpg';

import { useRef } from 'react';
import { useInViewport } from '~/hooks/useInViewport';

const CertificateItem = ({ cert, index }) => {
    const itemRef = useRef();
    const visible = useInViewport(itemRef, true);

    return (
        <div
            ref={itemRef}
            className={styles.certificateItem}
            data-visible={visible}
        >
            {cert.logo && (
                <div className={styles.certImage}>
                    <Image
                        src={cert.logo}
                        width={800}
                        height={600}
                        alt={`${cert.name} Certificate`}
                        sizes="100vw"
                    />
                </div>
            )}
            <Text className={styles.certName} size="l" as="h4">
                {cert.name}
            </Text>
            <Text className={styles.certDetails} size="s">
                {cert.issuer} • {cert.date}
            </Text>
            {(cert.logo || cert.pdf) && (
                <div className={styles.downloadLinks}>
                    {cert.logo && (
                        <a href={cert.logo} download={`${cert.name} Image`} className={styles.downloadLink}>
                            Download Image
                        </a>
                    )}
                    {cert.logo && cert.pdf && <span className={styles.separator}>|</span>}
                    {cert.pdf && (
                        <a href={cert.pdf} download={`${cert.name} Certificate`} className={styles.downloadLink}>
                            Download PDF
                        </a>
                    )}
                </div>
            )}
        </div>
    );
};

const CertificateList = () => (
    <div className={styles.certificateList}>
        {[
            {
                name: 'Solutions Architecture Job Simulation',
                issuer: 'Forage (AWS)',
                date: '2026',
                logo: awsArchCert,
                pdf: awsArchPdf,
            },
            {
                name: 'Introduction to JavaScript',
                issuer: 'SoloLearn',
                date: '2025',
                logo: introToJsCert,
                pdf: introToJsPdf,
            },
            {
                name: 'Robotrix 2026',
                issuer: 'NITK Surathkal',
                date: '2026',
                logo: robotrixCert,
                pdf: robotrixPdf,
            },
            {
                name: 'Synaptix Frontier AI Hack',
                issuer: 'IIT Madras',
                date: '2026',
                logo: synaptixCert,
                pdf: synaptixPdf,
            },
            {
                name: 'CSS (Basic)',
                issuer: 'HackerRank',
                date: '2025',
                logo: cssBasicCert,
                pdf: cssBasicPdf,
            },
            {
                name: 'Problem Solving (Basic)',
                issuer: 'HackerRank',
                date: '2025',
                logo: problemSolvingCert,
                pdf: problemSolvingPdf,
            },
            {
                name: 'Appian AI Application Challenge 2026',
                issuer: 'Unstop (IIT Madras)',
                date: '2026',
                logo: appianAiCert,
                pdf: appianAiPdf,
            },
            {
                name: 'Code Clash',
                issuer: 'Elan & nVision (IIT Hyderabad)',
                date: '2026',
                logo: codeClashCert,
                pdf: codeClashPdf,
            },
            {
                name: 'Pulse Quest',
                issuer: 'Elan & nVision (IIT Hyderabad)',
                date: '2026',
                logo: pulseQuestCert,
                pdf: pulseQuestPdf,
            },
            {
                name: 'Introduction to HTML',
                issuer: 'SoloLearn',
                date: '2025',
                logo: htmlCert,
                pdf: htmlCertPdf,
            },
            {
                name: 'Introduction to C',
                issuer: 'SoloLearn',
                date: '2025',
                logo: introToCCert,
                pdf: introToCPdf,
            },
            {
                name: 'Ethical AI Foundations',
                issuer: 'SoloLearn',
                date: '2025',
                logo: ethicalAiCert,
                pdf: ethicalAiPdf,
            },
            {
                name: 'GitHub Copilot Fundamentals',
                issuer: 'Simplilearn (Microsoft)',
                date: '2025',
                logo: githubCopilotCert,
                pdf: githubCopilotPdf,
            }, {
                name: 'Digital Skills: User Experience',
                issuer: 'FutureLearn (Accenture)',
                date: '2025',
                logo: digitalSkillsUxCert,
            },
            {
                name: 'Digital Skills: Artificial Intelligence',
                issuer: 'FutureLearn (Accenture)',
                date: '2025',
                logo: digitalSkillsCert,
                pdf: digitalSkillsAiPdf,
            },
        ].map((cert, index) => (
            <CertificateItem key={cert.name} cert={cert} index={index} />
        ))}
    </div>
);

export const Certificates = ({ id, visible, sectionRef }) => {
    const [focused, setFocused] = useState(false);
    const titleId = `${id}-title`;

    return (
        <Section
            className={styles.certificates}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            as="section"
            id={id}
            ref={sectionRef}
            aria-labelledby={titleId}
            tabIndex={-1}
        >
            <Transition in={visible || focused} timeout={0}>
                {({ visible, nodeRef }) => (
                    <div className={styles.content} ref={nodeRef}>
                        <Heading
                            className={styles.title}
                            data-visible={visible}
                            level={3}
                            id={titleId}
                        >
                            Certificates
                        </Heading>
                        <CertificateList visible={visible} />
                    </div>
                )}
            </Transition>
        </Section>
    );
};
