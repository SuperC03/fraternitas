import { Avatar, Group, Text, UnstyledButton } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';
import styles from './navigation.module.css';

export type ProfileButtonProps = {
  name: string;
  email: string;
  profileUrl: string;
};

export const ProfileButton = ({
  name,
  email,
  profileUrl,
}: ProfileButtonProps) => (
  <UnstyledButton
    component={Link}
    to="/profile"
    className={styles.profile_button}
  >
    <Group>
      <Avatar src={profileUrl} radius="xl" />

      <div style={{ flex: 1 }}>
        <Text size="sm" fw={500}>
          {name}
        </Text>

        <Text c="dimmed" size="xs">
          {email}
        </Text>
      </div>

      <IconChevronRight size={14} stroke={1.5} />
    </Group>
  </UnstyledButton>
);
