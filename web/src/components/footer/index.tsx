import { Anchor, AppShell, Container, Group, Title } from '@mantine/core';

import styles from './footer.module.css';

export const Footer = () => {
  return (
    <AppShell.Footer className={styles.footer}>
      <Container className={styles.inner}>
        <Title order={5}>Fraternitas</Title>
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
    </AppShell.Footer>
  );
};

export default Footer;
