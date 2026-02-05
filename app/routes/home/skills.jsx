import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Transition } from '~/components/transition';
import { Fragment, useState } from 'react';
import styles from './skills.module.css';

import { Icon } from '~/components/icon';

const SkillList = ({ visible }) => (
    <div className={styles.skillList}>
        {[
            { name: 'HTML5', icon: 'html5' },
            { name: 'CSS3', icon: 'css3' },
            { name: 'JavaScript', icon: 'javascript' },
            { name: 'React', icon: 'react' },
            { name: 'Node.js', icon: 'nodejs' },
            { name: 'Express.js', icon: 'express' },
            { name: 'MongoDB', icon: 'mongodb' },
            { name: 'Redis', icon: 'redis' },
            { name: 'Git', icon: 'git' },
            { name: 'GitHub', icon: 'github' },
            { name: 'C', icon: 'c' },
            { name: 'C++', icon: 'cpp' },
            { name: 'Postman', icon: 'postman' },
            { name: 'Figma', icon: 'figma' },
            { name: 'Render', icon: 'render' },
            { name: 'Netlify', icon: 'netlify' },
            { name: 'Vercel', icon: 'vercel' },
        ].map((skill, index) => (
            <div
                key={skill.name}
                className={styles.skillItem}
                data-visible={visible}
                style={{ '--delay': `${index * 100 + 200}ms` }}
            >
                <Icon icon={skill.icon} className={styles.skillIcon} />
                <Text size="l" as="span">
                    {skill.name}
                </Text>
            </div>
        ))}
    </div>
);

export const Skills = ({ id, visible, sectionRef }) => {
    const [focused, setFocused] = useState(false);
    const titleId = `${id}-title`;

    return (
        <Section
            className={styles.skills}
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
                            Skills
                        </Heading>
                        <SkillList visible={visible} />
                    </div>
                )}
            </Transition>
        </Section>
    );
};
