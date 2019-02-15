import { storiesOf } from '@storybook/react'
import * as React from 'react'
import Box from '@hennessyevan/aluminum-box'
import Component from '@reactions/component'
import {
  IconButton,
  Button,
  BackButton,
  TextDropdownButton,
  Heading,
  Pane,
  SegmentedControl,
  ArrowRightIcon,
  ChevronDownIcon,
  PlusIcon,
  DownloadIcon,
  Edit2Icon,
  BookOpenIcon,
  PlusSquareIcon,
  EyeIcon,
  RefreshCcwIcon,
  UserXIcon,
  TrashIcon,
  CheckIcon,
  LockIcon,
  XIcon,
  SettingsIcon,
  FilterIcon,
  MoreHorizontalIcon,
  SearchIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClipboardIcon,
  CalendarIcon,
  UnlockIcon,
  BellIcon
} from '../src/'

const buttonsStory = storiesOf('buttons', module)

buttonsStory.add('Common', () => (
  <Box padding={40}>
    <Component
      initialState={{
        options: [
          { label: 'Height 24', value: 24 },
          { label: 'Height 32', value: 32 },
          { label: 'Height 45', value: 45 }
        ],
        value: 32
      }}
    >
      {({ state, setState }) => (
        <React.Fragment>
          <SegmentedControl
            width={280}
            options={state.options}
            value={state.value}
            onChange={value => setState({ value: Number(value) })}
          />
          <Pane marginTop={16}>
            <Button height={state.value} marginRight={16}>
              Close
            </Button>
            <Button height={state.value} marginRight={16}>
              Cancel
            </Button>
            <BackButton height={state.value} marginRight={16}>
              Back
            </BackButton>
            <Button
              height={state.value}
              marginRight={16}
              iconAfter={ChevronDownIcon}
            >
              Select event...
            </Button>
            <Button height={state.value} marginRight={16} iconBefore={PlusIcon}>
              New Audience
            </Button>
            <Button
              height={state.value}
              marginRight={16}
              iconBefore={DownloadIcon}
            >
              Download
            </Button>
            <Button
              height={state.value}
              marginRight={16}
              iconBefore={DownloadIcon}
            >
              Download CSV...
            </Button>
            <Button
              height={state.value}
              marginRight={16}
              iconBefore={Edit2Icon}
            >
              Edit
            </Button>
            <Button
              height={state.value}
              marginRight={16}
              iconBefore={BookOpenIcon}
            >
              Docs
            </Button>
            <Button height={state.value} iconBefore={PlusSquareIcon}>
              Import
            </Button>
          </Pane>
          <Pane marginTop={16}>
            <Button height={state.value} appearance="primary" marginRight={16}>
              Confirm
            </Button>
            <Button
              height={state.value}
              appearance="primary"
              marginRight={16}
              iconAfter={ArrowRightIcon}
            >
              Next Step
            </Button>
            <Button
              height={state.value}
              appearance="primary"
              marginRight={16}
              iconBefore={EyeIcon}
            >
              Preview
            </Button>
          </Pane>
          <Pane marginTop={16}>
            <Button
              height={state.value}
              appearance="primary"
              intent="success"
              marginRight={16}
            >
              Got It
            </Button>
            <Button
              height={state.value}
              appearance="primary"
              intent="success"
              marginRight={16}
              iconBefore={PlusIcon}
            >
              Add Source
            </Button>
            <Button
              height={state.value}
              appearance="primary"
              intent="success"
              marginRight={16}
              iconBefore={PlusIcon}
            >
              Add Destination
            </Button>
            <Button
              height={state.value}
              appearance="primary"
              intent="success"
              marginRight={16}
              iconBefore={PlusIcon}
            >
              New Audience
            </Button>
            <Button
              height={state.value}
              appearance="primary"
              intent="success"
              marginRight={16}
              iconBefore={PlusIcon}
            >
              New Computed Trait
            </Button>
          </Pane>
          <Pane marginTop={16}>
            <Button
              height={state.value}
              intent="warning"
              marginRight={16}
              iconBefore={RefreshCcwIcon}
            >
              Retry
            </Button>
            <Button
              height={state.value}
              appearance="primary"
              intent="warning"
              marginRight={16}
              iconBefore={UserXIcon}
            >
              Disable User
            </Button>
          </Pane>
          <Pane marginTop={16}>
            <Button
              height={state.value}
              appearance="minimal"
              intent="danger"
              marginRight={16}
              iconBefore={TrashIcon}
            >
              Delete...
            </Button>
            <Button
              height={state.value}
              intent="danger"
              marginRight={16}
              iconBefore={TrashIcon}
            >
              Delete...
            </Button>
            <Button
              height={state.value}
              appearance="primary"
              intent="danger"
              marginRight={16}
              iconBefore={TrashIcon}
            >
              Permanently Delete Workspace...
            </Button>
          </Pane>
        </React.Fragment>
      )}
    </Component>
  </Box>
))

