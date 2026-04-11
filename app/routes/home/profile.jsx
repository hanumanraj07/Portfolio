import profileImgLarge from '~/assets/hanuman-profile-large.jpg';
import profileImgPlaceholder from '~/assets/flatline.png';
import profileImg from '~/assets/hanuman-profile.jpg';
import profileImgLight from '~/assets/light-profile.png';
import profileImgLargeLight from '~/assets/light-profile.png';
import profileImgDark from '~/assets/dark-profile.png';
import profileImgLargeDark from '~/assets/dark-profile.png';
import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Heading } from '~/components/heading';
import { Icon } from '~/components/icon';
import { Image } from '~/components/image';
import { Link } from '~/components/link';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Transition } from '~/components/transition';
import { Fragment, useState } from 'react';
import { useTheme } from '~/components/theme-provider';
import { media } from '~/utils/style';
import styles from './profile.module.css';

const ProfileText = ({ visible, titleId }) => (
  <Fragment>
    <Heading className={styles.title} data-visible={visible} level={3} id={titleId}>
      <DecoderText text="Hi there" start={visible} delay={500} />
    </Heading>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      I’m Hanuman Singh Rajpurohit, a Computer Science student and aspiring Full-Stack
      Developer based in India. I enjoy building practical web applications and working
      across both frontend and backend technologies, with interests in web development,
      databases, and cloud fundamentals.
    </Text>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      I work with React, JavaScript, Node.js, and MongoDB to turn ideas into functional
      projects. In my free time, I explore new technologies, play video games, and build
      personal projects. I’m always open to learning, collaboration, and new
      opportunities.
    </Text>
    <div className={styles.socialLinks} data-visible={visible}>
      <Link className={styles.socialLink} href="https://www.linkedin.com/in/hanumanraj07" target="_blank" aria-label="LinkedIn">
        <Icon className={styles.socialIcon} icon="linkedin" />
      </Link>
      <Link className={styles.socialLink} href="https://github.com/hanumanraj07" target="_blank" aria-label="GitHub">
        <Icon className={styles.socialIcon} icon="github" />
      </Link>
      <Link className={styles.socialLink} href="https://www.youtube.com/@hanumansingh07" target="_blank" aria-label="YouTube">
        <Icon className={styles.socialIcon} icon="youtube-brand" />
      </Link>
      <Link className={styles.socialLink} href="https://leetcode.com/u/Hanuman_rajpurohit/" target="_blank" aria-label="LeetCode">
        <Icon className={styles.socialIcon} icon="leetcode" />
      </Link>
      <Link className={styles.socialLink} href="https://x.com/hanumanraj_07" target="_blank" aria-label="X">
        <Icon className={styles.socialIcon} icon="x" />
      </Link>
    </div>
  </Fragment>
);

export const Profile = ({ id, visible, sectionRef }) => {
  const [focused, setFocused] = useState(false);
  const { theme } = useTheme();
  const titleId = `${id}-title`;

  const currentProfileImg = theme === 'light' ? profileImgLight : (theme === 'dark' ? profileImgDark : profileImg);
  const currentProfileImgLarge = theme === 'light' ? profileImgLargeLight : (theme === 'dark' ? profileImgLargeDark : profileImgLarge);

  return (
    <Section
      className={styles.profile}
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
            <div className={styles.column}>
              <ProfileText visible={visible} titleId={titleId} />
              <Button
                secondary
                className={styles.button}
                data-visible={visible}
                href="https://drive.google.com/file/d/1z7131fdVhlq50j5gQr4GHFlYaT46w4aP/view"
                icon="arrow-right"
                target="_blank"
              >
                View Resume
              </Button>
            </div>
            <div className={styles.column}>
              <div className={styles.tag} aria-hidden>
                <Divider
                  notchWidth="64px"
                  notchHeight="8px"
                  collapsed={!visible}
                  collapseDelay={1000}
                />
                <div className={styles.tagText} data-visible={visible}>
                  About me
                </div>
              </div>
              <div className={styles.image}>
                <Image
                  reveal
                  delay={100}
                  placeholder={profileImgPlaceholder}
                  srcSet={`${currentProfileImg} 480w, ${currentProfileImgLarge} 960w`}
                  width={960}
                  height={1280}
                  sizes={`(max-width: ${media.mobile}px) 100vw, 480px`}
                  alt="Hanuman Singh Rajpurohit"
                />
                <div className={styles.svg} data-visible={visible}>
                  DETAILS
                </div>
              </div>
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
};
