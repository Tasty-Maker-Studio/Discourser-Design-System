import { css } from 'styled-system/css';
import { NavigationMenu } from '../NavigationMenu';
import { DiscourserLogo } from '../Icons/DiscourserLogo';
import { DashboardIcon } from '../Icons/DashboardIcon';
import { NotebookIcon } from '../Icons/NotebookIcon';
import { ScenarioIcon } from '../Icons/ScenarioIcon';
import { HelpIcon } from '../Icons/HelpIcon';
import { AccountIcon } from '../Icons/AccountIcon';
import { ClockIcon } from '../Icons/ClockIcon';
import { RightArrowIcon } from '../Icons/RightArrowIcon';
import type { NavSection } from '../NavigationMenu/types';

export interface QuickStartScenario {
  title: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
}

export interface QuickStartPageProps {
  /** User's first name shown in the greeting */
  userName: string;
  /** The first scenario queued for the user */
  firstScenario?: QuickStartScenario;
  /** Currently active nav href */
  activeHref?: string;
  /** Nav sections — defaults to the standard Discourser nav */
  navSections?: NavSection[];
  onStartPracticing?: () => void;
  onLearnAboutSetup?: () => void;
  onNavigate?: (href: string) => void;
}

const levelLabel: Record<QuickStartScenario['level'], string> = {
  beginner: 'Beginner level',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

const levelColor: Record<QuickStartScenario['level'], string> = {
  beginner: '#dcfce7',
  intermediate: '#fef9c3',
  advanced: '#fce7f3',
};

const levelTextColor: Record<QuickStartScenario['level'], string> = {
  beginner: '#15803d',
  intermediate: '#a16207',
  advanced: '#be185d',
};

const DEFAULT_NAV_SECTIONS: NavSection[] = [
  {
    value: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
    items: [
      { label: 'Quick Start', href: '/dashboard/quick-start' },
      { label: 'Resume Session', href: '/dashboard/resume' },
      { label: 'Progress', href: '/dashboard/progress' },
      { label: 'Momentum', href: '/dashboard/momentum' },
      { label: 'Recent Session', href: '/dashboard/recent' },
    ],
  },
  {
    value: 'notebook',
    title: 'MyNotebook',
    icon: <NotebookIcon />,
    items: [
      { label: 'Knowledge Base', href: '/notebook/knowledge' },
      { label: 'Session Library', href: '/notebook/sessions' },
      { label: 'Decision Patterns', href: '/notebook/decisions' },
      { label: 'Personal Insights', href: '/notebook/insights' },
    ],
  },
  {
    value: 'scenarios',
    title: 'Scenarios',
    icon: <ScenarioIcon />,
    items: [
      { label: 'MyQueue', href: '/scenarios/queue' },
      { label: 'Conversation Studio', href: '/scenarios/studio' },
      { label: 'By Level', href: '/scenarios/level' },
      { label: 'By Skill', href: '/scenarios/skill' },
    ],
  },
  {
    value: 'help',
    title: 'Help',
    icon: <HelpIcon />,
    items: [
      { label: 'How it Works', href: '/help/how-it-works' },
      { label: 'Practice Tips', href: '/help/tips' },
      { label: 'Technical Support', href: '/help/support' },
      { label: 'Context', href: '/help/context' },
      { label: 'Contact Support', href: '/help/contact' },
    ],
  },
  {
    value: 'account',
    title: 'Account',
    icon: <AccountIcon />,
    items: [
      { label: 'Profile', href: '/account/profile' },
      { label: 'User Preferences', href: '/account/preferences' },
    ],
  },
];

const DEFAULT_SCENARIO: QuickStartScenario = {
  title: 'UX Interview Practice',
  level: 'beginner',
  duration: '~15-20 minutes',
};

export function QuickStartPage({
  userName,
  firstScenario = DEFAULT_SCENARIO,
  activeHref = '/dashboard/quick-start',
  navSections = DEFAULT_NAV_SECTIONS,
  onStartPracticing,
  onLearnAboutSetup,
  onNavigate,
}: QuickStartPageProps) {
  return (
    <div
      className={css({
        display: 'flex',
        minHeight: '100vh',
        bg: 'neutral.95',
        fontFamily: 'body',
      })}
    >
      {/* ── Left nav ── */}
      <aside
        className={css({
          width: '285px',
          flexShrink: 0,
          bg: 'white',
          borderRight: '1px solid',
          borderColor: 'neutral.90',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        })}
      >
        <div
          className={css({
            px: '6',
            py: '5',
            borderBottom: '1px solid',
            borderColor: 'neutral.90',
          })}
        >
          <DiscourserLogo height="32px" color="currentColor" />
        </div>
        <div className={css({ flex: 1, overflow: 'auto', py: '2' })}>
          <NavigationMenu
            sections={navSections}
            activeHref={activeHref}
            defaultOpenSections={['dashboard']}
            onNavigate={onNavigate}
          />
        </div>
      </aside>

      {/* ── Main stage ── */}
      <main
        className={css({
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
          minWidth: 0,
        })}
      >
        {/* Masthead */}
        <div
          className={css({
            px: '10',
            pt: '7',
            pb: '5',
          })}
        >
          {/* Breadcrumb */}
          <nav
            className={css({
              display: 'flex',
              alignItems: 'center',
              gap: '2',
              mb: '3',
              fontSize: 'sm',
              color: 'neutral.50',
            })}
            aria-label="Breadcrumb"
          >
            <span
              className={css({
                cursor: 'pointer',
                _hover: { color: 'neutral.30' },
              })}
            >
              Dashboard
            </span>
            <RightArrowIcon
              width="14px"
              height="14px"
              className={css({ color: 'neutral.60' })}
            />
            <span
              className={css({ color: 'neutral.20', fontWeight: 'medium' })}
            >
              Quick Start
            </span>
          </nav>

          {/* Greeting */}
          <p className={css({ fontSize: 'lg', color: 'neutral.30' })}>
            Welcome,{' '}
            <strong
              className={css({ fontWeight: 'bold', color: 'neutral.10' })}
            >
              {userName}
            </strong>
            ! Let&apos;s get you practicing.
          </p>
        </div>

        {/* Content grid */}
        <div
          className={css({
            px: '10',
            pb: '10',
            display: 'flex',
            flexDirection: 'column',
            gap: '6',
          })}
        >
          <h2
            className={css({
              fontSize: '2xl',
              fontWeight: 'semibold',
              color: 'neutral.10',
              fontFamily: 'heading',
            })}
          >
            How would you like to start?
          </h2>

          <div
            className={css({
              display: 'grid',
              gridTemplateColumns: '1fr 340px',
              gap: '6',
              alignItems: 'start',
            })}
          >
            {/* Left column — action cards */}
            <div
              className={css({
                display: 'flex',
                flexDirection: 'column',
                gap: '4',
              })}
            >
              {/* Dive Right In card */}
              <div
                className={css({
                  bg: 'white',
                  borderRadius: 'xl',
                  border: '1px solid',
                  borderColor: 'neutral.90',
                  boxShadow: '0px 1px 4px 0px rgba(0,0,0,0.08)',
                  p: '6',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '5',
                })}
              >
                <h3
                  className={css({
                    fontSize: '3xl',
                    fontWeight: 'bold',
                    color: 'neutral.10',
                    fontFamily: 'heading',
                    lineHeight: 'tight',
                  })}
                >
                  Dive Right In
                </h3>

                <p
                  className={css({
                    fontSize: 'xl',
                    color: 'neutral.20',
                    lineHeight: 'relaxed',
                  })}
                >
                  Start practicing immediately with AI-selected scenarios based
                  on your goals and experience level
                </p>

                {/* Scenario preview */}
                <div
                  className={css({
                    bg: 'neutral.99',
                    border: '1px solid',
                    borderColor: 'neutral.90',
                    borderRadius: 'lg',
                    p: '4',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2',
                  })}
                >
                  <p
                    className={css({
                      fontSize: 'xs',
                      color: 'neutral.50',
                      textTransform: 'uppercase',
                      letterSpacing: 'widest',
                      fontWeight: 'medium',
                    })}
                  >
                    First scenario:
                  </p>
                  <p
                    className={css({
                      fontSize: 'lg',
                      fontWeight: 'semibold',
                      color: 'neutral.10',
                    })}
                  >
                    {firstScenario.title}
                  </p>
                  <div
                    className={css({
                      display: 'flex',
                      alignItems: 'center',
                      gap: '3',
                    })}
                  >
                    <span
                      style={{
                        backgroundColor: levelColor[firstScenario.level],
                        color: levelTextColor[firstScenario.level],
                        fontSize: '12px',
                        fontWeight: 500,
                        padding: '2px 10px',
                        borderRadius: '999px',
                      }}
                    >
                      {levelLabel[firstScenario.level]}
                    </span>
                    <span
                      className={css({
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1',
                        fontSize: 'sm',
                        color: 'neutral.40',
                      })}
                    >
                      <ClockIcon width="14px" height="14px" />
                      {firstScenario.duration}
                    </span>
                  </div>
                </div>

                {/* CTA button */}
                <button
                  type="button"
                  onClick={onStartPracticing}
                  className={css({
                    w: 'full',
                    py: '2.5',
                    px: '6',
                    bg: 'neutral.10',
                    color: 'white',
                    fontSize: 'sm',
                    fontWeight: 'medium',
                    borderRadius: 'lg',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background 0.15s',
                    _hover: { bg: 'neutral.20' },
                  })}
                >
                  Start Practicing Now
                </button>
              </div>

              {/* See the Setup First card */}
              <div
                className={css({
                  bg: 'white',
                  borderRadius: 'xl',
                  border: '1px solid',
                  borderColor: 'neutral.90',
                  boxShadow: '0px 1px 4px 0px rgba(0,0,0,0.08)',
                  p: '6',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '5',
                })}
              >
                <h3
                  className={css({
                    fontSize: '3xl',
                    fontWeight: 'normal',
                    color: 'neutral.10',
                    fontFamily: 'heading',
                    lineHeight: 'tight',
                  })}
                >
                  See the Setup First
                </h3>

                <p
                  className={css({
                    fontSize: 'xl',
                    color: 'neutral.20',
                    lineHeight: 'relaxed',
                  })}
                >
                  Preview your personalized practice plan and adjust settings
                  before you begin
                </p>

                <ul
                  className={css({
                    listStyle: 'none',
                    p: '0',
                    m: '0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '3',
                  })}
                >
                  {[
                    'View scenario details',
                    'Adjust difficulty & topics',
                    'See your learning queue',
                    "Then start when you're ready",
                  ].map((item) => (
                    <li
                      key={item}
                      className={css({
                        display: 'flex',
                        alignItems: 'center',
                        gap: '2',
                        fontSize: 'md',
                        color: 'neutral.20',
                      })}
                    >
                      <span
                        className={css({ color: 'neutral.40', flexShrink: 0 })}
                      >
                        →
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={onLearnAboutSetup}
                  className={css({
                    w: 'full',
                    py: '2.5',
                    px: '6',
                    bg: 'transparent',
                    color: 'neutral.20',
                    fontSize: 'sm',
                    fontWeight: 'medium',
                    borderRadius: 'lg',
                    border: '1px solid',
                    borderColor: 'neutral.70',
                    cursor: 'pointer',
                    transition: 'border-color 0.15s',
                    _hover: { borderColor: 'neutral.40' },
                  })}
                >
                  Learn About the Scenario Details
                </button>
              </div>
            </div>

            {/* Right column — info cards */}
            <div
              className={css({
                display: 'flex',
                flexDirection: 'column',
                gap: '4',
              })}
            >
              {/* First time practicing? */}
              <div
                className={css({
                  bg: 'white',
                  borderRadius: 'xl',
                  border: '1px solid',
                  borderColor: 'neutral.90',
                  boxShadow: '0px 1px 4px 0px rgba(0,0,0,0.08)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                })}
              >
                <div className={css({ p: '5', pb: '3' })}>
                  <h3
                    className={css({
                      fontSize: 'xl',
                      fontWeight: 'semibold',
                      color: 'neutral.10',
                      mb: '1',
                    })}
                  >
                    First time practicing?
                  </h3>
                  <p className={css({ fontSize: 'sm', color: 'neutral.40' })}>
                    Here&apos;s what to expect in your first session
                  </p>
                </div>
                {/* Gradient image placeholder */}
                <div
                  style={{
                    background:
                      'linear-gradient(150deg, #dbeafe 0%, #f3e8ff 100%)',
                    height: '160px',
                    margin: '0 16px 16px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span style={{ fontSize: '48px' }}>🎯</span>
                </div>
                <div className={css({ px: '5', pb: '5' })}>
                  <button
                    type="button"
                    className={css({
                      fontSize: 'sm',
                      fontWeight: 'medium',
                      color: 'primary.40',
                      bg: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      p: '0',
                      _hover: { color: 'primary.30' },
                    })}
                  >
                    Watch 2-min intro →
                  </button>
                </div>
              </div>

              {/* Quick Tips */}
              <div
                className={css({
                  bg: 'white',
                  borderRadius: 'xl',
                  border: '1px solid',
                  borderColor: 'neutral.90',
                  boxShadow: '0px 1px 4px 0px rgba(0,0,0,0.08)',
                  p: '5',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4',
                })}
              >
                <h3
                  className={css({
                    fontSize: 'xl',
                    fontWeight: 'semibold',
                    color: 'neutral.10',
                  })}
                >
                  Quick Tips
                </h3>
                <ul
                  className={css({
                    listStyle: 'none',
                    p: '0',
                    m: '0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '3',
                  })}
                >
                  {[
                    'Practice sessions are private – no external pressure',
                    'Try not to stop the conversation before answering',
                    'Focus on thinking out loud, not perfect answers',
                  ].map((tip) => (
                    <li
                      key={tip}
                      className={css({
                        display: 'flex',
                        gap: '2',
                        fontSize: 'sm',
                        color: 'neutral.20',
                        lineHeight: 'relaxed',
                      })}
                    >
                      <span
                        className={css({
                          color: 'neutral.50',
                          flexShrink: 0,
                          mt: '0.5',
                        })}
                      >
                        •
                      </span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