buttonsStory.add('Button types', () => (
  <Box padding={40}>
    <Component
      initialState={{
        options: [
          { label: 'Height 24', value: 24 },
          { label: 'Height 32', value: 32 },
          { label: 'Height 40', value: 40 }
        ],
        value: 32
      }}
    >
      {({ state, setState }) => (
        <React.Fragment>
          <SegmentedControl
            width={280}
            options={state.options}
            value={state.value}
            onChange={value => setState({ value: Number(value) })}
          />
          <Heading marginTop="default">Default Appearance</Heading>
          <Box marginTop={12}>
            <Button height={state.value} marginRight={16}>
              Default
            </Button>
            <Button height={state.value} marginRight={16} intent="success">
              Success
            </Button>
            <Button height={state.value} marginRight={16} intent="warning">
              Warning
            </Button>
            <Button height={state.value} intent="danger">
              Danger
            </Button>
          </Box>
          <Heading marginTop="default">Primary Appearance</Heading>
          <Box marginTop={12}>
            <Button height={state.value} appearance="primary" marginRight={16}>
              Default
            </Button>
            <Button
              height={state.value}
              appearance="primary"
              marginRight={16}
              intent="success"
            >
              Success
            </Button>
            <Button
              height={state.value}
              appearance="primary"
              marginRight={16}
              intent="warning"
            >
              Warning
            </Button>
            <Button height={state.value} appearance="primary" intent="danger">
              Danger
            </Button>
          </Box>
          <Heading marginTop="default">Minimal Appearance</Heading>
          <Box marginTop={12}>
            <Button height={state.value} appearance="minimal" marginRight={16}>
              Default
            </Button>
            <Button
              height={state.value}
              appearance="minimal"
              marginRight={16}
              intent="success"
            >
              Success
            </Button>
            <Button
              height={state.value}
              appearance="minimal"
              marginRight={16}
              intent="warning"
            >
              Warning
            </Button>
            <Button height={state.value} appearance="minimal" intent="danger">
              Danger
            </Button>
          </Box>
          <Heading marginTop="default">Overlay Appearance</Heading>
          <Box
            background="url(https://picsum.photos/1200/300)"
            paddingY={32}
            marginTop={12}
            display="inline-block"
          >
            <Button height={state.value} appearance="overlay" marginRight={16}>
              Default
            </Button>
            <Button
              height={state.value}
              appearance="overlay"
              marginRight={16}
              intent="success"
            >
              Success
            </Button>
            <Button
              height={state.value}
              appearance="overlay"
              marginRight={16}
              intent="warning"
            >
              Warning
            </Button>
            <Button height={state.value} appearance="overlay" intent="danger">
              Danger
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Component>
  </Box>
))

buttonsStory.add('TextDropdownButton', () => (
  <Box padding={40}>
    <TextDropdownButton>Table Header</TextDropdownButton>
  </Box>
))

buttonsStory.add('Round Button', () => (
  <Box padding={40}>
    <Heading marginTop="default">Round Types</Heading>
    <Heading size={100}>Refrain from using with text</Heading>
    <Box marginTop={12} display="flex">
      <IconButton icon={PlusIcon} round marginRight={16}>
        Default
      </IconButton>
      <IconButton icon={CheckIcon} round marginRight={16} intent="success">
        Success
      </IconButton>
      <IconButton icon={LockIcon} round marginRight={16} intent="warning">
        Warning
      </IconButton>
      <IconButton icon={TrashIcon} round marginRight={16} intent="danger">
        Danger
      </IconButton>
      <IconButton icon={XIcon} round appearance="overlay">
        Overlay
      </IconButton>
    </Box>
    <Heading marginTop="default">Round Text</Heading>
    <Box marginTop={12}>
      <Button round>Pill Button</Button>
    </Box>
  </Box>
))

buttonsStory.add('IconButton', () => (
  <Box padding={40} clearfix>
    <Pane borderRight paddingRight={24} marginRight={24} float="left">
      <Heading marginBottom={16}>Height 32</Heading>
      <Box float="left" marginRight={16}>
        <IconButton marginBottom={16} icon={SettingsIcon} />
        <IconButton marginBottom={16} icon={PlusIcon} />
        <IconButton marginBottom={16} icon={FilterIcon} />
        <IconButton marginBottom={16} icon={Edit2Icon} />
        <IconButton marginBottom={16} icon={RefreshCcwIcon} />
      </Box>
      <Box float="left">
        <IconButton marginBottom={16} appearance="minimal" icon={XIcon} />
        <IconButton
          marginBottom={16}
          appearance="minimal"
          icon={MoreHorizontalIcon}
        />
        <IconButton marginBottom={16} appearance="minimal" icon={PlusIcon} />
        <IconButton marginBottom={16} appearance="minimal" icon={Edit2Icon} />
        <IconButton marginBottom={16} appearance="minimal" icon={SearchIcon} />
      </Box>
    </Pane>
    <Pane float="left">
      <Heading marginBottom={16}>Height 24</Heading>
      <Box float="left" marginRight={16}>
        <IconButton marginBottom={16} height={24} icon={SettingsIcon} />
        <IconButton marginBottom={16} height={24} icon={PlusIcon} />
        <IconButton marginBottom={16} height={24} icon={FilterIcon} />
        <IconButton marginBottom={16} height={24} icon={Edit2Icon} />
        <IconButton marginBottom={16} height={24} icon={ChevronLeftIcon} />
        <IconButton marginBottom={16} height={24} icon={ChevronRightIcon} />
      </Box>
      <Box float="left" marginRight={16}>
        <IconButton
          marginBottom={16}
          appearance="minimal"
          height={24}
          icon={XIcon}
        />
        <IconButton
          marginBottom={16}
          appearance="minimal"
          height={24}
          icon={MoreHorizontalIcon}
        />
        <IconButton
          marginBottom={16}
          appearance="minimal"
          height={24}
          icon={PlusIcon}
        />
        <IconButton
          marginBottom={16}
          appearance="minimal"
          height={24}
          icon={TrashIcon}
          intent="danger"
        />
        <IconButton
          marginBottom={16}
          appearance="minimal"
          height={24}
          icon={FilterIcon}
        />
        <IconButton
          marginBottom={16}
          appearance="minimal"
          height={24}
          icon={Edit2Icon}
        />
      </Box>
      <Box float="left">
        <IconButton
          marginBottom={16}
          appearance="minimal"
          height={24}
          icon={ClipboardIcon}
        />
        <IconButton
          marginBottom={16}
          appearance="minimal"
          height={24}
          icon={CalendarIcon}
        />
        <IconButton
          marginBottom={16}
          appearance="minimal"
          height={24}
          icon={LockIcon}
        />
        <IconButton
          marginBottom={16}
          appearance="minimal"
          height={24}
          icon={UnlockIcon}
        />
        <IconButton
          marginBottom={16}
          appearance="minimal"
          height={24}
          icon={BellIcon}
        />
        <IconButton
          marginBottom={16}
          appearance="minimal"
          height={24}
          icon={BookOpenIcon}
        />
      </Box>
    </Pane>
  </Box>
))

buttonsStory.add('Button presets', () => (
  <Box padding={40}>
    <BackButton>Back</BackButton>
  </Box>
))

buttonsStory.add('Button isLoading', () => (
  <Box padding={80}>
    <Component
      initialState={{
        isShown: false
      }}
    >
      {({ state, setState }) => (
        <Button
          marginRight={16}
          appearance="primary"
          isLoading={state.isLoading}
          onClick={() => {
            setState({
              isLoading: !state.isLoading
            })
            window.setTimeout(() => {
              setState({
                isLoading: state.isLoading
              })
            }, 2000)
          }}
        >
          {state.isLoading ? 'Loading...' : 'Click to Load'}
        </Button>
      )}
    </Component>
  </Box>
))

buttonsStory.add('Button margin top', () => (
  <Box padding={40}>
    <Button marginTop={400}>Debug margin top</Button>
  </Box>
))
