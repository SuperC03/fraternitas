import { Anchor, Container, Group, Text, Title } from '@mantine/core';

import styles from './footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <span>
          <Title className={styles.logo} order={4}>
            Fraternitas
          </Title>{' '}
          <Text style={{display: 'inline'}}>{import.meta.env.VITE_APP_VERSION}</Text>
        </span>
        <Group className={styles.links}>
          <Anchor<'a'> c="dimmed" href="mailto:fraternitas@mit.edu" size="sm">
            Contact Us
          </Anchor>
          <Anchor<'a'>
            c="dimmed"
            href="https://accessibility.mit.edu/"
            target="_blank"
            rel="nofollow"
            size="sm"
          >
            Accessibility
          </Anchor>
          <Anchor<'a'>
            c="dimmed"
            href="https://github.com/SuperC03/fraternitas"
            target="_blank"
            rel="nofollow"
            size="sm"
          >
            Github
          </Anchor>
        </Group>
      </Container>
    </footer>
  );
};

export default Footer;
