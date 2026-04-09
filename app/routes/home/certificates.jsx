import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Transition } from '~/components/transition';
import { Fragment, useState } from 'react';
import styles from './certificates.module.css';
import htmlCert from '~/assets/html-certificate.png';
import { Image } from '~/components/image';
import digitalSkillsCert from '~/assets/digital-skills-ai-certificate.jpg';
import awsArchCert from '~/assets/aws-solutions-arch-certificate.png';
import introToCCert from '~/assets/intro-to-c-certificate.png';
import ethicalAiCert from '~/assets/ethical-ai-certificate.png';
import githubCopilotCert from '~/assets/github-copilot-certificate.png';
import cssBasicCert from '~/assets/css-basic-certificate.png';
import problemSolvingCert from '~/assets/problem-solving-basic-certificate.png';
import appianAiCert from '~/assets/appian-ai-challenge-certificate.png';
import codeClashCert from '~/assets/code-clash-certificate.png';
import pulseQuestCert from '~/assets/pulse-quest-certificate.jpg';
import robotrixCert from '~/assets/robotrix-certificate.png';
import synaptixCert from '~/assets/synaptix-hack-certificate.png';
import introToJsCert from '~/assets/intro-to-javascript-certificate.png';
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
        </div>
    );
};

import { Button } from '~/components/button';

const certificates = [
    {
        name: 'Solutions Architecture Job Simulation',
        issuer: 'Forage (AWS)',
        date: '2026',
        logo: awsArchCert,
    },
    {
        name: 'Introduction to JavaScript',
        issuer: 'SoloLearn',
        date: '2025',
        logo: introToJsCert,
    },
    {
        name: 'Robotrix 2026',
        issuer: 'NITK Surathkal',
        date: '2026',
        logo: robotrixCert,
    },
    {
        name: 'Synaptix Frontier AI Hack',
        issuer: 'IIT Madras',
        date: '2026',
        logo: synaptixCert,
    },
    {
        name: 'CSS (Basic)',
        issuer: 'HackerRank',
        date: '2025',
        logo: cssBasicCert,
    },
    {
        name: 'Problem Solving (Basic)',
        issuer: 'HackerRank',
        date: '2025',
        logo: problemSolvingCert,
    },
    {
        name: 'Appian AI Application Challenge 2026',
        issuer: 'Unstop (IIT Madras)',
        date: '2026',
        logo: appianAiCert,
    },
    {
        name: 'Code Clash',
        issuer: 'Elan & nVision (IIT Hyderabad)',
        date: '2026',
        logo: codeClashCert,
    },
    {
        name: 'Pulse Quest',
        issuer: 'Elan & nVision (IIT Hyderabad)',
        date: '2026',
        logo: pulseQuestCert,
    },
    {
        name: 'Introduction to HTML',
        issuer: 'SoloLearn',
        date: '2025',
        logo: htmlCert,
    },
    {
        name: 'Introduction to C',
        issuer: 'SoloLearn',
        date: '2025',
        logo: introToCCert,
    },
    {
        name: 'Ethical AI Foundations',
        issuer: 'SoloLearn',
        date: '2025',
        logo: ethicalAiCert,
    },
    {
        name: 'GitHub Copilot Fundamentals',
        issuer: 'Simplilearn (Microsoft)',
        date: '2025',
        logo: githubCopilotCert,
    },
    {
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
    },
];

const CertificateList = () => {
    const [visibleCount, setVisibleCount] = useState(4);

    const handleLoadMore = () => {
        setVisibleCount((prevCount) => prevCount + 4);
    };

    const visibleCertificates = certificates.slice(0, visibleCount);

    return (
        <div className={styles.content}>
            <div className={styles.certificateList}>
                {visibleCertificates.map((cert, index) => (
                    <CertificateItem key={cert.name} cert={cert} index={index} />
                ))}
            </div>
            {visibleCount < certificates.length && (
                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
                    <Button secondary iconHoverShift onClick={handleLoadMore}>
                        Load More
                    </Button>
                </div>
            )}
        </div>
    );
};

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
