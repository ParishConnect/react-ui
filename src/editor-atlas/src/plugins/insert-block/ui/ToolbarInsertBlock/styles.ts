import styled from 'styled-components'
// @ts-ignore: unused variable
// prettier-ignore
import { HTMLAttributes, ClassAttributes, ComponentClass } from 'react';

// tslint:disable-next-line:variable-name
export const TriggerWrapper: ComponentClass<HTMLAttributes<{}>> = styled.span`
  width: 100%;

  display: flex;
  align-items: center;

  > div,
  > span {
    display: flex;
  }

  > div > div {
    display: flex;
  }
`
