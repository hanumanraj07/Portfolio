import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Transition } from '~/components/transition';
import { useState } from 'react';
import styles from './skills.module.css';

import { Icon } from '~/components/icon';

const SkillList = ({ visible }) => {
    const categories = [
        {
            title: 'Frontend',
            skills: [
                { name: 'HTML5', icon: 'html5' },
                { name: 'CSS3', icon: 'css3' },
                { name: 'JavaScript', icon: 'javascript' },
                { name: 'React', icon: 'react' },
                { name: 'Figma', icon: 'figma' },
            ],
        },
        {
            title: 'Backend',
            skills: [
                { name: 'Node.js', icon: 'nodejs' },
                { name: 'Express.js', icon: 'express' },
                { name: 'MongoDB', icon: 'mongodb' },
                { name: 'Redis', icon: 'redis' },
                { name: 'C', icon: 'c' },
                { name: 'C++', icon: 'cpp' },
            ],
        },
        {
            title: 'Tools & DevOps',
            skills: [
                { name: 'Git', icon: 'git' },
                { name: 'GitHub', icon: 'github' },
                { name: 'Postman', icon: 'postman' },
                { name: 'Render', icon: 'render' },
                { name: 'Netlify', icon: 'netlify' },
                { name: 'Vercel', icon: 'vercel' },
            ],
        },
    ];

    let totalIndex = 0;

    return (
        <div className={styles.categories}>
            {categories.map((category) => (
                <div key={category.title} className={styles.skillCategory}>
                    <Heading level={4} className={styles.categoryHeading} data-visible={visible}>
                        {category.title}
                    </Heading>
                    <div className={styles.skillList}>
                        {category.skills.map((skill) => {
                            const delayIndex = totalIndex++;
                            return (
                                <div
                                    key={skill.name}
                                    className={styles.skillItem}
                                    data-visible={visible}
                                    style={{ '--delay': `${delayIndex * 100 + 200}ms` }}
                                >
                                    <Icon icon={skill.icon} className={styles.skillIcon} />
                                    <Text size="l" as="span">
                                        {skill.name}
                                    </Text>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

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
