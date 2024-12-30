import {
  AppShell,
  // Avatar,
  Burger,
  Divider,
  Group,
  NavLink,
  Stack,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { useOktaAuth } from '@okta/okta-react';
import { Link } from '@tanstack/react-router';
import { ProfileButton } from './profile-button';

import {
  IconCalendarEvent,
  IconHome,
  IconLogin,
  IconLogout,
  IconTicket,
  IconUser,
  IconUsersGroup,
  IconZoom,
} from '@tabler/icons-react';

type LinkData = {
  label: string;
  path: string;
  icon: JSX.Element;
};

const generalLinks: LinkData[] = [
  {
    label: 'My Profile',
    path: '/profile',
    icon: <IconUser size="1rem" stroke={1.5} />,
  },
  {
    label: 'My Events',
    path: '/profile/events',
    icon: <IconCalendarEvent size="1rem" stroke={1.5} />,
  },
];

// A bit of a hack to insert org ids here
const orgLinks = (orgId: number): LinkData[] => [
  {
    label: 'Overview',
    path: `/org/${orgId}`,
    icon: <IconZoom size="1rem" stroke={1.5} />,
  },
  {
    label: 'Events',
    path: `/org/${orgId}/events`,
    icon: <IconCalendarEvent size="1rem" stroke={1.5} />,
  },
  {
    label: 'Attendees',
    path: `/org/${orgId}/attendees`,
    icon: <IconTicket size="1rem" stroke={1.5} />,
  },
];

const adminLinks: LinkData[] = [
  {
    label: 'All Users',
    path: '/admin/users',
    icon: <IconUser size="1rem" stroke={1.5} />,
  },
  {
    label: 'All Orgs',
    path: '/admin/orgs',
    icon: <IconUsersGroup size="1rem" stroke={1.5} />,
  },
  {
    label: 'All Events',
    path: '/admin/events',
    icon: <IconCalendarEvent size="1rem" stroke={1.5} />,
  },
];

export type NavigationProps = {
  opened: boolean;
  toggle: () => void;
};

export const Navigation = ({ opened, toggle }: NavigationProps) => {
  const { oktaAuth } = useOktaAuth();

  return (
    <>
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Link style={{ textDecoration: 'none', color: 'inherit' }}>
            <Title order={3}>{import.meta.env.VITE_APP_TITLE}</Title>
          </Link>
          <UnstyledButton
            hiddenFrom="sm"
            onClick={() => oktaAuth.signInWithRedirect()}
          >
            <IconLogin stroke={2} />
          </UnstyledButton>
          {/* <Avatar src="https://brand.mit.edu/sites/default/files/styles/tile_narrow/public/2023-08/tim-full-body-front.png?itok=BxCyFvV2" /> */}
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Stack justify="space-between" h="100%">
          <div>
            <NavLink
              label="Event List"
              component={Link}
              to="/"
              leftSection={<IconHome size="1rem" stroke={1.5} />}
            />
            <NavLink
              label="Sign In"
              onClick={() => oktaAuth.signInWithRedirect()}
              leftSection={<IconLogin size="1rem" stroke={1.5} />}
            />
            <NavLink
              label="Sign Out"
              onClick={() => {}}
              leftSection={<IconLogout size="1rem" stroke={1.5} />}
            />
            <Divider my="xs" size="sm" label="My Rush" labelPosition="left" />
            {generalLinks.map((l) => (
              <NavLink
                key={l.label}
                label={l.label}
                component={Link}
                to={l.path}
                leftSection={l.icon}
              />
            ))}
            <Divider
              my="xs"
              size="sm"
              label="My Organization"
              labelPosition="left"
            />
            {orgLinks(10).map((l) => (
              <NavLink
                key={l.label}
                label={l.label}
                component={Link}
                to={l.path}
                leftSection={l.icon}
              />
            ))}
            <Divider
              my="xs"
              size="sm"
              label="Administration"
              labelPosition="left"
            />
            {adminLinks.map((l) => (
              <NavLink
                key={l.label}
                label={l.label}
                component={Link}
                to={l.path}
                leftSection={l.icon}
              />
            ))}
          </div>
          <ProfileButton
            name="Tim the Beaver"
            email="tim@mit.edu"
            profileUrl="https://brand.mit.edu/sites/default/files/styles/tile_narrow/public/2023-08/tim-full-body-front.png?itok=BxCyFvV2"
          />
        </Stack>
      </AppShell.Navbar>
    </>
  );
};

export default Navigation;
